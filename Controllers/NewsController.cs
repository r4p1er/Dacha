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
        public async Task<ActionResult<News>> Post(NewsPost data)
        {
            var news = new News();

            news.Title = data.Title;
            news.Body = data.Body;
            news.Date = DateTime.Now;

            await db.News.AddAsync(news);
            await db.SaveChangesAsync();

            return news;
        }

        [Authorize(Roles = "moder,admin")]
        [HttpPut("{id}")]
        public async Task<ActionResult> Put(int id, NewsPost data)
        {
            var news = await db.News.FirstOrDefaultAsync(x => x.Id == id);

            if(news == null)
            {
                return NotFound();
            }

            news.Title = data.Title;
            news.Body = data.Body;
            news.Date = DateTime.Now;

            db.News.Update(news);
            await db.SaveChangesAsync();

            return Ok();
        }

        [Authorize(Roles = "moder,admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var news = await db.News.FirstOrDefaultAsync(x => x.Id == id);

            if(news == null)
            {
                return NotFound();
            }

            db.News.Remove(news);
            await db.SaveChangesAsync();

            return Ok();
        }
    }
}
