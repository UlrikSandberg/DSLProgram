using System;
using System.Collections.Generic;

namespace BookingSystemV4.Persistence.Models
{
	public class Cust1 : IEntity
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
