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
    [Route("api/posts")]
    [ApiController]
    public class AdvertsController : ControllerBase
    {
        ApplicationContext db;
        public AdvertsController(ApplicationContext context)
        {
            db = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AdvertGet>>> Get()
        {
            var adverts = await db.Adverts.Where(x => x.ExpDate <= DateTime.Now).ToListAsync();

            db.Adverts.RemoveRange(adverts);
            await db.SaveChangesAsync();

            var selectedAdverts = await db.Adverts.Include(x => x.Profile)
                                          .Select(x => new AdvertGet
                                          {
                                              Id = x.Id,
                                              Title = x.Title,
                                              Body = x.Body,
                                              Contact = x.Contact,
                                              Place = x.Profile.Place
                                          }).ToListAsync();

            return selectedAdverts;
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<AdvertGet>> Get(int id)
        {
            var advert = await db.Adverts.Include(x => x.Profile).FirstOrDefaultAsync(x => x.Id == id);

            if(advert == null)
            {
                return NotFound();
            }

            if(advert.ExpDate <= DateTime.Now)
            {
                db.Adverts.Remove(advert);
                await db.SaveChangesAsync();
                return NotFound();
            }

            return new AdvertGet { Id = advert.Id, Title = advert.Title, Body = advert.Body, Contact = advert.Contact, Place = advert.Profile.Place };
        }

        [Authorize]
        [HttpGet("current")]
        public async Task<ActionResult<IEnumerable<AdvertGet>>> GetCurrent()
        {
            int accountId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));
            var profile = (await db.Accounts.Include(x => x.Profile).FirstOrDefaultAsync(x => x.Id == accountId)).Profile;

            var adverts = await db.Adverts.Where(x => x.ExpDate <= DateTime.Now).ToListAsync();
            db.Adverts.RemoveRange(adverts);
            await db.SaveChangesAsync();

            var selectedAdverts = await db.Adverts.Where(x => x.ProfileId == profile.Id)
                                                  .Select(x => new AdvertGet { Id = x.Id, Title = x.Title, Body = x.Body, Contact = x.Contact, Place = profile.Place })
                                                  .ToListAsync();

            return selectedAdverts;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Advert>> Post(Advert advert)
        {
            var userProfileId = (await db.Accounts.FindAsync(int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)))).ProfileId;

            advert.Id = default;
            advert.ProfileId = userProfileId;
            await db.Adverts.AddAsync(advert);
            await db.SaveChangesAsync();
            advert = await db.Adverts.FirstOrDefaultAsync(x => x.Title == advert.Title && x.Body == advert.Body
                                                                                       && x.Contact == advert.Contact 
                                                                                       && x.ExpDate == advert.ExpDate 
                                                                                       && x.ProfileId == advert.ProfileId);

            return CreatedAtAction(nameof(Get), new { id = advert.Id }, advert);
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, Advert advert)
        {
            if(id != advert.Id)
            {
                return BadRequest();
            }

            if(advert.ProfileId != (await db.Accounts.FirstOrDefaultAsync(x => x.Id.ToString() == User.FindFirstValue(ClaimTypes.NameIdentifier))).ProfileId)
            {
                return Forbid();
            }

            try
            {
                db.Adverts.Update(advert);
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

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult<AdvertGet>> Delete(int id)
        {
            var advert = await db.Adverts.Include(x => x.Profile).FirstOrDefaultAsync(x => x.Id == id);

            if(advert == null)
            {
                return NotFound();
            }

            if(User.IsInRole("user") && advert.ProfileId != (await db.Accounts.FirstOrDefaultAsync(x => x.Id.ToString() == User.FindFirstValue(ClaimTypes.NameIdentifier))).ProfileId)
            {
                return Forbid();
            }

            db.Adverts.Remove(advert);
            await db.SaveChangesAsync();

            return new AdvertGet { Id = advert.Id, Title = advert.Title, Body = advert.Body, Contact = advert.Contact, Place = advert.Profile.Place };
        }

        private async Task<bool> ExistsAsync(int id) => await db.Adverts.AnyAsync(e => e.Id == id);
    }
}
