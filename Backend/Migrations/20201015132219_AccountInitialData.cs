using Microsoft.EntityFrameworkCore.Migrations;

namespace Dacha.Migrations
{
    public partial class AccountInitialData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "LastName", "MiddleName", "Name", "Password", "Place" },
                values: new object[] { "admin", "admin", "admin", "semiconductor", 0 });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.UpdateData(
                table: "Accounts",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "LastName", "MiddleName", "Name", "Password", "Place" },
                values: new object[] { "Neef4", "M1xa4kala", "Rapier", "admin", 228 });
        }
    }
}
