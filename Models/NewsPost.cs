using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dacha.Models
{
    public class NewsPost
    {
        [Required]
        public string Title { get; set; }
        [Required]
        public string Body { get; set; }
    }
}
