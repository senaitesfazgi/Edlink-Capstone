using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace EdlinkCapstone.Models
{
    //This display the School table
    [Table("school")]
    public partial class School
    {
        public School()
        {
            Students = new HashSet<Student>();
        }

        [Key]
        [Column("ID", TypeName = "int")]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ID { get; set; }
        [Required]

        [Column(TypeName = "char(12)")]
        public string SchoolName { get; set; }

        [Column(TypeName = "char(12)")]
        public string SchoolAddress { get; set; }

        // InverseProperty links the two virtual properties together.
        [InverseProperty(nameof(Models.Student.School))]
        public virtual ICollection<Student> Students { get; set; }

    }
}
