using BookingSystemV4.Persistence.Models;
using System.Collections.Generic;
namespace BookingSystemV4.RequestModels
{
    public class CreateRegularSeatScheduleRequestModel
    {
        public string name {get; set;}
        public int startTimeEpoch {get; set;}
        public int endTimeEpoch {get; set;}
        public string Description {get; set;}
    }
}
