using System;
using System.Collections.Generic;

namespace BookingSystemV4.Persistence.Models
{
    public class RegularSeatSchedule : IEntity
    {
    	public Guid Id {get; set;}
        public string name {get; set;}
        public int startTimeEpoch {get; set;}
        public int endTimeEpoch {get; set;}
        public string Description {get; set;}
    }
}
