using System;
using System.Collections.Generic;

namespace BookingSystemV4.Persistence.Models
{
    public class CinemaHall : IEntity
    {
    	public Guid Id {get; set;}
        public string name {get; set;}
        public int code {get; set;}
        public List<Seat> seats {get; set;} 
    }
}
