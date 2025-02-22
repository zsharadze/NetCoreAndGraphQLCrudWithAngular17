import { Injectable } from '@angular/core';
import { EmployeeModel } from '../models/employee.model';
import { Apollo } from 'apollo-angular';
import {
  GET_EMPLOYEES,
  GET_EMPLOYEE,
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
} from '../graphql/graphql.queries';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';

@Injectable()
export class EmployeeService {
  constructor(private apollo: Apollo) {}

  getEmployees(searchText: string) {
    return this.apollo.watchQuery({
      query: GET_EMPLOYEES,
      variables: {
        searchText: searchText
      },
      fetchPolicy: 'no-cache',
    }).valueChanges;
  }

  getEmployee(id: number) {
    return this.apollo.query({
      query: GET_EMPLOYEE,
      variables: {
        id: id,
      },
      fetchPolicy: 'no-cache',
    });
  }

  addEmployees(employee: EmployeeModel) {
    return this.apollo.mutate({
      mutation: ADD_EMPLOYEE,
      variables: {
        id: 0,
        email: employee.email,
        fullName: employee.fullName,
        age: employee.age,
      },
    });
  }

  editEmployees(employee: EmployeeModel) {
    return this.apollo.mutate({
      mutation: UPDATE_EMPLOYEE,
      variables: {
        id: employee.id,
        email: employee.email,
        fullName: employee.fullName,
        age: employee.age,
      },
    });
  }

  deleteEmployees(id: number) {
    return this.apollo.mutate({
      mutation: DELETE_EMPLOYEE,
      variables: {
        id: id,
      },
    });
  }
}
