using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Diplomski.Models
{
    public class Post
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public virtual User User { get; set; }

        public int? BloodTypeId { get; set; }
        [ForeignKey("BloodTypeId")]
        public virtual BloodType BloodType { get; set; }

        public int? CityId { get; set; }
        [ForeignKey("CityId")]
        public virtual City City { get; set; }

        public string Description { get; set; }
        public int Status { get; set; }
        
    }
}