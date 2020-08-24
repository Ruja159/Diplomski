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

        [HttpGet("{id}")]

        public JsonResult List(int id)
        {

            BloodType bloodType = _context.BloodType.FirstOrDefault(u => u.Id == id);

            return Json(bloodType);
        }


        [HttpPost]
        public JsonResult Add([FromForm] BloodTypeForm bloodTypeForm)
        {
            BloodType bloodType = new BloodType();
            bloodType.Name = bloodTypeForm.Name;
            _context.BloodType.Add(bloodType);
            _context.SaveChanges();

            return Json(bloodType);

        }
        [HttpPut]
        public JsonResult Edit([FromForm] BloodTypeForm bloodTypeForm)
        {
            BloodType bloodType = _context.BloodType.FirstOrDefault(b => b.Id == bloodTypeForm.Id);
            bloodType.Name = bloodTypeForm.Name;
          

            _context.SaveChanges();
            return Json(bloodType);
        }


    }

}