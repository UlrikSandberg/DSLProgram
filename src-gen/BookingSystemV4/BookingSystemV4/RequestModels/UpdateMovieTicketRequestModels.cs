using BookingSystemV4.Persistence.Models;
using System.Collections.Generic;
using System;
		
namespace BookingSystemV4.RequestModels
{
    public class UpdateMovieTicketRequestModel
    {
    	public Guid Id {get; set;}
        public RegularSeatSchedule seatSchedule {get; set;} 
        public Seat seat {get; set;} 
        public Cust1 cust {get; set;} 
    }
}
