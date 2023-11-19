import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ConversionService } from 'src/app/services/conversion.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit{

  devises$!: Observable<any>
  constructor(private conversionService:ConversionService) { }

  ngOnInit(): void {
    this.devises$ = this.conversionService.getSupportedCurrencies()
   }

}
