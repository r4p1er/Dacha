using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Dacha.Middlewares
{
    public class ProtectFolder
    {
        private readonly RequestDelegate next;
        private readonly PathString path;
        private readonly string policyName;

        public ProtectFolder(RequestDelegate next, ProtectFolderOptions options)
        {
            this.next = next;
            path = options.Path;
            policyName = options.PolicyName;
        }

        public async Task Invoke(HttpContext httpContext, IAuthorizationService authorizationService)
        {
            if (httpContext.Request.Path.StartsWithSegments(path))
            {
                var authorized = await authorizationService.AuthorizeAsync(httpContext.User, policyName);

                if (!authorized.Succeeded)
                {
                    await httpContext.ChallengeAsync();
                    return;
                }
            }

            await next(httpContext);
        }
    }
}
