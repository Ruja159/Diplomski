using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using Diplomski.Forms;
using Diplomski.Helpers;
using Diplomski.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Diplomski.Controllers
{
    [Route("api/post")]
    [ApiController]
    public class PostController : Controller
    {
        private readonly DatabaseContext _context;
        public PostController(DatabaseContext context)
        {
            _context = context;
        }

        [HttpGet]

        public JsonResult List()
        {
            List<Post> post = _context.Posts.Include(u => u.User)
            .Include(b => b.BloodType).Include(c => c.City).Where(p => p.Status == 0).OrderByDescending(p => p.AddedPost).ToList();
            return Json(post);
        }


        [HttpGet("{id}")]

        public JsonResult List(int id)
        {
            Post post = _context.Posts.Include(u => u.User).Include(b => b.BloodType).Include(c => c.City)
            .FirstOrDefault(p => p.Id == id);

            return Json(post.GeneralPost());
        }

        [HttpPost]

        public JsonResult Add([FromBody] PostForm postForm)
        {
            User user = _context.Users.FirstOrDefault(u => u.Id == postForm.UserId);
            Post post = new Post();
            post.UserId = postForm.UserId;
            post.BloodTypeId = Int32.Parse(postForm.BloodTypeId);
            post.CityId = Int32.Parse(postForm.CityId);
            post.Description = postForm.Description;
            post.AddedPost = DateTime.Now;
            post.WhoNeedBlood = postForm.WhoNeedBlood;
            post.Status = postForm.Status;

            //add post to database in order to generate id;
            _context.Posts.Add(post);
            _context.SaveChanges();

            string neededTypeName = _context.BloodType.FirstOrDefault(b => b.Id == post.BloodTypeId).Name;
            string body = "Vi mozete spasiti jedan zivot. Potrebna krvna grupa " + neededTypeName + ". " + post.Description;
            string subject = "Potreba krvna grupa " + neededTypeName;

           List<User> users =  _context.Users.Where(u => u.BloodTypeId == post.BloodTypeId).ToList();

           foreach (User u in users){
                EmailSender.SendEmail(u.Email, subject, body);
           }


            return List();
        }

        [HttpPut]

        public JsonResult Edit([FromBody] PostForm postForm)
        {
            Post post = _context.Posts.FirstOrDefault(p => p.Id == postForm.Id);
            post.UserId = postForm.UserId;
            post.BloodTypeId = Int32.Parse(postForm.BloodTypeId);
            post.CityId = Int32.Parse(postForm.CityId);
            post.Description = postForm.Description;
            post.WhoNeedBlood = postForm.WhoNeedBlood;
            post.Status = postForm.Status;

            _context.SaveChanges();
            return Json(post);
        }

        [HttpDelete("{id}")]
        public JsonResult Delete(int id)
        {
            Post post = _context.Posts.FirstOrDefault(p => p.Id == id);

            _context.Posts.Remove(post);
            _context.SaveChanges();


            return Json(post);
        }


    }
}