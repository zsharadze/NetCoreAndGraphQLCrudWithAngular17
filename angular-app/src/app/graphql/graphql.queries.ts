import { gql } from 'apollo-angular';

const GET_EMPLOYEES = gql`
  query employees($searchText: String){
    employees(searchText: $searchText) {
      id
      email
      fullName
      age
    }
  }
`;

const GET_EMPLOYEE = gql`
  query employee($id: Int!) {
    employee(id: $id) {
      id
      email
      fullName
      age
    }
  }
`;

const ADD_EMPLOYEE = gql`
  mutation addEmployee(
    $id: Int!
    $email: String!
    $fullName: String!
    $age: Int!
  ) {
    addEmployee(
      input: { id: $id, email: $email, fullName: $fullName, age: $age }
    ) {
      id
      email
      fullName
      age
    }
  }
`;

const UPDATE_EMPLOYEE = gql`
  mutation updateEmployee(
    $id: Int!
    $email: String!
    $fullName: String!
    $age: Int!
  ) {
    updateEmployee(
      input: { id: $id, email: $email, fullName: $fullName, age: $age }
    ) {
      id
      email
      fullName
      age
    }
  }
`;

const DELETE_EMPLOYEE = gql`
mutation deleteEmployee($id: Int!) {
  deleteEmployee(id: $id)
}
`;

export {
  GET_EMPLOYEES,
  GET_EMPLOYEE,
  ADD_EMPLOYEE,
  UPDATE_EMPLOYEE,
  DELETE_EMPLOYEE,
};
