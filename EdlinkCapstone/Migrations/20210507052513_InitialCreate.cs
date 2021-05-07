using Microsoft.EntityFrameworkCore.Migrations;

namespace EdlinkCapstone.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "user",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    FirstName = table.Column<string>(type: "varchar(50)", nullable: false),
                    LastName = table.Column<string>(type: "varchar(50)", nullable: false),
                    Email = table.Column<string>(type: "varchar(50)", nullable: true),
                    PassWord = table.Column<string>(type: "varchar(50)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_user", x => x.ID);
                });

            migrationBuilder.InsertData(
                table: "user",
                columns: new[] { "ID", "Email", "FirstName", "LastName", "PassWord" },
                values: new object[,]
                {
                    { -1, "andy@gmail.com", "Andy", "Cole", "andy123" },
                    { -2, "jason@gmail.com", "Jason", "Kenny", "jason123" },
                    { -3, "elizabeth@gmail.com", "Elizabeth", "Notley", "elizabeth123" },
                    { -4, "asu@gmail.com", "Asu", "Ben", "asu123" }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "user");
        }
    }
}
