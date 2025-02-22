using NetCoreGraphQLCrudBackend.Models;
using NetCoreGraphQLCrudBackend.Repository;

namespace NetCoreGraphQLCrudBackend.GraphQL
{
    public class EmployeeQueryTypes
    {
        public async Task<List<Employee>> GetEmployees(string searchText, [Service] EmployeeRepository repository) =>
        await repository.GetAllEmployeeAsync(searchText);

        public async Task<Employee> GetEmployee(int id, [Service] EmployeeRepository repository) =>
        await repository.GetEmployeeAsync(id);
    }
}
