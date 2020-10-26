using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Dacha.Models
{
    public class AdvertDTO
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
        public int AccountId { get; set; }
        public int Place { get; set; }
        public DateTime ExpDate { get; set; }

        public AdvertDTO(Advert advert)
        {
            Id = advert.Id;
            Title = advert.Title;
            Body = advert.Body;
            Contact = advert.Contact;
            AccountId = advert.AccountId;
            Place = advert.Account.Place;
            ExpDate = advert.ExpDate;
        }
    }
}
