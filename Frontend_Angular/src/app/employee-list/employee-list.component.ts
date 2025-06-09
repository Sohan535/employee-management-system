import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';
import { NgFor } from '@angular/common';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-list',
  imports: [NgFor],
  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.css'
})
export class EmployeeListComponent implements OnInit{
  sortColumn: string = '';
  sortDirection: 'ASC' | 'DESC' = 'ASC';
employees !: Employee[];

constructor(private employeeService: EmployeeService, private router: Router) { }

ngOnInit(): void {
  this.getEmployees();
}

sortBy(column: string): void {
  if (this.sortColumn === column) {
    this.sortDirection = this.sortDirection === 'ASC' ? 'DESC' : 'ASC';
  } else {
    this.sortColumn = column;
    this.sortDirection = 'ASC';
  }

  this.getEmployees(); // re-fetch with new sort
}

private getEmployees(){
  if (this.sortColumn) {
    this.employeeService.getEmployeesList(this.sortColumn, this.sortDirection)
      .subscribe(data => this.employees = data);
  } else {
    this.employeeService.getEmployeesList('firstName', 'ASC')
      .subscribe(data => this.employees = data);
  }
}

employeeDetails(id: number){
  this.router.navigate(['employee-details', id]);
}

updateEmployee(id:number){
  this.router.navigate(['update-employee', id]);
}

deleteEmployee(id: number){
  this.employeeService.deleteEmployee(id).subscribe(data => {
    console.log(data);
    this.getEmployees();
  })
}
}
