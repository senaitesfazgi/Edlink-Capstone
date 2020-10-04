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

        [HttpPut("Update")]
        public ActionResult UpdateStudent_PUT(string id, string firstName, string lastName, string address, string email, string phoneNumber, DateTime dateOfBirth, int schoolID)
        {
            ActionResult response;
            try
            {
                new StudentControllerBLL().UpdateStudent(id, firstName, lastName, address, email, phoneNumber, dateOfBirth, schoolID);

                // Semantically, we should be including a copy of the object (or at least a DTO rendering of it) in the Ok response.
                // For our purposes, a message with the fields will suffice.
                response = Ok(new { message = $"Successfully updated Student at ID {id} to be {firstName} {lastName}." });
            }
            catch (StudentValidationException e)
            {
                // If it couldn't find the entity to update, that's the primary concern, so discard the other subexceptions and just return NotFound().
                if (e.SubExceptions.Any(x => x.GetType() == typeof(NullReferenceException)))
                {
                    response = NotFound(new { error = $"No entity exists at ID {id}." });
                }
                // If there's no NullReferenceException, but there's still an exception, return the list of problems.
                else
                {
                    response = UnprocessableEntity(new { errors = e.SubExceptions.Select(x => x.Message) });
                }
            }
            return response;
        }
    }
}
