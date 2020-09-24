﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Dacha.Models
{
    public class Profile
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string MiddleName { get; set; }
        [Required]
        public string LastName { get; set; }
        public int Place { get; set; }

        public int RoleId { get; set; }
        [JsonIgnore]
        public Role Role { get; set; }
    }
}