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
    public class UserAPIController : ControllerBase
    {
        [HttpPost("authuser")]
        //This method will allow user to login
        public ActionResult<User> LogIn(string email, string passWord)
        {
            User authUser;
            ActionResult<User> response;

            // We aren't concerned with validation here. Only in BLL.
            try
            {
                authUser = new UserControllerBLL().LogIn(email, passWord);
                response = Ok(new { message = "User successfully logged in" });

            }
            catch (UserValidationException e)
            {
                response = UnprocessableEntity(new { errors = e.SubExceptions.Select(x => x.Message) });
            }

            return response;
        }

        [HttpPost("registeruser")]
        //This method will allow users to register 
        public ActionResult<User> RegisterUser(string firstName, string lastName, string email, string passWord)
        {
            ActionResult<User> response;
            int createdID;
            try
            {
                // We aren't concerned with validation here. Only in BLL.
                createdID = new UserControllerBLL().RegisterUser(firstName, lastName, email, passWord);
                // Encode our created object as JSON and bounce it back with the request.
                response = Created($"API/StudentAPI/Student/ID/{createdID}", new { message = $"Successfully created User {firstName} {lastName} at ID {createdID}." });
            }
            catch (UserValidationException e)
            {
                response = UnprocessableEntity(new { errors = e.SubExceptions.Select(x => x.Message) });
            }

            // Return the response.
            return response;
        }
    }
}
