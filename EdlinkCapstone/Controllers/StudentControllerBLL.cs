using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EdlinkCapstone.Models;
using Microsoft.AspNetCore.Mvc;

namespace EdlinkCapstone.Controllers
{
    public class StudentControllerBLL : Controller
    {
        public Student CreateStudent(string firstName, string lastName, string address, string email, string phoneNumber, DateTime dateOfBirth, int schoolID)
        {
            Student myStudent = new Student()
            {
                FirstName = firstName,
                LastName = lastName,
                Address = address,
                Email = email,
                PhoneNumber = phoneNumber,
                DateOfBirth = dateOfBirth,
                SchoolID = schoolID
            };

            using (SchoolContext context = new SchoolContext())
            {
                context.Students.Add(myStudent);
                context.SaveChanges();
            }
           return myStudent;
        }

        public List<Student> GetStudents()
        {
            List<Student> students;
            using (SchoolContext context = new SchoolContext())
            {
                students = context.Students.ToList();
            }
            return students;
        }
    }
}
