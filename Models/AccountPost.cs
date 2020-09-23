﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dacha.Models
{
    public class AccountPost
    {
        [Required]
        public string Login { get; set; }
        [Required]
        public string Password { get; set; }
        public int ProfileId { get; set; }
    }
}
