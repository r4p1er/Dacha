using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Dacha.Models
{
    public class Document
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
