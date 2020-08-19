using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Diplomski.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Name { get; set; }

        public string LastName { get; set; }
        public string Email {get; set;}
        public int? BloodTypeId { get; set; }
        [ForeignKey("BloodTypeId")]
        public virtual BloodType BloodType { get; set; }
        public int? CityId { get; set; }
        [ForeignKey("CityId")]
        public virtual City City { get; set; }
        public int Socre {get; set;}
        public string Password {get; set;}
        public DateTime AddedTime {get; set;}
        public DateTime LastUpdate {get; set;}


        



    }
}