using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace networkHW.Models
{
    public class OBSContext : DbContext
    {
        public OBSContext(DbContextOptions<OBSContext> options)
            : base(options)
        {
        }

        public DbSet<Course> Courses { get; set; }
    }
}
