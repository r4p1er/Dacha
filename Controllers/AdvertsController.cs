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
    public class AdvertsController : ControllerBase
    {
        ApplicationContext db;
        public AdvertsController(ApplicationContext context)
        {
            db = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Advert>>> Get()
        {
            foreach (var item in db.Adverts) if (item.ExpDate <= DateTime.Now) db.Adverts.Remove(item);
            await db.SaveChangesAsync();
            return await db.Adverts.ToListAsync();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Advert>> Get(int id)
        {
            var advert = await db.Adverts.FirstOrDefaultAsync(x => x.Id == id);

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

            return advert;
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
