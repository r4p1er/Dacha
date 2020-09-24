using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dacha.Models
{
    public class AccountPut
    {
        [Required]
        public string Login { get; set; }
        public string NewPassword { get; set; }
        public int ProfileId { get; set; }
    }
}
