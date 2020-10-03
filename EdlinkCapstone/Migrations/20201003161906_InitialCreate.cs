using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

namespace EdlinkCapstone.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "school",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int(10)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    SchoolName = table.Column<string>(type: "char(12)", nullable: false),
                    SchoolAddress = table.Column<string>(type: "char(12)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_school", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "student",
                columns: table => new
                {
                    ID = table.Column<int>(type: "int(10)", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FirstName = table.Column<string>(type: "varchar(50)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                        .Annotation("MySql:Collation", "utf8mb4_general_ci"),
                    LastName = table.Column<string>(type: "varchar(50)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                        .Annotation("MySql:Collation", "utf8mb4_general_ci"),
                    Address = table.Column<string>(type: "varchar(50)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                        .Annotation("MySql:Collation", "utf8mb4_general_ci"),
                    Email = table.Column<string>(type: "varchar(50)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                        .Annotation("MySql:Collation", "utf8mb4_general_ci"),
                    PhoneNumber = table.Column<string>(type: "varchar(50)", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                        .Annotation("MySql:Collation", "utf8mb4_general_ci"),
                    DateOfBirth = table.Column<DateTime>(type: "date", nullable: false),
                    SchoolID = table.Column<int>(type: "int(10)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_student", x => x.ID);
                    table.ForeignKey(
                        name: "FK_Student_School",
                        column: x => x.SchoolID,
                        principalTable: "school",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "school",
                columns: new[] { "ID", "SchoolAddress", "SchoolName" },
                values: new object[,]
                {
                    { -1, "11235 123st", "Ivor Dent" },
                    { -2, "11326 143st", "Belmont School" },
                    { -3, "112368 123st", "Abbotsfield School " },
                    { -4, "16587 12st", "George P. Nicholson School" },
                    { -5, "16587 12st", "George P. Nicholson School" }
                });

            migrationBuilder.InsertData(
                table: "student",
                columns: new[] { "ID", "Address", "DateOfBirth", "Email", "FirstName", "LastName", "PhoneNumber", "SchoolID" },
                values: new object[,]
                {
                    { -1, "11235 167st", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified).AddTicks(1996), "student1@email.com", "Frank", "Terry", "+17804561232", -1 },
                    { -2, "12236 165st", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified).AddTicks(1997), "student2@email.com", "David", "Lynn", "+17805684139", -2 },
                    { -3, "45768 321st", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified).AddTicks(1995), "student3@email.com", "Tomas", "Bunny", "+17806547236", -3 },
                    { -4, "11123 156st", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified).AddTicks(1997), "student4@email.com", "Kale", "Kate", "+17808974562", -4 },
                    { -5, "45678 326st", new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified).AddTicks(1997), "student5@email.com", "Belly", "Kelly", "+17801236544", -5 }
                });

            migrationBuilder.CreateIndex(
                name: "FK_Student_School",
                table: "student",
                column: "SchoolID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "student");

            migrationBuilder.DropTable(
                name: "school");
        }
    }
}
