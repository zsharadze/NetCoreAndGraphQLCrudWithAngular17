using NetCoreGraphQLCrudBackend.Data;
using NetCoreGraphQLCrudBackend.Models;
using Microsoft.EntityFrameworkCore;

namespace NetCoreGraphQLCrudBackend.Repository
{
    public class EmployeeRepository
    {
        private readonly ApplicationDbContext _context;

        public EmployeeRepository(ApplicationDbContext context)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
        }

        public async Task<Employee> AddEmployeeAsync(Employee employee)
        {
            await _context.Employees.AddAsync(employee);
            await _context.SaveChangesAsync();
            return employee;
        }

        public async Task<Employee> GetEmployeeAsync(int id)
        {
            var employee = await _context.Employees.FindAsync(id);

            if (employee == null)
            {
                throw new Exception($"Employee with id {id} not found.");
            }

            return employee;
        }

        public async Task<List<Employee>> GetAllEmployeeAsync(string searchText)
        {
            if (string.IsNullOrEmpty(searchText))
            {
                return await _context.Employees.ToListAsync();
            }
            else
            {
                return await _context.Employees.Where(x => x.FullName.StartsWith(searchText)).ToListAsync();
            }
        }

        public async Task<Employee> UpdateEmployeeAsync(Employee updatedEmployee)
        {
            var existingEmployee = await GetEmployeeAsync(updatedEmployee.Id);
            existingEmployee.Age = updatedEmployee.Age;
            existingEmployee.Email = updatedEmployee.Email;
            existingEmployee.FullName = updatedEmployee.FullName;
            await _context.SaveChangesAsync();
            return existingEmployee;
        }

        public async Task<bool> DeleteEmployeeAsync(int id)
        {
            var employeeToRemove = await _context.Employees.FindAsync(id);
            if (employeeToRemove != null)
            {
                _context.Employees.Remove(employeeToRemove);
                await _context.SaveChangesAsync();
                return true;
            }
            else
                throw new Exception($"Employee with id {id} not found.");
        }
    }
}
