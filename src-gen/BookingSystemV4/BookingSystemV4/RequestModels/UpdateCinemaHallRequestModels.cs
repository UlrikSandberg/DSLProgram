using BookingSystemV4.Persistence.Models;
using System.Collections.Generic;
using System;
		
namespace BookingSystemV4.RequestModels
{
    public class UpdateCinemaHallRequestModel
    {
    	public Guid Id {get; set;}
        public string name {get; set;}
        public int code {get; set;}
        public List<Seat> seats {get; set;} 
    }
}
