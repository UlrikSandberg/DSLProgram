using System;
using System.Collections.Generic;

namespace BookingSystemV4.Persistence.Models
{
	public class VIP : Cust1, IEntity
	{
        public string VIPMember {get; set;}
    }
}
