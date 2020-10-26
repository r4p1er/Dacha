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
        public async Task<ActionResult<IEnumerable<AdvertDTO>>> Get()
        {
            var adverts = await db.Adverts.Where(x => x.Date.AddDays(30) <= DateTime.Now).ToListAsync();

            db.Adverts.RemoveRange(adverts);
            await db.SaveChangesAsync();

            var selectedAdverts = await db.Adverts.Include(x => x.Account).Select(x => new AdvertDTO(x)).ToListAsync();

            return selectedAdverts;
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<AdvertDTO>> Get(int id)
        {
            var advert = await db.Adverts.Include(x => x.Account).FirstOrDefaultAsync(x => x.Id == id);

            if(advert == null)
            {
                return NotFound();
            }

            if(advert.Date.AddDays(30) <= DateTime.Now)
            {
                db.Adverts.Remove(advert);
                await db.SaveChangesAsync();
                return NotFound();
            }

            return new AdvertDTO(advert);
        }

        [Authorize]
        [HttpGet("current")]
        public async Task<ActionResult<IEnumerable<AdvertDTO>>> GetCurrent()
        {
            int accountId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            var adverts = await db.Adverts.Where(x => x.Date.AddDays(30) <= DateTime.Now).ToListAsync();
            db.Adverts.RemoveRange(adverts);
            await db.SaveChangesAsync();

            var selectedAdverts = await db.Adverts.Include(x => x.Account)
                                                  .Where(x => x.AccountId == accountId)
                                                  .Select(x => new AdvertDTO(x))
                                                  .ToListAsync();

            return selectedAdverts;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Advert>> Post(Advert advert)
        {
            var userAccountId = int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier));

            advert.Id = default;
            advert.AccountId = userAccountId;
            advert.Date = DateTime.Now;
            
            await db.Adverts.AddAsync(advert);
            await db.SaveChangesAsync();
            advert = await db.Adverts.FirstOrDefaultAsync(x => x.Title == advert.Title && x.Body == advert.Body
                                                                                       && x.Contact == advert.Contact 
                                                                                       && x.Date == advert.Date 
                                                                                       && x.AccountId == advert.AccountId);

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

            if(advert.AccountId != int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)))
            {
                return Forbid();
            }

            try
            {
                advert.Date = DateTime.Now;
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
        public async Task<ActionResult<AdvertDTO>> Delete(int id)
        {
            var advert = await db.Adverts.Include(x => x.Account).FirstOrDefaultAsync(x => x.Id == id);

            if(advert == null)
            {
                return NotFound();
            }

            if(User.IsInRole("user") && advert.AccountId != int.Parse(User.FindFirstValue(ClaimTypes.NameIdentifier)))
            {
                return Forbid();
            }

            db.Adverts.Remove(advert);
            await db.SaveChangesAsync();

            return new AdvertDTO(advert);
        }

        private async Task<bool> ExistsAsync(int id) => await db.Adverts.AnyAsync(e => e.Id == id);
    }
}
