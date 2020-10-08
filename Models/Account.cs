using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Dacha.Models
{
    public class Account
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(10)]
        public string Login { get; set; }
        [Required]
        [JsonIgnore]
        [MaxLength(16)]
        public string Password { get; set; }
        [Required]
        [MaxLength(30)]
        public string Name { get; set; }
        [Required]
        [MaxLength(30)]
        public string MiddleName { get; set; }
        [Required]
        [MaxLength(30)]
        public string LastName { get; set; }
        public int Place { get; set; }

        public int RoleId { get; set; }
        [JsonIgnore]
        public Role Role { get; set; }
    }
}
