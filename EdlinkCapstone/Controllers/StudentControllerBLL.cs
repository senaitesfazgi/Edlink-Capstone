using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.NetworkInformation;
using System.Threading.Tasks;
using EdlinkCapstone.Models;
using EdlinkCapstone.Models.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace EdlinkCapstone.Controllers
{
    public class StudentControllerBLL : Controller
    {
        //TODO: Populate errors when all forms are empty.
        //Currently creating or registering a student
        public int CreateStudent(string firstName, string lastName, string address, string email, string phoneNumber, DateTime dateOfBirth, int schoolID)
        {
            int createdID;
            using (SchoolContext context = new SchoolContext())
            {
                StudentValidationException exception = new StudentValidationException();
                if (string.IsNullOrWhiteSpace(firstName))
                {
                    exception.SubExceptions.Add(new ArgumentNullException("First name was not provided."));
                }
                else
                {
                    if (firstName.Any(x => char.IsDigit(x)))
                    {
                        exception.SubExceptions.Add(new ArgumentException("First name cannot contain numbers."));
                    }
                    if (firstName.Length > 50)
                    {
                        exception.SubExceptions.Add(new ArgumentOutOfRangeException("First name cannot be more than 50 characters long."));
                    }
                }
                if (string.IsNullOrWhiteSpace(lastName))
                {
                    exception.SubExceptions.Add(new ArgumentNullException("Last name was not provided."));
                }
                else
                {
                    if (lastName.Any(x => char.IsDigit(x)))
                    {
                        exception.SubExceptions.Add(new ArgumentException("Last name cannot contain numbers."));
                    }
                    if (lastName.Length > 50)
                    {
                        exception.SubExceptions.Add(new ArgumentOutOfRangeException("Last name cannot be more than 50 characters long."));
                    }
                }
                if (string.IsNullOrWhiteSpace(address))
                {
                    exception.SubExceptions.Add(new ArgumentNullException("Address was not provided."));
                }
                else
                {
                    address = address.Trim();
                }
                if (string.IsNullOrWhiteSpace(email))
                {
                    exception.SubExceptions.Add(new ArgumentNullException("Email was not provided."));
                }
                else if(context.Students.Where(x => x.Email == email).Count() != 1)
                {
                    exception.SubExceptions.Add(new Exception("Email is already used"));
                }
                else
                {
                    email = email.Trim();
                }
                if (string.IsNullOrWhiteSpace(phoneNumber))
                {
                    exception.SubExceptions.Add(new ArgumentNullException("Phone Number was not provided."));
                }
                if (dateOfBirth.Equals(null))
                {
                    exception.SubExceptions.Add(new ArgumentNullException("Date of Birth was not provided."));
                }
                else
                {
                    // Check for phone number formatting (feel free to use RegEx or any other method).
                    // Has to be in the else branch to avoid null reference exceptions.
                    int temp;
                    string[] phoneParts = phoneNumber.Split('-');
                    if (!(
                        phoneParts[0].Length == 3 &&
                        int.TryParse(phoneParts[0], out temp) &&
                        phoneParts[1].Length == 3 &&
                        int.TryParse(phoneParts[1], out temp) &&
                        phoneParts[2].Length == 4 &&
                        int.TryParse(phoneParts[2], out temp)
                        ))
                    {
                        exception.SubExceptions.Add(new ArgumentException("Phone Number number was not in a valid format."));
                    }
                }
                if (exception.SubExceptions.Count > 0)
                {
                    throw exception;
                }
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

                context.Students.Add(myStudent);
                context.SaveChanges();
                createdID = myStudent.ID;
            }
           return createdID;
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

        public List<Student> GetStudentsBySchoolID(int schoolID)
        {
            List<Student> students;
            using (SchoolContext context = new SchoolContext())
            {
                students = context.Students.Where(x => x.SchoolID == schoolID).ToList();
            }
            return students;
        }

        //Not Currently updating a student
        public void UpdateStudent(int id, string firstName, string lastName)
        {
            using (SchoolContext context  = new SchoolContext())
            {
                Student target = context.Students.Where(x => x.ID == 3).Single();
                target.FirstName = "Ashish";
                target.LastName = "Patel";
                context.SaveChanges();
            }
        }
        public void DeleteStudentByID(int id)
        {
            using (SchoolContext context = new SchoolContext())
            {
                context.Students.Remove(context.Students.Where(x => x.ID == id).Single());
                context.SaveChanges();
            }
        }
    }
}
