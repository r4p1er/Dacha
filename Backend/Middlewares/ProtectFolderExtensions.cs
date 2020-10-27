using Microsoft.AspNetCore.Builder;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;

namespace Dacha.Middlewares
{
    public static class ProtectFolderExtensions
    {
        public static IApplicationBuilder UseProtectFolder(this IApplicationBuilder builder, ProtectFolderOptions options)
        {
            return builder.UseMiddleware<ProtectFolder>(options);
        }
    }
}
