﻿using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dacha.Models
{
    public class ApplicationContext : DbContext
    {
        public DbSet<Account> Accounts { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<News> News { get; set; }
        public DbSet<Advert> Adverts { get; set; }
        public DbSet<Document> Documents { get; set; }
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

            modelBuilder.Entity<Account>().HasData(new Account
            {
                Id = 1,
                Login = "admin",
                Password = "admin",
                Name = "admin",
                MiddleName = "admin",
                LastName = "admin",
                Place = 0,
                RoleId = 3
            });
        }
    }
}
