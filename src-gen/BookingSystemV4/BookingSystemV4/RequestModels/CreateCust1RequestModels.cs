using BookingSystemV4.Persistence.Models;
using System.Collections.Generic;
namespace BookingSystemV4.RequestModels
{
    public class CreateCust1RequestModel
			{
		public string name {get; set;}
		public bool isVip {get; set;}
		public List<string> somearray {get; set;}
		public int minAge {get; set;}
		public int age {get; set;}
		public int maxAge {get; set;}
    }
}
