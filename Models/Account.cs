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
        public string Login { get; set; }
        [Required]
        [JsonIgnore]
        public string Password { get; set; }

        public int ProfileId { get; set; }
        public Profile Profile { get; set; }
    }
}
