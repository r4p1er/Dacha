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

        public int ProfileId { get; set; }
        [JsonIgnore]
        public Profile Profile { get; set; }
    }
}
