import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  switchMap,
  takeUntil,
} from 'rxjs/operators';
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
  public searchText: string = '';
  public fullNameModelChanged: Subject<string> = new Subject<string>();
  private unsubscribe$ = new Subject<string>();

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.getEmployess();
    this.fullNameModelChanged
      .pipe(
        debounceTime(400),
        map((searchText) => {
          this.searchText = searchText;
          return this.searchText;
        }),
        distinctUntilChanged(),
        switchMap((val) =>
          this.employeeService
            .getEmployees(this.searchText)
            .pipe(takeUntil(this.unsubscribe$))
        )
      )
      .subscribe(({ data }: any) => {
        this.employees = data.employees;
      });
  }

  getEmployess() {
    this.employeeService
      .getEmployees(this.searchText)
      .subscribe(({ data }: any) => {
        this.employees = data.employees;
      });
  }

  deleteEmployee(id: number) {
    this.employeeService.deleteEmployees(id).subscribe((result) => {
      this.getEmployess();
    });
  }

  editEmployee(id: number) {
    this.router.navigate(['/addemployee', id]);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next('unsubscribe emit');
    this.unsubscribe$.complete();
    this.fullNameModelChanged.unsubscribe();
  }
}
