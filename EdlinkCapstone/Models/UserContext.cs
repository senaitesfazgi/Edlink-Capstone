using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EdlinkCapstone.Models
{
    //This context is needed because users table is not related to any of the tables to the SchoolContext.
    public partial class UserContext : DbContext
    {
        public UserContext()
        {
        }

        public UserContext(DbContextOptions<UserContext> options)
            : base(options)
        {
        }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseMySql("server=localhost;port=3306;user=root;database=capstone_demo", x => x.ServerVersion("10.4.14-mariadb"));
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.FirstName)
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.LastName)
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.Email)
                        .HasCharSet("utf8mb4")
                        .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.PassWord)
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");
                entity.HasData(
                        new User()
                        {
                            ID = -1,
                            FirstName = "Andy",
                            LastName = "Cole",
                            Email = "andy@gmail.com",
                            PassWord = "andy123"
                        },
                       new User()
                       {
                           ID = -2,
                           FirstName = "Jason",
                           LastName = "Kenny",
                           Email = "jason@gmail.com",
                           PassWord = "jason123"
                       },
                        new User()
                        {
                            ID = -3,
                            FirstName = "Elizabeth",
                            LastName = "Notley",
                            Email = "elizabeth@gmail.com",
                            PassWord = "elizabeth123"
                        },
                        new User()
                        {
                            ID = -4,
                            FirstName = "Asu",
                            LastName = "Ben",
                            Email = "asu@gmail.com",
                            PassWord = "asu123"
                        }
                    );
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
