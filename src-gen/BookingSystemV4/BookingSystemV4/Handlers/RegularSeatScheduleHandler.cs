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
    public interface IRegularSeatScheduleHandler
    {
        Task<Guid> CreateRegularSeatSchedule(RegularSeatSchedule model);
        Task<bool> DeleteRegularSeatSchedule(Guid id);
        Task<List<RegularSeatSchedule>> GetAll(int page, int pageSize);
        Task<RegularSeatSchedule> Update(RegularSeatSchedule model);
        Task<RegularSeatSchedule> Get(Guid id);
    }
    
    public class RegularSeatScheduleHandler : IRegularSeatScheduleHandler
    {
        private readonly IRegularSeatScheduleRepository _RegularSeatScheduleRepository;

        public RegularSeatScheduleHandler(IRegularSeatScheduleRepository RegularSeatScheduleRepository
                             )
        {
            _RegularSeatScheduleRepository = RegularSeatScheduleRepository;
        }
        
        private IMapper CreateMapperConf<T>()
	        		{
	        			var config = new MapperConfiguration(cfg =>
	        			{
	        				cfg.CreateMap<T, T>();
	        			});
	        			return config.CreateMapper();
	        		}

		public async Task<Guid> CreateRegularSeatSchedule(RegularSeatSchedule model)
		{
			return await _RegularSeatScheduleRepository.Insert(model);
		}
		
		public async Task<bool> DeleteRegularSeatSchedule(Guid id)
		{
			return await _RegularSeatScheduleRepository.Delete(id);	
		}
		
		public async Task<List<RegularSeatSchedule>> GetAll(int page, int pageSize)
		{
			var all = await _RegularSeatScheduleRepository.GetPaged(page, pageSize);	
			var map = CreateMapperConf<RegularSeatSchedule>();
			var protectiveCopy = all.Select(e => map.Map<RegularSeatSchedule, RegularSeatSchedule>(e)).ToList();
			var finalResult = new List<RegularSeatSchedule>();
			
			
			if(finalResult.Count == 0) finalResult = protectiveCopy.ToList();
			return finalResult;
		}
		
		public async Task<RegularSeatSchedule> Update(RegularSeatSchedule model)
		{
			return await _RegularSeatScheduleRepository.Put(model);
		}
		
		public async Task<RegularSeatSchedule> Get(Guid id)
		{
			var result = await _RegularSeatScheduleRepository.GetById(id);
			var map = CreateMapperConf<RegularSeatSchedule>();
			var finalResult = map.Map<RegularSeatSchedule, RegularSeatSchedule>(result);
			return finalResult;	
		}
        
    }
}
