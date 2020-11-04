using Microsoft.EntityFrameworkCore.Migrations;

namespace Diplomski.Migrations
{
    public partial class AddedWhoNeedBlood : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "WhoNeedBlood",
                table: "Posts",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "WhoNeedBlood",
                table: "Posts");
        }
    }
}
