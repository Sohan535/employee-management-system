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
sortColumn: string = 'firstName';
sortDirection: string = 'ASC';
currentPage: number = 0;
totalPages: number = 0;
pageSize: number = 5;
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

private getEmployees(page: number = 0, size: number = 5) : void {
  
  const sortColumn = this.sortColumn || 'firstName';
  const sortDirection = this.sortDirection || 'ASC';

  this.employeeService.getEmployeesList(sortColumn, sortDirection, page, size)
    .subscribe(response => {
      this.employees = response.content;
      this.totalPages = response.totalPages;
      this.currentPage = response.number;
    });
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

goToPage(page: number): void {
  if(page>=0 && page < this.totalPages){
    this.getEmployees(page, this.pageSize);
  }
}

nextPage(): void{
  if(this.currentPage < this.totalPages - 1) {
    this.getEmployees(this.currentPage + 1, this.pageSize);
  }
}

previousPage(): void {
  if(this.currentPage > 0) {
    this.getEmployees(this.currentPage - 1, this.pageSize);
  }
}

}
