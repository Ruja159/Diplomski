using System.Linq;
using Diplomski.Models;

namespace Diplomski.Forms
{
    public class UserForm : BaseForm
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string CityId { get; set; }
        public string BloodTypeId { get; set; }

        public bool Gender { get; set; }

        public string Password { get; set; }
        public string PasswordRepeated { get; set; }

        public bool ValidateNew(DatabaseContext context)
        {
            bool error = false;

            if (string.IsNullOrWhiteSpace(Name))
            {
                error = true;
                errors.Add("name", "Name field is empty");
            }

            if (context.Users.Any(u => u.Email == Email))
            {
                error = true;
                errors.Add("duplicateField", "User with same email address already exists in out database");
            }
            
            if (string.IsNullOrWhiteSpace(Email))
            {
                error = true;
                errors.Add("email", "Email is required");
            }

            if (string.IsNullOrWhiteSpace(LastName))
            {
                error = true;
                errors.Add("lastName", "LastName field is empty");
            }

            if (string.IsNullOrWhiteSpace(Password) || string.IsNullOrWhiteSpace(PasswordRepeated))
            {
                error = true;
                errors.Add("password", "Password required");
            }

            if (Password != PasswordRepeated)
            {
                error = true;
                errors.Add("passwordMismatch", "Password and password repeated have to be the same.  ");
            }
            if (error)
            {
                message = "Errors in user form";
            }

            return !error;

        }


    }
}