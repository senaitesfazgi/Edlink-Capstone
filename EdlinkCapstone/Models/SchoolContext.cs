using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EdlinkCapstone.Models
{
    //This context contains both School and Student Tables
    public partial class SchoolContext : DbContext
    {
        public SchoolContext()
        {
        }

        public SchoolContext(DbContextOptions<SchoolContext> options)
            : base(options)
        {
        }

        public virtual DbSet<School> Schools { get; set; }
        public virtual DbSet<Student> Students { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("server=(localdb)\\mssqllocaldb;Database=EDLinkDB;Trusted_Connection=True;MultipleActiveResultSets=true");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<School>(entity =>
            {
                entity.HasData(
                        new School()
                        {
                            ID = -1,
                            SchoolName = "Ivor Dent",
                            SchoolAddress = "11235 123st",
                        },
                        new School()
                        {
                            ID = -2,
                            SchoolName = "Belmont School",
                            SchoolAddress = "11326 143st",
                        },
                        new School()
                        {
                            ID = -3,
                            SchoolName = "Abbotsfield School ",
                            SchoolAddress = "112368 123st",
                        },

                        new School()
                        {
                            ID = -4,
                            SchoolName = "George P. Nicholson School",
                            SchoolAddress = "16587 12st",
                        },
                        new School()
                        {
                            ID = -5,
                            SchoolName = "George P. Nicholson School",
                            SchoolAddress = "16587 12st",
                        }
                    );
            });

            modelBuilder.Entity<Student>(entity =>
            {
                entity.HasIndex(e => e.SchoolID)
                    .HasName("FK_" + nameof(Student) + "_" + nameof(School));

                entity.Property(e => e.FirstName)
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.LastName)
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.Address)
                     .HasCharSet("utf8mb4")
                     .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.Email)
                        .HasCharSet("utf8mb4")
                        .HasCollation("utf8mb4_general_ci");

                entity.Property(e => e.PhoneNumber)
                    .HasCharSet("utf8mb4")
                    .HasCollation("utf8mb4_general_ci");

                // Always in the one with the foreign key.
                entity.HasOne(child => child.School)
                    .WithMany(parent => parent.Students)
                    .HasForeignKey(child => child.SchoolID)
                    // When we delete a record, we can modify the behaviour of the case where there are child records.
                    // Restrict: Throw an exception if we try to orphan a child record.
                    // Cascade: Remove any child records that would be orphaned by a removed parent.
                    // SetNull: Set the foreign key field to null on any orphaned child records.
                    // NoAction: Don't commit any deletions of parents which would orphan a child.
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_" + nameof(Student) + "_" + nameof(School));

                entity.HasData(
                    new Student()
                    {
                        ID = -1,
                        FirstName = "Frank",
                        LastName = "Terry",
                        Address = "11235 167st",
                        Email = "student1@email.com",
                        PhoneNumber = "+17804561232",
                        DateOfBirth = new DateTime(2003 - 03 - 04),
                        SchoolID = -1

                    },
                    new Student()
                    {
                        ID = -2,
                        FirstName = "David",
                        LastName = "Lynn",
                        Address = "12236 165st",
                        Email = "student2@email.com",
                        PhoneNumber = "+17805684139",
                        DateOfBirth = new DateTime(2012 - 02 - 13),
                        SchoolID = -2

                    },
                    new Student()
                    {
                        ID = -3,
                        FirstName = "Tomas",
                        LastName = "Bunny",
                        Address = "45768 321st",
                        Email = "student3@email.com",
                        PhoneNumber = "+17806547236",
                        DateOfBirth = new DateTime(2011 - 6 - 10),
                        SchoolID = -3

                    },
                    new Student()
                    {
                        ID = -4,
                        FirstName = "Kale",
                        LastName = "Kate",
                        Address = "11123 156st",
                        Email = "student4@email.com",
                        PhoneNumber = "+17808974562",
                        DateOfBirth = new DateTime(2012 - 02 - 13),
                        SchoolID = -4

                    },
                    new Student()
                    {
                        ID = -5,
                        FirstName = "Belly",
                        LastName = "Kelly",
                        Address = "45678 326st",
                        Email = "student5@email.com",
                        PhoneNumber = "+17801236544",
                        DateOfBirth = new DateTime(2012 - 02 - 13),
                        SchoolID = -5

                    }
                );
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
