using System.Collections.Generic;
using System.Linq;
using Diplomski.Forms;
using Diplomski.Models;
using Microsoft.AspNetCore.Mvc;

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
            List<Post> post = _context.Posts.ToList();
            return Json(post);
        }


        [HttpGet("{id}")]

        public JsonResult List(int id)
        {
            Post post = _context.Posts
            .FirstOrDefault(p => p.Id == id);

            return Json(post);
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




    }
}