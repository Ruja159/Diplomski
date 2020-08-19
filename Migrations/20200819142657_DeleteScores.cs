using Microsoft.EntityFrameworkCore.Migrations;

namespace Diplomski.Migrations
{
    public partial class DeleteScores : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Users_Score_ScoreId",
                table: "Users");

            migrationBuilder.DropTable(
                name: "Score");

            migrationBuilder.DropIndex(
                name: "IX_Users_ScoreId",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ScoreId",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "Socre",
                table: "Users",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Socre",
                table: "Users");

            migrationBuilder.AddColumn<int>(
                name: "ScoreId",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "Score",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    Value = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Score", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Score_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Users_ScoreId",
                table: "Users",
                column: "ScoreId");

            migrationBuilder.CreateIndex(
                name: "IX_Score_UserId",
                table: "Score",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Users_Score_ScoreId",
                table: "Users",
                column: "ScoreId",
                principalTable: "Score",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
