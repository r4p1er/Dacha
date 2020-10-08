using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Dacha.Models
{
    public class Advert
    {
        public int Id { get; set; }
        [Required]
        [MaxLength(50)]
        public string Title { get; set; }
        [Required]
        [MaxLength(1500)]
        public string Body { get; set; }
        [Required]
        [MaxLength(100)]
        public string Contact { get; set; }
        [Required]
        public DateTime ExpDate { get; set; }

        public int AccountId { get; set; }
        [JsonIgnore]
        public Account Account { get; set; }
    }
}
