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
    public interface IVIPHandler
    {
        Task<Guid> CreateVIP(VIP model);
        Task<bool> DeleteVIP(Guid id);
        Task<List<VIP>> GetAll(int page, int pageSize);
        Task<VIP> Update(VIP model);
        Task<VIP> Get(Guid id);
    }
    
    public class VIPHandler : IVIPHandler
    {
        private readonly IVIPRepository _VIPRepository;

        public VIPHandler(IVIPRepository VIPRepository
                             )
        {
            _VIPRepository = VIPRepository;
        }
        
        private IMapper CreateMapperConf<T>()
	        		{
	        			var config = new MapperConfiguration(cfg =>
	        			{
	        				cfg.CreateMap<T, T>();
	        			});
	        			return config.CreateMapper();
	        		}

		public async Task<Guid> CreateVIP(VIP model)
		{
			return await _VIPRepository.Insert(model);
		}
		
		public async Task<bool> DeleteVIP(Guid id)
		{
			return await _VIPRepository.Delete(id);	
		}
		
		public async Task<List<VIP>> GetAll(int page, int pageSize)
		{
			var all = await _VIPRepository.GetPaged(page, pageSize);	
			var map = CreateMapperConf<VIP>();
			var protectiveCopy = all.Select(e => map.Map<VIP, VIP>(e)).ToList();
			var finalResult = new List<VIP>();
			
			
			if(finalResult.Count == 0) finalResult = protectiveCopy.ToList();
			return finalResult;
		}
		
		public async Task<VIP> Update(VIP model)
		{
			return await _VIPRepository.Put(model);
		}
		
		public async Task<VIP> Get(Guid id)
		{
			var result = await _VIPRepository.GetById(id);
			var map = CreateMapperConf<VIP>();
			var finalResult = map.Map<VIP, VIP>(result);
			return finalResult;	
		}
        
    }
}
