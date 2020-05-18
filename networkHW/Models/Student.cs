using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace networkHW.Models
{
    public class Student
    {

        public long Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public int No { get; set; }
        public ICollection <Course> Courses { get; set; }
    }
}
