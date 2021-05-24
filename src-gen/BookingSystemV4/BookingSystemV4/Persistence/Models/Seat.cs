using System;
using System.Collections.Generic;

namespace BookingSystemV4.Persistence.Models
{
	public class Seat : IEntity
	{
		public Guid Id {get; set;}
        public string name {get; set;}
        public int code {get; set;}
        public List<RegularSeatSchedule> schedules {get; set;} 
    }
}
