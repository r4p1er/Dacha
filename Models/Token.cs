using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dacha.Models
{
    public class Token
    {
        [Required]
        [MaxLength(10)]
        public string Login { get; set; }
        [Required]
        [MaxLength(16)]
        public string Password { get; set; }
    }
}
