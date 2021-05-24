using BookingSystemV4.Persistence.Models;
using System.Collections.Generic;
namespace BookingSystemV4.RequestModels
{
	public class CreateSeatRequestModel
	{
        public string name {get; set;}
        public int code {get; set;}
        public List<RegularSeatSchedule> schedules {get; set;} 
    }
}
