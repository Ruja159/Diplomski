namespace Diplomski.Forms
{
    public class PostForm
    {
        public int? Id { get; set; }
        public int UserId { get; set; }

        public string BloodTypeId { get; set; }

        public string CityId { get; set; }
        public string WhoNeedBlood { get; set; }

        public string Description { get; set; }
        public int Status { get; set; }

    }
}