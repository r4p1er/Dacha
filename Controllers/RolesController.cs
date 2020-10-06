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
    public class RolesController : ControllerBase
    {
        ApplicationContext db;
        public RolesController(ApplicationContext context)
        {
            db = context;
        }

        [Authorize]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Role>>> Get()
        {
            return await db.Roles.ToListAsync();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Role>> Get(int id)
        {
            var role = await db.Roles.FirstOrDefaultAsync(x => x.Id == id);

            if(role == null)
            {
                return NotFound();
            }

            return role;
        }
    }
}
