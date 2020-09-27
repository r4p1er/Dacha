using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Dacha.Models;
using Dacha.Models.Get;
using Dacha.Models.Post;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Dacha.Controllers
{
    [Route("api/[controller]")]
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
        [HttpPost]
        public async Task<ActionResult<Advert>> Post(AdvertPost data)
        {
            var advert = new Advert();

            advert.Title = data.Title;
            advert.Body = data.Body;
            advert.Contact = data.Contact;
            advert.ExpDate = DateTime.Now.AddDays(30);
            advert.ProfileId = (await db.Accounts.FirstOrDefaultAsync(x => x.Id.ToString() == User.FindFirstValue(ClaimTypes.NameIdentifier))).ProfileId;

            await db.Adverts.AddAsync(advert);
            await db.SaveChangesAsync();

            return advert;
        }

        [Authorize]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, AdvertPost data)
        {
            var advert = await db.Adverts.FirstOrDefaultAsync(x => x.Id == id);

            if(advert == null)
            {
                return NotFound();
            }

            if(advert.ProfileId != (await db.Accounts.FirstOrDefaultAsync(x => x.Id.ToString() == User.FindFirstValue(ClaimTypes.NameIdentifier))).ProfileId)
            {
                return Forbid();
            }

            advert.Title = data.Title;
            advert.Body = data.Body;
            advert.Contact = data.Contact;
            advert.ExpDate = DateTime.Now.AddDays(30);

            db.Adverts.Update(advert);
            await db.SaveChangesAsync();

            return Ok();
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var advert = await db.Adverts.FirstOrDefaultAsync(x => x.Id == id);

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

            return Ok();
        }
    }
}
