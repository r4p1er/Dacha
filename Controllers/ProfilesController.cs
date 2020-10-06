using System;
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
    public class ProfilesController : ControllerBase
    {
        ApplicationContext db;
        public ProfilesController(ApplicationContext context)
        {
            db = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Profile>>> Get()
        {
            return await db.Profiles.ToListAsync();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Profile>> Get(int id)
        {
            var profile = await db.Profiles.FirstOrDefaultAsync(x => x.Id == id);

            if(profile == null)
            {
                return NotFound();
            }

            return profile;
        }

        [Authorize(Roles = "moder,admin")]
        [HttpPost]
        public async Task<ActionResult<Profile>> Post(Profile profile)
        {
            var profileRole = await db.Roles.FindAsync(profile.RoleId);

            if(profileRole == null)
            {
                return BadRequest();
            }

            if (User.IsInRole("moder") && profileRole.Name != "user")
            {
                return Forbid();
            }

            profile.Id = default;
            await db.Profiles.AddAsync(profile);
            await db.SaveChangesAsync();
            profile = await db.Profiles.FirstOrDefaultAsync(x => x.LastName == profile.LastName && x.MiddleName == profile.MiddleName && x.Name == profile.Name && x.Place == profile.Place);

            return CreatedAtAction(nameof(Get), new { id = profile.Id }, profile);
        }

        [Authorize(Roles = "moder,admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Profile profile)
        {
            if(id != profile.Id)
            {
                return BadRequest();
            }

            if((await db.Profiles.FindAsync(id)) == null)
            {
                return NotFound();
            }

            var profileRole = await db.Roles.FindAsync(profile.RoleId);

            if(profileRole == null)
            {
                return BadRequest();
            }

            if(User.IsInRole("moder") && profileRole.Name != "user")
            {
                return Forbid();
            }

            db.Profiles.Update(profile);
            await db.SaveChangesAsync();

            return NoContent();
        }

        [Authorize(Roles = "moder,admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult<Profile>> Delete(int id)
        {
            var profile = await db.Profiles.Include(x => x.Role).FirstOrDefaultAsync(x => x.Id == id);
            if(profile == null)
            {
                return NotFound();
            }

            if(User.IsInRole("moder") && profile.Role.Name != "user")
            {
                return Forbid();
            }

            db.Profiles.Remove(profile);
            await db.SaveChangesAsync();

            return profile;
        }
    }
}
