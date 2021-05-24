using BookingSystemV4.Persistence.Models;
using System.Collections.Generic;
using System;
		
namespace BookingSystemV4.RequestModels
{
    public class UpdateCust1RequestModel
    {
    public Guid Id {get; set;}
		public string name {get; set;}
		public bool isVip {get; set;}
		public List<string> somearray {get; set;}
		public int minAge {get; set;}
		public int age {get; set;}
		public int maxAge {get; set;}
    }
}
