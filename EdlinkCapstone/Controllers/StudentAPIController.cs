using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EdlinkCapstone.Models;
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
            Student myStudent;
           /* try
            {*/
                // We aren't concerned with validation here. Only in BLL.
                myStudent = new StudentControllerBLL().CreateStudent(firstName, lastName, address, email, phoneNumber, dateOfBirth, schoolID);
                // Encode our created object as JSON and bounce it back with the request.
                response = Ok(myStudent);
           /* }
           /* catch (Exception e)
            {
                response = UnprocessableEntity(new { error = e.Message });
            }
           */
            // Return the response.
            return response;
        }
    }
}
