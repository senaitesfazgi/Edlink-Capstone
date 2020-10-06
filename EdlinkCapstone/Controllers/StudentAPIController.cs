using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EdlinkCapstone.Models;
using EdlinkCapstone.Models.Exceptions;
using Microsoft.AspNetCore.Mvc;

namespace EdlinkCapstone.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentAPIController : ControllerBase
    {
        [HttpPost("AddStudent")]
        public ActionResult<Student> AddStudent(string firstName, string lastName, string address, string email, string phoneNumber, DateTime dateOfBirth, int schoolID)
        {
            ActionResult<Student> response;
            int createdID;
            try
            {
                // We aren't concerned with validation here. Only in BLL.
                createdID = new StudentControllerBLL().CreateStudent(firstName, lastName, address, email, phoneNumber, dateOfBirth, schoolID);
                // Encode our created object as JSON and bounce it back with the request.
                response = Created($"API/StudentAPI/Student/ID/{createdID}", new { message = $"Successfully created student {firstName} {lastName} with the phone number {phoneNumber} at ID {createdID}." });
            }
            catch (StudentValidationException e)
            {
                response = UnprocessableEntity(new { errors = e.SubExceptions.Select(x => x.Message) });
            }
            // Return the response.
            return response;
        }

        [HttpGet("ShowStudents")]
        public ActionResult<List<Student>> ShowStudents()
        {
            // TODO: Catch for unable to connect to database.
            // Return the response.
            return new StudentControllerBLL().GetStudents();
        }

        [HttpGet("ShowStudentsBySchoolID")]
        public ActionResult<List<Student>> ShowStudentsBySchoolID(string schoolID)
        {
            // TODO: Catch for unable to connect to database.
            // Return the response.
            return new StudentControllerBLL().GetStudentsBySchoolID(int.Parse(schoolID));
        }

        [HttpPut("Update")]
        public ActionResult UpdateStudent_PUT(string id, string firstName, string lastName)
        {
            ActionResult response;
            new StudentControllerBLL().UpdateStudent(Int32.Parse(id), firstName, lastName);
            response = response = Ok(new { message = $"Successfully updated person at ID {id} to be {firstName} {lastName}." });
            return response;
        }
        [HttpDelete("Delete")]
        public ActionResult DeleteStudent_DELETE(string id)
        {
            ActionResult response;

            //This logic should probably be in the DeletePersonByID() method, but if I change the parameter type to string now, I'll have to fix compiler errors in the Views.
            int idParsed;
            if (string.IsNullOrWhiteSpace(id))
            {
                response = Conflict(new { error = "ID was not provided." });
            }
            else
            {
                if (!int.TryParse(id, out idParsed))
                {
                    response = Conflict(new { error = "The provided ID is invalid." });
                }
                else
                {
                    try
                    {
                
                        new StudentControllerBLL().DeleteStudentByID(int.Parse(id));
                        response = Ok(new { message = $"Successfully deleted the student with ID {id}." });
                    }
                    catch
                    {
                        response = NotFound(new { error = $"No Student at ID {id} could be found." });
                    }
                }
            }
            return response;

        }

    }
}
