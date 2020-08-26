using System.Collections.Generic;
using System.Linq;
using Diplomski.Forms;
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
            .Include(b => b.BloodType).Include(c => c.City).ToList();
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

        public JsonResult Add([FromForm] PostForm postForm)
        {
            Post post = new Post();
            post.UserId = postForm.UserId;
            post.BloodTypeId = postForm.BloodTypeId;
            post.CityId = postForm.CityId;
            post.Description = postForm.Description;
            post.Status = postForm.Status;

            //add post to database in order to generate id;
            _context.Posts.Add(post);
            _context.SaveChanges();

            return Json(post);
        }

        [HttpPut]

        public JsonResult Edit([FromForm] PostForm postForm)
        {
            Post post = _context.Posts.FirstOrDefault(p => p.Id == postForm.Id);
            post.UserId = postForm.UserId;
            post.BloodTypeId = postForm.BloodTypeId;
            post.CityId = postForm.CityId;
            post.Description = postForm.Description;
            post.Status = postForm.Status;

            _context.SaveChanges();
            return Json(post);
        }


    }
}