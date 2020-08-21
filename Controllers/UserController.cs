using System.Collections.Generic;
using System.Linq;
using Diplomski.Forms;
using Diplomski.Models;
using Microsoft.AspNetCore.Mvc;

namespace Diplomski.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : Controller
    {
        private readonly DatabaseContext _context;
        public UserController (DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]
        public JsonResult List()
        {
            List<User> users = _context.Users.ToList();
            return Json(users);
        }

        [HttpPost]
        public JsonResult Add([FromForm] UserForm userForm)
        {
            User user = new User(); 
            user.Name = userForm.Name;
            user.LastName = userForm.LastName;
            user.BloodTypeId = userForm.BloodTypeId;
            user.CityId = userForm.CityId;
            
            //add user to database in order to generate id;
            _context.Users.Add(user);
            _context.SaveChanges();

            return Json(user);
        }
        [HttpPut]
        public JsonResult Edit([FromForm] UserForm userForm)
        {
            User user = _context.Users.FirstOrDefault(u => u.Id == userForm.Id);
            user.Name = userForm.Name;
            user.LastName = userForm.LastName;

            _context.SaveChanges();
            return Json(user);
        }
    }
}