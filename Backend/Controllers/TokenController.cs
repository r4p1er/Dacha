﻿using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Dacha.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Dacha.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        ApplicationContext db;
        IConfiguration Configuration;
        public TokenController(ApplicationContext context, IConfiguration configuration)
        {
            db = context;
            Configuration = configuration;
        }

        [HttpPost]
        public async Task<ActionResult> Token(Token data)
        {
            var identity = await GetIdentity(data.Login, data.Password);
            if(identity == null)
            {
                return BadRequest(new { errorText = "Неправильные логин или пароль" });
            }
            
            var jwt = new JwtSecurityToken(
                issuer: Configuration["AuthOptions:ISSUER"],
                audience: Configuration["AuthOptions:AUDIENCE"],
                notBefore: DateTime.Now,
                claims: identity.Claims,
                expires: DateTime.Now.Add(TimeSpan.FromMinutes(double.Parse(Configuration["AuthOptions:LIFETIME"]))),
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(Encoding.ASCII.GetBytes(Configuration["AuthOptions:KEY"])), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var account = await db.Accounts.Include(x => x.Role)
                                           .FirstOrDefaultAsync(x => x.Id == int.Parse(identity.FindFirst(ClaimTypes.NameIdentifier).Value));

            var response = new
            {
                token = encodedJwt,
                expires = DateTime.Now.Add(TimeSpan.FromMinutes(double.Parse(Configuration["AuthOptions:LIFETIME"]))),
                account = account
            };
            return new JsonResult(response);
        }

        private async Task<ClaimsIdentity> GetIdentity(string username, string password)
        {
            var account = await db.Accounts.Include(x => x.Role).FirstOrDefaultAsync(x => x.Login == username && x.Password == password);
            if(account != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, username),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, account.Role.Name),
                    new Claim(ClaimTypes.NameIdentifier, account.Id.ToString())
                };
                return new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            }
            return null;
        }
    }
}
