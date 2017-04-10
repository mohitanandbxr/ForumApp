using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ForumApp.Entities
{
    public class Forum
    {
        [Key]
        public int ForumId { get; set; }

        public string CreatedBy { get; set; }

        public string Title { get; set; }

        public string Contents { get; set; }

        public bool IsActive { get; set; }

        public int CategoryId { get; set; }
    }
}
