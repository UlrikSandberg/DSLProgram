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
    public interface ICust1Handler
    {
        Task<Guid> CreateCust1(Cust1 model);
        Task<bool> DeleteCust1(Guid id);
        Task<List<Cust1>> GetAll(int page, int pageSize);
        Task<Cust1> Update(Cust1 model);
        Task<Cust1> Get(Guid id);
    }
    
    public class Cust1Handler : ICust1Handler
    {
        private readonly ICust1Repository _Cust1Repository;

        public Cust1Handler(ICust1Repository Cust1Repository
                             )
        {
            _Cust1Repository = Cust1Repository;
        }
        
        private IMapper CreateMapperConf<T>()
	        		{
	        			var config = new MapperConfiguration(cfg =>
	        			{
	        				cfg.CreateMap<T, T>();
	        			});
	        			return config.CreateMapper();
	        		}

		public async Task<Guid> CreateCust1(Cust1 model)
		{
			return await _Cust1Repository.Insert(model);
		}
		
		public async Task<bool> DeleteCust1(Guid id)
		{
			return await _Cust1Repository.Delete(id);	
		}
		
		public async Task<List<Cust1>> GetAll(int page, int pageSize)
		{
			var all = await _Cust1Repository.GetPaged(page, pageSize);	
			var map = CreateMapperConf<Cust1>();
			var protectiveCopy = all.Select(e => map.Map<Cust1, Cust1>(e)).ToList();
			var finalResult = new List<Cust1>();
			
			
			if(finalResult.Count == 0) finalResult = protectiveCopy.ToList();
			return finalResult;
		}
		
		public async Task<Cust1> Update(Cust1 model)
		{
			return await _Cust1Repository.Put(model);
		}
		
		public async Task<Cust1> Get(Guid id)
		{
			var result = await _Cust1Repository.GetById(id);
			var map = CreateMapperConf<Cust1>();
			var finalResult = map.Map<Cust1, Cust1>(result);
			return finalResult;	
		}
        
    }
}
