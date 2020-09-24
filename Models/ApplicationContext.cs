using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dacha.Models
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Profile> Profiles { get; set; }
        public DbSet<Role> Roles { get; set; }
        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Role>().HasData(
                new Role[]
                {
                    new Role{Id=1, Name="user"},
                    new Role{Id=2, Name="moder"},
                    new Role{Id=3, Name="admin"}
                });
            modelBuilder.Entity<Profile>().HasData(new Profile { Id = 1, Name = "admin", MiddleName = "admin", LastName = "admin", Place = 228, RoleId = 3 });
            modelBuilder.Entity<Account>().HasData(new Account { Id = 1, Login = "admin", Password = "admin", ProfileId = 1 });
        }
    }
}
