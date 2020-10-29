using System;
using System.Collections.Generic;
using System.Linq;
using Diplomski.Forms;
using Diplomski.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace Diplomski.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : Controller
    {

        private readonly DatabaseContext _context;
        private readonly IConfiguration _configuration;
        
        public UserController(DatabaseContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet]
        public JsonResult List()
        {
            List<User> users = _context.Users.Include(u => u.BloodType)
            .Include (c => c.City).ToList();
            return Json(users);
        }
        [HttpGet("{id}")]
        public JsonResult List(int id)
        {
            User user = _context.Users.Include(u => u.BloodType)
            .Include (c => c.City)
            .FirstOrDefault(u => u.Id == id);

            return Json(user.GeneralSelect());
        }
        [HttpPost]
        public JsonResult Add([FromBody] UserForm userForm)
        {
            if (!userForm.ValidateNew(_context))
            {
                return Json(userForm.ValidationErrorResponse(HttpContext));
            }

            string passwordSalt = _configuration.GetValue<string>("Salt", "");
            User user = new User();
            user.Name = userForm.Name;
            user.LastName = userForm.LastName;
            user.BloodTypeId = Int32.Parse(userForm.BloodTypeId);
            user.CityId = Int32.Parse(userForm.CityId);
            user.AddedTime = DateTime.Now;
            user.LastUpdate = DateTime.Now;
            user.Password =  Diplomski.Models.User.Hash(userForm.Password, passwordSalt);
            user.Email = userForm.Email;
      

            //add user to database in order to generate id;
            _context.Users.Add(user);
            _context.SaveChanges();

            return Json(user);
        }
        [HttpPut("{id}")]
        public JsonResult Edit([FromForm] UserForm userForm ,int id)
        {
            User user = _context.Users.FirstOrDefault(u => u.Id == id);
            user.Name = userForm.Name;
            user.LastName = userForm.LastName;
            user.BloodType = user.BloodType;
            user.City = user.City;


            _context.SaveChanges();
            return Json(user);
        }
    [HttpDelete("{id}")]
    public JsonResult Delete(int id)
        {
            User user = _context.Users.FirstOrDefault(u => u.Id == id);

             _context.Users.Remove(user);
            _context.SaveChanges();


            return Json(user);
        }

    }
}