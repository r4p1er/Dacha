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
    public class NewsController : ControllerBase
    {
        ApplicationContext db;
        public NewsController(ApplicationContext context)
        {
            db = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<News>>> Get()
        {
            return await db.News.ToListAsync();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<News>> Get(int id)
        {
            var news = await db.News.FirstOrDefaultAsync(x => x.Id == id);

            if(news == null)
            {
                return NotFound();
            }

            return news;
        }

        [Authorize(Roles = "moder,admin")]
        [HttpPost]
        public async Task<ActionResult<News>> Post(News news)
        {
            news.Id = default;
            news.Date = DateTime.Now;

            await db.News.AddAsync(news);
            await db.SaveChangesAsync();

            news = await db.News.FirstOrDefaultAsync(x => x.Title == news.Title && x.Body == news.Body && x.Date == news.Date);

            return CreatedAtAction(nameof(Get), new { id = news.Id }, news);
        }

        [Authorize(Roles = "moder,admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, News news)
        {
            if(id != news.Id)
            {
                return BadRequest();
            }

            try
            {
                news.Date = DateTime.Now;
                db.News.Update(news);
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if ((await ExistsAsync(id)) == false)
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
        public async Task<ActionResult<News>> Delete(int id)
        {
            var news = await db.News.FirstOrDefaultAsync(x => x.Id == id);

            if(news == null)
            {
                return NotFound();
            }

            db.News.Remove(news);
            await db.SaveChangesAsync();

            return news;
        }

        private async Task<bool> ExistsAsync(int id) => await db.News.AnyAsync(e => e.Id == id);
    }
}
