

using NetCoreGraphQLCrudBackend.Data;
using NetCoreGraphQLCrudBackend.GraphQL;
using NetCoreGraphQLCrudBackend.Repository;
using Microsoft.EntityFrameworkCore;

string MyAllowSpecificOrigins = "localhost-angular";

var builder = WebApplication.CreateBuilder(args);

var allowedCorsOrigins = builder.Configuration.GetSection("Cors").Get<string[]>();

builder.Services.AddCors(o => o.AddPolicy(MyAllowSpecificOrigins, b =>
{
    b.WithOrigins(allowedCorsOrigins)
           .AllowAnyMethod()
           .AllowAnyHeader()
           .AllowCredentials();
}));

builder.Services.AddDbContext<ApplicationDbContext>(
    options => options.UseSqlServer(builder.Configuration.GetValue<string>("ConnectionStrings:DefaultConnection")));
//Add services to the container.
builder.Services.AddScoped<EmployeeRepository>();
//GraphQL Config
builder.Services.AddGraphQLServer()
    .AddQueryType<EmployeeQueryTypes>()
    .AddMutationType<EmployeeMutations>();

var app = builder.Build();

app.UseCors(MyAllowSpecificOrigins);
app.MapGraphQL(path: "/graphql");
app.UseHttpsRedirection();
app.Run();