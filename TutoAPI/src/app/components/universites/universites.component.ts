import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { UniversitesService } from 'src/app/services/universites.service';

@Component({
  selector: 'app-universites',
  templateUrl: './universites.component.html',
  styleUrls: ['./universites.component.css']
})
export class UniversitesComponent {
  liste$! :Observable<any>;

  constructor(private univService:UniversitesService) { }
  
  afficher(pays:string){
    this.liste$ = this.univService.getUniversities(pays);
}

}
