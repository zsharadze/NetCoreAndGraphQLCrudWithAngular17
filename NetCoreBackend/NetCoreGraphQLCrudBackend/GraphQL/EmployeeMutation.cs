using NetCoreGraphQLCrudBackend.Models;
using NetCoreGraphQLCrudBackend.Repository;

namespace NetCoreGraphQLCrudBackend.GraphQL
{
    public class EmployeeMutations
    {
        public async Task<Employee> AddEmployee(Employee input, [Service] EmployeeRepository repository)
        {
            var employee = await repository.AddEmployeeAsync(input);
            return employee;
        }

        public async Task<Employee> UpdateEmployee(Employee input, [Service] EmployeeRepository repository)
        {
            var employeeToUpdate = await repository.GetEmployeeAsync(input.Id);
            employeeToUpdate.Id = input.Id;
            employeeToUpdate.Age = input.Age;
            employeeToUpdate.Email = input.Email;
            employeeToUpdate.FullName = input.FullName;
            var updatedEmployee = await repository.UpdateEmployeeAsync(employeeToUpdate);

            return updatedEmployee;
        }

        public async Task<bool> DeleteEmployee(int id, [Service] EmployeeRepository repository)
        {
            return await repository.DeleteEmployeeAsync(id);
        }
    }
}