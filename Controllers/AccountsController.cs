using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Dacha.Models;
using Dacha.Models.Post;
using Dacha.Models.Put;
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
        public async Task<ActionResult<Account>> Post(Account account)
        {
            var profile = await db.Profiles.Include(x => x.Role).FirstOrDefaultAsync(x => x.Id == account.ProfileId);

            if(profile == null)
            {
                return BadRequest();
            }

            if(User.IsInRole("moder") && profile.Role.Name != "user")
            {
                return Forbid();
            }
            
            await db.Accounts.AddAsync(account);
            await db.SaveChangesAsync();
            account = await db.Accounts.FirstOrDefaultAsync(x => x.Login == account.Login && x.Password == account.Password && x.ProfileId == account.ProfileId);

            return CreatedAtAction(nameof(Get), new { id = account.Id }, account);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Account account)
        {
            if(id != account.Id)
            {
                return BadRequest();
            }

            if((await db.Accounts.FindAsync(id)) == null)
            {
                return NotFound();
            }

            if(User.IsInRole("user") && account.Id.ToString() != User.FindFirstValue(ClaimTypes.NameIdentifier))
            {
                return Forbid();
            }

            var profile = await db.Profiles.Include(x => x.Role).FirstOrDefaultAsync(x => x.Id == account.ProfileId);

            if (profile == null)
            {
                return BadRequest();
            }

            if (!User.IsInRole("admin") && profile.Role.Name != "user")
            {
                return Forbid();
            }

            db.Accounts.Update(account);
            await db.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "moder,admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Account>> Delete(int id)
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

            return account;
        }
    }
}
