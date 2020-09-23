using System;
using System.Collections.Generic;
using System.Linq;
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
            return await db.Accounts.ToListAsync();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Account>> Get(int id)
        {
            var account = await db.Accounts.FirstOrDefaultAsync(x => x.Id == id);
            if (account == null) return NotFound();
            return account;
        }

        [Authorize(Roles = "moder,admin")]
        [HttpPost]
        public async Task<ActionResult<Account>> Post(AccountPost data)
        {
            var account = new Account();

            account.Login = data.Login;
            account.Password = data.Password;

            var profile = await db.Profiles.Include(x => x.Role).FirstOrDefaultAsync(x => x.Id == data.ProfileId);
            if(profile == null)
            {
                return BadRequest();
            }
            if(User.IsInRole("moder") && profile.Role.Name != "user")
            {
                return Forbid();
            }
            account.ProfileId = profile.Id;

            await db.Accounts.AddAsync(account);
            await db.SaveChangesAsync();

            return account;
        }

        [Authorize(Roles = "moder,admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, AccountPut data)
        {
            var account = await db.Accounts.FirstOrDefaultAsync(x => x.Id == id);
            if(account == null)
            {
                return NotFound();
            }

            account.Login = data.Login;
            if(data.NewPassword != null)
            {
                account.Password = data.NewPassword;
            }

            var profile = await db.Profiles.Include(x => x.Role).FirstOrDefaultAsync(x => x.Id == data.ProfileId);
            if (profile == null)
            {
                return BadRequest();
            }
            if (User.IsInRole("moder") && profile.Role.Name != "user")
            {
                return Forbid();
            }
            account.ProfileId = profile.Id;

            db.Accounts.Update(account);
            await db.SaveChangesAsync();

            return Ok();
        }

        [Authorize(Roles = "moder,admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var account = await db.Accounts.Include(x => x.Profile).ThenInclude(x => x.Role).FirstOrDefaultAsync(x => x.Id == id);
            if(account == null)
            {
                return NotFound();
            }
            if(User.IsInRole("moder") && account.Profile.Role.Name != "user")
            {
                return Forbid();
            }

            db.Accounts.Remove(account);
            await db.SaveChangesAsync();

            return Ok();
        }
    }
}
