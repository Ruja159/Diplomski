using System.Collections.Generic;
using System.Linq;
using Diplomski.Forms;
using Diplomski.Models;
using Microsoft.AspNetCore.Mvc;

namespace Diplomski.Controllers
{
    [Route ("api/post")]
    [ApiController]
    public class PostController : Controller
    {
        private readonly DatabaseContext _context;
        public PostController(DatabaseContext context)
        {
            _context=context;
        }

        [HttpGet]

        public JsonResult List()
        {
            List<Post> post = _context.Posts.ToList();
            return Json(post);
        }

    }
}