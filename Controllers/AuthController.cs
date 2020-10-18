using Diplomski.Forms;
using Diplomski.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System;
using System.Linq;
using System.Text.Json;

namespace Diplomski.Controllers
{
    [Route("/api/auth")]
    [ApiController]
    public class AuthController : Controller
    {
        private readonly DatabaseContext _context;
        private readonly IConfiguration _configuration;

        public AuthController(DatabaseContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost]
        public JsonResult Login([FromForm] LoginForm loginForm )
        {
            User user = _context.Users.FirstOrDefault(u => u.Email == loginForm.Email);

            if (user != null)
            {
                string passwordSalt = _configuration.GetValue<string>("Salt", "");
                // nikola >> a;sdlfkjskadl;f 456asd5f45654
                if ( Diplomski.Models.User.Hash(loginForm.Password, passwordSalt) == user.Password)
                {
                    // HttpContext.Session.Set("userId", JsonSerializer.SerializeToUtf8Bytes(user.Id));
                    return Json(new {success=true, message="Logged in successfully"});
                }             
            }
            return Json(new {success=false, message="Wrong username or password"});
        }

        [HttpGet]
        public JsonResult LogOut()
        {
            HttpContext.Session.Remove("userId");
            return Json(new {success = true});
        }
        
    }
}