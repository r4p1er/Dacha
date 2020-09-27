using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Dacha.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Dacha.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentsController : ControllerBase
    {
        ApplicationContext db;
        IWebHostEnvironment appEnvironment;
        public DocumentsController(ApplicationContext context, IWebHostEnvironment environment)
        {
            db = context;
            appEnvironment = environment;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Document>>> Get()
        {
            return await db.Documents.ToListAsync();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult> Get(int id)
        {
            var document = await db.Documents.FirstOrDefaultAsync(x => x.Id == id);

            if(document == null)
            {
                return NotFound();
            }

            string path = Path.Combine(appEnvironment.WebRootPath, document.Path);

            var fs = new FileStream(path, FileMode.Open);

            return File(fs, "application/octet-stream", document.Name);
        }

        [Authorize(Roles = "moder,admin")]
        [HttpPost]
        public async Task<ActionResult> Post([FromForm]IFormFile uploadedFile)
        {
            if(uploadedFile == null)
            {
                return BadRequest();
            }

            string path = "Files/" + uploadedFile.FileName;
            using(var fileStream = new FileStream(appEnvironment.WebRootPath + path, FileMode.Create))
            {
                await uploadedFile.CopyToAsync(fileStream);
            }

            var document = new Document { Name = uploadedFile.FileName, Path = path };
            await db.Documents.AddAsync(document);
            await db.SaveChangesAsync();

            return Ok();
        }

        [Authorize(Roles = "moder,admin")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> Delete(int id)
        {
            var document = await db.Documents.FirstOrDefaultAsync(x => x.Id == id);

            if(document == null)
            {
                return NotFound();
            }

            db.Documents.Remove(document);
            await db.SaveChangesAsync();

            return Ok();
        }
    }
}
