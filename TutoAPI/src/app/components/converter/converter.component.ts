import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { ConversionService } from 'src/app/services/conversion.service';

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css']
})
export class ConverterComponent implements OnInit {
  devises$!: Observable<any>;
  montantConverti!: number;
  conversionForm!: FormGroup;

  constructor(private conversionService: ConversionService,
    private fb: FormBuilder) { }

  ngOnInit(): void {
    // Pour tester l'API
    /*   this.conversionService.convert('CHF', 'TND', 10).subscribe(
         data => console.log(data)
       )*/
    this.devises$ = this.conversionService.getSupportedCurrencies();

    this.conversionForm = this.fb.nonNullable.group({
      from: ['CHF'],
      to: ['TND'],      
      amount: [1],
    })
  }
  convertir() {
    // Déstructuration de JS pour récupérer facilement les 3 propriétés du formulaire
    const { from, to, amount } = this.conversionForm.value;
    this.conversionService.convert(from, to, amount).subscribe(
      data => this.montantConverti = data.result.convertedAmount)
  }
}
