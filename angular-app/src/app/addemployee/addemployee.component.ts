import { Component } from '@angular/core';
import { EmployeeModel } from '../models/employee.model';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-addemployee',
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, CommonModule],
  providers: [EmployeeService],
  templateUrl: './addemployee.component.html',
  styleUrl: './addemployee.component.css',
})
export class AddEmployeeComponent {
  employeeId: number = 0;
  employeeForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    email: ['', Validators.compose([Validators.required, Validators.email])],
    age: [
      '',
      Validators.compose([
        Validators.min(18),
        Validators.max(65),
        Validators.required,
      ]),
    ],
  });

  constructor(
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    if (id) {
      //getemployee by id for edit
      this.employeeId = Number(id);
      this.getEmployee();
    }
  }

  getEmployee() {
    this.employeeService
      .getEmployee(Number(this.employeeId))
      .subscribe((res: any) => {
        this.employeeForm.controls.fullName.setValue(
          res.data.employee.fullName
        );
        this.employeeForm.controls.email.setValue(res.data.employee.email);
        this.employeeForm.controls.age.setValue(res.data.employee.age);
      });
  }

  onEmployeeSubmit() {
    if (this.employeeForm.invalid) {
      console.log('form is invalid');
      return;
    }

    let employeeModel = new EmployeeModel(
      this.employeeId,
      this.employeeForm.get('fullName')?.value!,
      this.employeeForm.get('email')?.value!,
      Number(this.employeeForm.get('age')?.value!)
    );

    //creates new
    if (this.employeeId == 0) {
      this.employeeService.addEmployees(employeeModel).subscribe((res) => {
        this.router.navigate(['/']);
      });
    } else {
      //updates existing
      this.employeeService.editEmployees(employeeModel).subscribe((res) => {
        this.router.navigate(['/']);
      });
    }
  }
}
