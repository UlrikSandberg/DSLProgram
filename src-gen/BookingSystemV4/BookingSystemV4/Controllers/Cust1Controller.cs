using System;
using System.Threading.Tasks;
using BookingSystemV4.Handlers;
using BookingSystemV4.RequestModels;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using AutoMapper;
using BookingSystemV4.Persistence.Models;

namespace BookingSystemV4.Controllers
{
    [Route("Cust1")]
    public class Cust1Controller : ControllerBase
    {
        private readonly ICust1Handler _Cust1Handler;
        private readonly IMapper _mapper;

        public Cust1Controller(ICust1Handler Cust1Handler, IMapper mapper)
        {
            _Cust1Handler = Cust1Handler;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult<IEnumerable<Cust1>>> Get(int page = 0, int pageSize = 100)
        {
            var result = await _Cust1Handler.GetAll(page, pageSize);
            
            if (result == null)
            	return NotFound();
            
            return Ok(result);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Cust1>> Get(Guid id)
        {
            var result = await _Cust1Handler.Get(id);
            
            if (result == null)
            	return NotFound();
            				            
           	return Ok(result);
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Guid>> Create([FromBody]CreateCust1RequestModel rm)
        {
        	
            var model = _mapper.Map<Cust1>(rm);
            var result = await _Cust1Handler.CreateCust1(model);
            
            if (result == null)
            	return NotFound();
            				            
            return Ok(result);
        }
        
        [HttpPut]
        [Route("")]
        public async Task<ActionResult<Cust1>> Put([FromBody] UpdateCust1RequestModel rm)
        {
        	
        	var model = _mapper.Map<Cust1>(rm);
        	var result = await _Cust1Handler.Update(model);
        	
        	if (result == null)
        		return NotFound();
        					            
        	return Ok(result);
        }
        
        [HttpDelete]
        [Route("")]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
        	var result = await _Cust1Handler.DeleteCust1(id);
        	
        	if (!result)
        	     return NotFound();
        	
        	return Ok(result);
        }
        
    }
}
