import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { EmployeService } from '../../services/employe.service';
import { Departement, Fonction } from '../../enum/types';
import { ListemployesComponent } from '../listemployes/listemployes.component';
import { Employe } from '../../classes/employe';

@Component({
  selector: 'app-employe',
  templateUrl: './employe.component.html',
  styleUrls: ['./employe.component.css']
})
export class EmployeComponent implements OnInit {

  @ViewChild(ListemployesComponent) childComponent!: ListemployesComponent;
  
  lesFonctions = Object.values(Fonction);

  constructor(private fb:FormBuilder,
    private employeService:EmployeService) { }

  employeForm!:FormGroup;

  ngOnInit(): void {
    this.employeForm = this.fb.nonNullable.group({
        matricule:[''],
        nom:[''],
        affiliation: this.fb.nonNullable.group({
          fonction:[Fonction.Sec],
          departement:[Departement.Finance]
        }),        
        diplomes:this.fb.array([
         /* this.fb.nonNullable.group({
            intitule:['Bac'],
            annee:[2002]
          })*/
        ])
    })

  }

  onSubmit(){
    this.employeService.addNewEmploye(this.employeForm.value).subscribe(
      data => {console.log(data);
        this.childComponent.updateAffichage(data as Employe)
      }
    );
  }
  onReset(){
    this.employeForm.reset({fonction:Fonction.Sec, departement: Departement.IT})
    this.lesDiplomes.clear();
  }

  get lesDiplomes(){
    return this.employeForm.get('diplomes') as FormArray;
  }
  ajouterDiplome(){
    this.lesDiplomes.push(this.fb.group({intitule:'', annee:2023 }));
  }

  supprimerDiplome(i:number){
    this.lesDiplomes.removeAt(i);
  }
}
