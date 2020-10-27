using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dacha.Models
{
    public class News
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Title { get; set; }
        [Required]
        [MaxLength(1500)]
        public string Body { get; set; }
        [Required]
        public DateTime Date { get; set; }
    }
}
