using Server.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Server.Data {
    
    public class ServerContext : IdentityDbContext {

        public ServerContext (DbContextOptions<ServerContext> options)
            : base(options) {

        }

        public DbSet<Client> Clients {get;set;}=default!;
        public DbSet<Employee> Employees { get; set; } = default!;
        public DbSet<Secretary> Secretarys { get; set; } = default!;

    }
}