using BookingSystemV4.Persistence.Models;
using System.Collections.Generic;
namespace BookingSystemV4.RequestModels
{
	public class CreateVIPRequestModel : CreateCust1RequestModel
	{
		public string VIPMember {get; set;}
    }
}
