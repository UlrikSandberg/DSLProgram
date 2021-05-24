using BookingSystemV4.Persistence.Models;
using System.Collections.Generic;
using System;

namespace BookingSystemV4.RequestModels
{
	public class UpdateSeatRequestModel
	{
	public Guid Id {get; set;}
        public string name {get; set;}
        public int code {get; set;}
        public List<RegularSeatSchedule> schedules {get; set;} 
    }
}
