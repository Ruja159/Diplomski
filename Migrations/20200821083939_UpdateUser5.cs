using Microsoft.EntityFrameworkCore.Migrations;

namespace Diplomski.Migrations
{
    public partial class UpdateUser5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Mail",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "Email",
                table: "Users",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Email",
                table: "Users");

            migrationBuilder.AddColumn<string>(
                name: "Mail",
                table: "Users",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
