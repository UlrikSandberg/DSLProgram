using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using BookingSystemV4.Persistence.Repositories;
using BookingSystemV4.Persistence.Models;
using BookingSystemV4.RequestModels;
using Microsoft.AspNetCore.Mvc.Infrastructure;

namespace BookingSystemV4.Handlers
{
    public interface IMovieTicketHandler
    {
        Task<Guid> CreateMovieTicket(MovieTicket model);
        Task<bool> DeleteMovieTicket(Guid id);
        Task<List<MovieTicket>> GetAll(int page, int pageSize);
        Task<MovieTicket> Update(MovieTicket model);
        Task<MovieTicket> Get(Guid id);
    }
    
    public class MovieTicketHandler : IMovieTicketHandler
    {
        private readonly IMovieTicketRepository _MovieTicketRepository;
       IRegularSeatScheduleHandler _RegularSeatScheduleHandler;
       ISeatHandler _SeatHandler;
       ICust1Handler _Cust1Handler;

        public MovieTicketHandler(IMovieTicketRepository MovieTicketRepository
, IRegularSeatScheduleHandler RegularSeatScheduleHandler
, ISeatHandler SeatHandler
, ICust1Handler Cust1Handler
                             )
        {
            _MovieTicketRepository = MovieTicketRepository;
_RegularSeatScheduleHandler = RegularSeatScheduleHandler;
_SeatHandler = SeatHandler;
_Cust1Handler = Cust1Handler;
        }
        
        private IMapper CreateMapperConf<T>()
	        		{
	        			var config = new MapperConfiguration(cfg =>
	        			{
	        				cfg.CreateMap<T, T>();
	        			});
	        			return config.CreateMapper();
	        		}

		public async Task<Guid> CreateMovieTicket(MovieTicket model)
		{
			if(model.seatSchedule.Id.Equals(Guid.NewGuid())){
			      model.seatSchedule.Id = new Guid();
			      await _RegularSeatScheduleHandler.CreateRegularSeatSchedule(model.seatSchedule);
			   }
			if(model.seat.Id.Equals(Guid.NewGuid())){
			      model.seat.Id = new Guid();
			      await _SeatHandler.CreateSeat(model.seat);
			   }
			if(model.cust.Id.Equals(Guid.NewGuid())){
			      model.cust.Id = new Guid();
			      await _Cust1Handler.CreateCust1(model.cust);
			   }
			return await _MovieTicketRepository.Insert(model);
		}
		
		public async Task<bool> DeleteMovieTicket(Guid id)
		{
			return await _MovieTicketRepository.Delete(id);	
		}
		
		public async Task<List<MovieTicket>> GetAll(int page, int pageSize)
		{
			var all = await _MovieTicketRepository.GetPaged(page, pageSize);	
			var map = CreateMapperConf<MovieTicket>();
			var protectiveCopy = all.Select(e => map.Map<MovieTicket, MovieTicket>(e)).ToList();
			var finalResult = new List<MovieTicket>();
			
			foreach (var item in protectiveCopy) item.seatSchedule = await _RegularSeatScheduleHandler.Get(item.seatSchedule.Id);
			foreach (var item in protectiveCopy) item.seat = await _SeatHandler.Get(item.seat.Id);
			foreach (var item in protectiveCopy) item.cust = await _Cust1Handler.Get(item.cust.Id);
			
			if(finalResult.Count == 0) finalResult = protectiveCopy.ToList();
			return finalResult;
		}
		
		public async Task<MovieTicket> Update(MovieTicket model)
		{
			if(model.seatSchedule != null) await _RegularSeatScheduleHandler.Update(model.seatSchedule);
			if(model.seat != null) await _SeatHandler.Update(model.seat);
			if(model.cust != null) await _Cust1Handler.Update(model.cust);
			return await _MovieTicketRepository.Put(model);
		}
		
		public async Task<MovieTicket> Get(Guid id)
		{
			var result = await _MovieTicketRepository.GetById(id);
			var map = CreateMapperConf<MovieTicket>();
			var finalResult = map.Map<MovieTicket, MovieTicket>(result);
			if(finalResult.seatSchedule != null) finalResult.seatSchedule = await _RegularSeatScheduleHandler.Get(finalResult.seatSchedule.Id);
			if(finalResult.seat != null) finalResult.seat = await _SeatHandler.Get(finalResult.seat.Id);
			if(finalResult.cust != null) finalResult.cust = await _Cust1Handler.Get(finalResult.cust.Id);
			return finalResult;	
		}
        
    }
}
