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
        public async Task<ActionResult<Profile>> Post(ProfilePost data)
        {
            var profile = new Profile();

            if (User.IsInRole("moder"))
            {
                profile.RoleId = (await db.Roles.FirstOrDefaultAsync(x => x.Name == "user")).Id;
            }
            else
            {
                var role = await db.Roles.FirstOrDefaultAsync(x => x.Name == data.Role);
                if (role == null) return BadRequest();
                profile.RoleId = role.Id;
            }
            profile.Name = data.Name;
            profile.MiddleName = data.MiddleName;
            profile.LastName = data.LastName;
            profile.Place = data.Place;

            await db.Profiles.AddAsync(profile);
            await db.SaveChangesAsync();

            return profile;
        }

        [Authorize(Roles = "moder,admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, ProfilePost data)
        {
            var profile = await db.Profiles.FirstOrDefaultAsync(x => x.Id == id);

            if(profile == null)
            {
                return NotFound();
            }

            if(User.IsInRole("admin"))
            {
                var role = await db.Roles.FirstOrDefaultAsync(x => x.Name == data.Role);
                if (role == null) return BadRequest();
                profile.RoleId = role.Id;
            }

            profile.Name = data.Name;
            profile.MiddleName = data.MiddleName;
            profile.LastName = data.LastName;
            profile.Place = data.Place;

            db.Profiles.Update(profile);
            await db.SaveChangesAsync();

            return Ok();
        }

        [Authorize(Roles = "moder,admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
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

            return Ok();
        }
    }
}
