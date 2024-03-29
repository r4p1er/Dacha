﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Dacha.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Dacha.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountsController : ControllerBase
    {
        ApplicationContext db;
        public AccountsController(ApplicationContext context)
        {
            db = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Account>>> Get()
        {
            return await db.Accounts.Include(x => x.Role).ToListAsync();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> Get(int id)
        {
            var account = await db.Accounts.Include(x => x.Role).FirstOrDefaultAsync(x => x.Id == id);
            if (account == null) return NotFound();
            return account;
        }

        [Authorize(Roles = "moder,admin")]
        [HttpPost]
        public async Task<ActionResult<Account>> Post(AccountDTO accountDTO)
        {
            var role = await db.Roles.FindAsync(accountDTO.RoleId);

            if(role == null)
            {
                return BadRequest();
            }

            if(User.IsInRole("moder") && role.Name != "user")
            {
                return Forbid();
            }

            if(string.IsNullOrWhiteSpace(accountDTO.Login) || string.IsNullOrWhiteSpace(accountDTO.Password))
            {
                return BadRequest();
            }

            var account = new Account
            {
                Login = accountDTO.Login,
                Password = accountDTO.Password,
                Name = accountDTO.Name,
                MiddleName = accountDTO.MiddleName,
                LastName = accountDTO.LastName,
                Place = accountDTO.Place,
                RoleId = accountDTO.RoleId
            };

            await db.Accounts.AddAsync(account);
            await db.SaveChangesAsync();
            account = await db.Accounts.Include(x => x.Role).FirstOrDefaultAsync(x => x.Login == account.Login && x.Password == account.Password && x.Place == account.Place);

            return CreatedAtAction(nameof(Get), new { id = account.Id }, account);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, AccountDTO accountDTO)
        {
            if(id != accountDTO.Id)
            {
                return BadRequest();
            }

            if(User.IsInRole("user") && accountDTO.Id.ToString() != User.FindFirstValue(ClaimTypes.NameIdentifier))
            {
                return Forbid();
            }

            var role = await db.Roles.FindAsync(accountDTO.RoleId);

            if (role == null)
            {
                return BadRequest();
            }

            if (!User.IsInRole("admin") && role.Name != "user")
            {
                return Forbid();
            }

            if (string.IsNullOrWhiteSpace(accountDTO.Login))
            {
                return BadRequest();
            }

            var account = await db.Accounts.Include(x => x.Role).FirstOrDefaultAsync(x => x.Id == id);
            account.Login = accountDTO.Login;
            account.Name = accountDTO.Name;
            account.MiddleName = account.MiddleName;
            account.LastName = accountDTO.LastName;
            account.Place = accountDTO.Place;
            account.RoleId = accountDTO.RoleId;
            if (!string.IsNullOrWhiteSpace(accountDTO.Password)) account.Password = accountDTO.Password;

            try
            {
                db.Accounts.Update(account);
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if((await ExistsAsync(id)) == false)
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [Authorize(Roles = "moder,admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Account>> Delete(int id)
        {
            var account = await db.Accounts.Include(x => x.Role).Include(x => x.Role).FirstOrDefaultAsync(x => x.Id == id);

            if(account == null)
            {
                return NotFound();
            }

            if(User.IsInRole("moder") && account.Role.Name != "user")
            {
                return Forbid();
            }

            db.Accounts.Remove(account);
            await db.SaveChangesAsync();

            return account;
        }

        private async Task<bool> ExistsAsync(int id) => await db.Accounts.AnyAsync(e => e.Id == id);

        private static AccountDTO ItemToDTO(Account account) =>
            new AccountDTO
            {
                Id = account.Id,
                Login = account.Login,
                Password = account.Password,
                Name = account.Name,
                MiddleName = account.MiddleName,
                LastName = account.LastName,
                Place = account.Place,
                RoleId = account.RoleId
            };
    }
}
