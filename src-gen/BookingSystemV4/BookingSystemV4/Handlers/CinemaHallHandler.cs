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
    public interface ICinemaHallHandler
    {
        Task<Guid> CreateCinemaHall(CinemaHall model);
        Task<bool> DeleteCinemaHall(Guid id);
        Task<List<CinemaHall>> GetAll(int page, int pageSize);
        Task<CinemaHall> Update(CinemaHall model);
        Task<CinemaHall> Get(Guid id);
    }
    
    public class CinemaHallHandler : ICinemaHallHandler
    {
        private readonly ICinemaHallRepository _CinemaHallRepository;
       ISeatHandler _SeatHandler;

        public CinemaHallHandler(ICinemaHallRepository CinemaHallRepository
, ISeatHandler SeatHandler
                             )
        {
            _CinemaHallRepository = CinemaHallRepository;
_SeatHandler = SeatHandler;
        }
        
        private IMapper CreateMapperConf<T>()
	        		{
	        			var config = new MapperConfiguration(cfg =>
	        			{
	        				cfg.CreateMap<T, T>();
	        			});
	        			return config.CreateMapper();
	        		}

		public async Task<Guid> CreateCinemaHall(CinemaHall model)
		{
			foreach(var sub in model.seats)
			{
				if (sub.Id.Equals(Guid.NewGuid())){
					sub.Id = new Guid();
					await _SeatHandler.CreateSeat(sub);
				}
			}
			return await _CinemaHallRepository.Insert(model);
		}
		
		public async Task<bool> DeleteCinemaHall(Guid id)
		{
			return await _CinemaHallRepository.Delete(id);	
		}
		
		public async Task<List<CinemaHall>> GetAll(int page, int pageSize)
		{
			var all = await _CinemaHallRepository.GetPaged(page, pageSize);	
			var map = CreateMapperConf<CinemaHall>();
			var protectiveCopy = all.Select(e => map.Map<CinemaHall, CinemaHall>(e)).ToList();
			var finalResult = new List<CinemaHall>();
			
			foreach(var item in protectiveCopy) item.seats = new List<Seat>();
			foreach(var item in all)
			{
				var protectedSingle = protectiveCopy.ToList().Find(x => x.Id.Equals(item.Id));
				foreach(var single in item.seats)
				{
					var res = await _SeatHandler.Get(single.Id);
					if (res != null) protectedSingle.seats.Add(res);
				}
				finalResult.Add(protectedSingle);
			}
			
			if(finalResult.Count == 0) finalResult = protectiveCopy.ToList();
			return finalResult;
		}
		
		public async Task<CinemaHall> Update(CinemaHall model)
		{
			foreach(var single in model.seats) if(single != null) await _SeatHandler.Update(single);
			return await _CinemaHallRepository.Put(model);
		}
		
		public async Task<CinemaHall> Get(Guid id)
		{
			var result = await _CinemaHallRepository.GetById(id);
			var map = CreateMapperConf<CinemaHall>();
			var finalResult = map.Map<CinemaHall, CinemaHall>(result);
			if(result.seats != null)
			{
				var list = new List<Seat>();
				foreach(var item in result.seats)
				{
					var res = await _SeatHandler.Get(item.Id);
					if (res != null) list.Add(res);
				}
				finalResult.seats = list;
			}
			return finalResult;	
		}
        
    }
}
