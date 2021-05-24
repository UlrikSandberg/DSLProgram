using BookingSystemV4.Persistence.Models;
using System.Collections.Generic;
namespace BookingSystemV4.RequestModels
{
    public class CreateMovieTicketRequestModel
    {
        public RegularSeatSchedule seatSchedule {get; set;} 
        public Seat seat {get; set;} 
        public Cust1 cust {get; set;} 
    }
}
