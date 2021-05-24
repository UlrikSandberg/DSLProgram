using BookingSystemV4.Persistence.Models;
using System.Collections.Generic;
using System;
		
namespace BookingSystemV4.RequestModels
{
	public class UpdateVIPRequestModel : UpdateCust1RequestModel
	{
		public string VIPMember {get; set;}
    }
}
