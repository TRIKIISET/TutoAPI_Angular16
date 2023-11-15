import { Component, OnInit } from '@angular/core';
import { Employe } from '../../classes/employe';
import { EmployeService } from '../../services/employe.service';


@Component({
  selector: 'app-listemployes',
  templateUrl: './listemployes.component.html',
  styleUrls: ['./listemployes.component.css']
})
export class ListemployesComponent implements OnInit {

lesemployes!: any;
  constructor(private employeService:EmployeService) { }

  ngOnInit(): void {
    this.employeService.getEmployes().subscribe(
      data => this.lesemployes = data
    );
  }

  updateAffichage(e:Employe){
    this.lesemployes.push(e);
  }

}
