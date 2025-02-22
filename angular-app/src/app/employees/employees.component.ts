import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { EmployeeModel } from '../models/employee.model';
import { EmployeeService } from '../services/employee.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [EmployeeService],
  templateUrl: './employees.component.html',
  styleUrl: './employees.component.css',
})
export class EmployeesComponent {
  employees: EmployeeModel[] = [];
  public searchText!: string;
  public fullNameModelChanged: Subject<string> = new Subject<string>();
  private fullNameModelChangeSubscription!: Subscription;

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getEmployess();
    this.fullNameModelChangeSubscription = this.fullNameModelChanged
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((text) => {
        this.searchText = text;
        this.getEmployess();
      });
  }

  getEmployess() {
    this.employeeService.getEmployees(this.searchText).subscribe(({ data, error }: any) => {
      this.employees = data.employees;
    });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployees(id).subscribe((result) => {
      this.getEmployess();
    });
  }

  editEmployee(id: number) {
    this.router.navigate(['/addemployee'], { queryParams: { id: id } });
  }

  ngOnDestroy() {
    this.fullNameModelChangeSubscription.unsubscribe();
  }
}
