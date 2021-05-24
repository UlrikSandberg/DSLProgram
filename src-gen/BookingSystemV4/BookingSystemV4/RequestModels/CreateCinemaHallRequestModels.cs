using BookingSystemV4.Persistence.Models;
using System.Collections.Generic;
namespace BookingSystemV4.RequestModels
{
    public class CreateCinemaHallRequestModel
    {
        public string name {get; set;}
        public int code {get; set;}
        public List<Seat> seats {get; set;} 
    }
}
