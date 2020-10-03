using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EdlinkCapstone.Models.Exceptions
{
    public class StudentValidationException : Exception
    {

        // A list of exceptions to be thrown as one.
        public List<Exception> SubExceptions { get; set; } = new List<Exception>();

        // Override our message with a summary.
        public override string Message => $"There are {SubExceptions.Count} exceptions.";

        // When we construct this exception without a messsage, we get an empty sub-list which we can populate.
        public StudentValidationException() : base()
        { }

        public StudentValidationException(string message) : base()
        {
            // When we construct this exception with a message, it gets added to the subexceptions list.
            SubExceptions.Add(new Exception(message));
        }

    }
}
