using BookingSystemV4.Persistence.Models;
using System.Collections.Generic;
using System;
		
namespace BookingSystemV4.RequestModels
{
    public class UpdateRegularSeatScheduleRequestModel
    {
    	public Guid Id {get; set;}
        public string name {get; set;}
        public int startTimeEpoch {get; set;}
        public int endTimeEpoch {get; set;}
        public string Description {get; set;}
    }
}
