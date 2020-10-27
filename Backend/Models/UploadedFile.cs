using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dacha.Models
{
    public class UploadedFile
    {
        [Required]
        public string FileName { get; set; }
        [Required]
        public IFormFile FormFile { get; set; }
    }
}
