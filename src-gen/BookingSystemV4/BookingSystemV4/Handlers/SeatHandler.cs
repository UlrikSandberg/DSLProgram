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
    public interface ISeatHandler
    {
        Task<Guid> CreateSeat(Seat model);
        Task<bool> DeleteSeat(Guid id);
        Task<List<Seat>> GetAll(int page, int pageSize);
        Task<Seat> Update(Seat model);
        Task<Seat> Get(Guid id);
        Task<List<Seat>> AddRegularSeatScheduleToAllResources(List<RegularSeatSchedule> collection);
    }
    
    public class SeatHandler : ISeatHandler
    {
        private readonly ISeatRepository _SeatRepository;
       IRegularSeatScheduleHandler _RegularSeatScheduleHandler;

        public SeatHandler(ISeatRepository SeatRepository
, IRegularSeatScheduleHandler RegularSeatScheduleHandler
                             )
        {
            _SeatRepository = SeatRepository;
_RegularSeatScheduleHandler = RegularSeatScheduleHandler;
        }
        
        private IMapper CreateMapperConf<T>()
	        		{
	        			var config = new MapperConfiguration(cfg =>
	        			{
	        				cfg.CreateMap<T, T>();
	        			});
	        			return config.CreateMapper();
	        		}

		public async Task<Guid> CreateSeat(Seat model)
		{
			foreach(var sub in model.schedules)
			{
				if (sub.Id.Equals(Guid.NewGuid())){
					sub.Id = new Guid();
					await _RegularSeatScheduleHandler.CreateRegularSeatSchedule(sub);
				}
			}
			return await _SeatRepository.Insert(model);
		}
		
		public async Task<bool> DeleteSeat(Guid id)
		{
			return await _SeatRepository.Delete(id);	
		}
		
		public async Task<List<Seat>> GetAll(int page, int pageSize)
		{
			var all = await _SeatRepository.GetPaged(page, pageSize);	
			var map = CreateMapperConf<Seat>();
			var protectiveCopy = all.Select(e => map.Map<Seat, Seat>(e)).ToList();
			var finalResult = new List<Seat>();
			
			foreach(var item in protectiveCopy) item.schedules = new List<RegularSeatSchedule>();
			foreach(var item in all)
			{
				var protectedSingle = protectiveCopy.ToList().Find(x => x.Id.Equals(item.Id));
				foreach(var single in item.schedules)
				{
					var res = await _RegularSeatScheduleHandler.Get(single.Id);
					if (res != null) protectedSingle.schedules.Add(res);
				}
				finalResult.Add(protectedSingle);
			}
			
			if(finalResult.Count == 0) finalResult = protectiveCopy.ToList();
			return finalResult;
		}
		
		public async Task<Seat> Update(Seat model)
		{
			foreach(var single in model.schedules) if(single != null) await _RegularSeatScheduleHandler.Update(single);
			return await _SeatRepository.Put(model);
		}
		
		public async Task<Seat> Get(Guid id)
		{
			var result = await _SeatRepository.GetById(id);
			var map = CreateMapperConf<Seat>();
			var finalResult = map.Map<Seat, Seat>(result);
			if(result.schedules != null)
			{
				var list = new List<RegularSeatSchedule>();
				foreach(var item in result.schedules)
				{
					var res = await _RegularSeatScheduleHandler.Get(item.Id);
					if (res != null) list.Add(res);
				}
				finalResult.schedules = list;
			}
			return finalResult;	
		}
        
        public async Task<List<Seat>> AddRegularSeatScheduleToAllResources(List<RegularSeatSchedule> collection)
        {
        	var all = await GetAll(0, 1000);
        	
        	foreach(var res in all)
        	{
        		res.schedules.AddRange(collection);
        		await this.Update(res);
        	}
        	
        	return all.ToList();
        }
    }
}
