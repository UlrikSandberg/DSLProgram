using System;
using System.Collections.Generic;

namespace BookingSystemV4.Persistence.Models
{
    public class MovieTicket : IEntity
    {
    	public Guid Id {get; set;}
        public RegularSeatSchedule seatSchedule {get; set;} 
        public Seat seat {get; set;} 
        public Cust1 cust {get; set;} 
    }
}
