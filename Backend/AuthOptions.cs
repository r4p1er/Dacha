using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Dacha
{
    public class AuthOptions
    {
        public const string ISSUER = "pokrovskie-dachi.ru";
        public const string AUDIENCE = "client";
        const string KEY = "T3P2ygqLrTESQQboeAYK0YyoV08c";
        public const int LIFETIME = 43200;
        public static SymmetricSecurityKey GetSymmetricSecurityKey()
        {
            return new SymmetricSecurityKey(Encoding.ASCII.GetBytes(KEY));
        }
    }
}
