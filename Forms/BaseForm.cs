using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace Diplomski.Forms
{
    public abstract class BaseForm
    {
        public Dictionary<string, string> errors = new Dictionary<string, string>();

        public string message = "";

        public object ValidationErrorResponse(HttpContext context)
        {
            context.Response.StatusCode = 400;
            return new {
                sucess = false,
                message = this.message,
                errors = errors
            };
        }

    }
}