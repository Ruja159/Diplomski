using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography;
using System.Text;

namespace Diplomski.Models
{
    public class User
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Name { get; set; }

        public string LastName { get; set; }
        public string Email { get; set; }
        public int? BloodTypeId { get; set; }
        [ForeignKey("BloodTypeId")]
        public virtual BloodType BloodType { get; set; }
        public int? CityId { get; set; }
        [ForeignKey("CityId")]
        public virtual City City { get; set; }
        public int Socre { get; set; }
        public string Password { get; set; }
        public bool Gender { get; set; }
        public DateTime AddedTime { get; set; }
        public DateTime LastUpdate { get; set; }

        public bool Admin { get; set; }

        public object GeneralSelect()
        {
            return new
            {
                Id = Id,
                Name = Name,
                LastName = LastName,
                Email = Email,
                BloodType = BloodType.Name,
                AddedTime = AddedTime,
                LastUpdate = LastUpdate,
                City = City
            };
        }
        public object GeneralSelectPost()
        {
            return new
            {
                Id = Id,
                Name = Name,
                LastName = LastName,
            };
        }

        public static string Hash(string password, string passwordSalt)
        {
            SHA256 sha256Hash = SHA256.Create();
            byte[] passwordBytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password + passwordSalt));
            string passwordHash = Convert.ToBase64String(passwordBytes);
            return passwordHash;

        }





    }
}