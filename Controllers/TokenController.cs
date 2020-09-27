using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Dacha.Models;
using Dacha.Models.Post;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

namespace Dacha.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        ApplicationContext db;
        public TokenController(ApplicationContext context)
        {
            db = context;
        }

        [HttpPost]
        public async Task<ActionResult> Token(TokenPost data)
        {
            var identity = await GetIdentity(data.Login, data.Password);
            if(identity == null)
            {
                return BadRequest(new { errorText = "Неправильные логин или пароль" });
            }

            var now = DateTime.Now;
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);

            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name,
                account_id = identity.FindFirst(ClaimTypes.NameIdentifier).Value,
                expires = now.AddDays(30).ToString("G")
            };
            return new JsonResult(response);
        }

        private async Task<ClaimsIdentity> GetIdentity(string username, string password)
        {
            var account = await db.Accounts.Include(x => x.Profile).ThenInclude(x => x.Role).FirstOrDefaultAsync(x => x.Login == username && x.Password == password);
            if(account != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, username),
                    new Claim(ClaimsIdentity.DefaultRoleClaimType, account.Profile.Role.Name),
                    new Claim(ClaimTypes.NameIdentifier, account.Id.ToString())
                };
                return new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);
            }
            return null;
        }
    }
}
