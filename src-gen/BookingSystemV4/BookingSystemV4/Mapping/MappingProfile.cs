using AutoMapper;
using BookingSystemV4.Persistence.Models;
using BookingSystemV4.RequestModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using BookingSystemV4.RequestModels;
using BookingSystemV4.Persistence.Models;

namespace BookingSystemV4.Mapping
{
    public class MappingProfile : Profile{
    	public MappingProfile()
    	{
    	CreateMap<CreateCust1RequestModel, Cust1>().ReverseMap();
    	CreateMap<UpdateCust1RequestModel, Cust1>().ReverseMap();
    	CreateMap<CreateVIPRequestModel, VIP>().ReverseMap();
    	CreateMap<UpdateVIPRequestModel, VIP>().ReverseMap();
    	CreateMap<CreateCinemaHallRequestModel, CinemaHall>().ReverseMap();
    	CreateMap<UpdateCinemaHallRequestModel, CinemaHall>().ReverseMap();
    	CreateMap<CreateRegularSeatScheduleRequestModel, RegularSeatSchedule>().ReverseMap();
    	CreateMap<UpdateRegularSeatScheduleRequestModel, RegularSeatSchedule>().ReverseMap();
    	CreateMap<CreateSeatRequestModel, Seat>().ReverseMap();
    	CreateMap<UpdateSeatRequestModel, Seat>().ReverseMap();
    	CreateMap<CreateMovieTicketRequestModel, MovieTicket>().ReverseMap();
    	CreateMap<UpdateMovieTicketRequestModel, MovieTicket>().ReverseMap();
    	}	
    }
}
