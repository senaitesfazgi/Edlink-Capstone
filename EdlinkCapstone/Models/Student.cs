using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EdlinkCapstone.Models
{
    [Table("student")]
    public partial class Student
    {
        // This initializes an empty list so we don't get null reference exceptions for our list.

        [Key]
        [Column("ID", TypeName = "int(10)")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [Required]

        [Column(TypeName = "varchar(50)")]
        public string FirstName { get; set; }
        [Required]
        [Column(TypeName = "varchar(50)")]
        public string LastName { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Address { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Email { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string PhoneNumber { get; set; }

        [Column(TypeName = "date")]
        public DateTime DateOfBirth { get; set; }

        [Column("SchoolID", TypeName = "int(10)")]
        public int SchoolID { get; set; }
        [Required]

        // This attribute specifies which database field is the foreign key. Typically in the child (many side of the 1-many).
        [ForeignKey(nameof(SchoolID))]

        // InverseProperty links the two virtual properties together.
        [InverseProperty(nameof(Models.School.Students))]
        public virtual School School { get; set; }


    }
}
