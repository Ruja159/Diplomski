using System.Collections.Generic;
using System.Linq;
using Diplomski.Forms;
using Diplomski.Models;
using Microsoft.AspNetCore.Mvc;


namespace Diplomski.Controllers
{
    [Route("api/bloodtype")]
    [ApiController]
    public class BloodTypeController : Controller
    {
        private readonly DatabaseContext _context;

        public BloodTypeController(DatabaseContext context) 
        {
            _context = context;
        }

        [HttpGet]

        public JsonResult List()
        {
            List<BloodType> bloodType = _context.BloodType.ToList();
            return Json(bloodType);
        }

        [HttpPost]
        public JsonResult Add([FromForm] BloodTypeForm bloodTypeForm)
        {
            BloodType bloodType = new BloodType();
            bloodType.Name=bloodTypeForm.Name;
            _context.BloodType.Add(bloodType);
            _context.SaveChanges();

             return Json(bloodType);
    
        }
    }

}