using System.Collections.Generic;
using System.Linq;
using Diplomski.Forms;
using Diplomski.Models;
using Microsoft.AspNetCore.Mvc;

namespace Diplomski.Controllers
{
    [Route("api/city")]
    [ApiController]
    public class CityController : Controller
    {
        private readonly DatabaseContext _context;

        public CityController(DatabaseContext context)
        {
            _context = context;
        }
        [HttpGet]

        public JsonResult List()
        {
            List<City> city = _context.Cities.ToList();
            return Json(city);
        }

         [HttpGet("{id}")]

        public JsonResult List(int id)
        {
           
            City city = _context.Cities.FirstOrDefault(u => u.Id == id);

            return Json(city);
        }


        [HttpPost]
        public JsonResult Add([FromForm] CityForm cityForm)
        {
            City city = new City();
            city.Name = cityForm.Name;
            city.PostalCode = cityForm.PostalCode;

            //add user to database in order to generate id;
            _context.Cities.Add(city);
            _context.SaveChanges();

            return Json(city);
        }
        [HttpPut]
        public JsonResult Edit([FromForm] CityForm cityForm)
        {
            City city = _context.Cities.FirstOrDefault(u => u.Id == cityForm.Id);
            city.Name = cityForm.Name;
            city.PostalCode = cityForm.PostalCode;

            _context.SaveChanges();
            return Json(city);

        }

        [HttpDelete("{postalcode}")]
        public JsonResult Delete(int postalcode)
        {
            City city = _context.Cities.FirstOrDefault(p => p.PostalCode == postalcode);

             _context.Cities.Remove(city);
            _context.SaveChanges();


            return Json(city);
        }
    }
}