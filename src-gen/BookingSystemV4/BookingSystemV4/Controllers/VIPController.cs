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
    [Route("VIP")]
    public class VIPController : ControllerBase
    {
        private readonly IVIPHandler _VIPHandler;
        private readonly IMapper _mapper;

        public VIPController(IVIPHandler VIPHandler, IMapper mapper)
        {
            _VIPHandler = VIPHandler;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult<IEnumerable<VIP>>> Get(int page = 0, int pageSize = 100)
        {
            var result = await _VIPHandler.GetAll(page, pageSize);
            
            if (result == null)
            	return NotFound();
            
            return Ok(result);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<VIP>> Get(Guid id)
        {
            var result = await _VIPHandler.Get(id);
            
            if (result == null)
            	return NotFound();
            				            
           	return Ok(result);
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Guid>> Create([FromBody]CreateVIPRequestModel rm)
        {
        	if(!(rm.age > 10 )) 
        		return BadRequest("Operation failed due to request failing the following constraint: " + 
        								"rm.age > 10 ");
        	
            var model = _mapper.Map<VIP>(rm);
            var result = await _VIPHandler.CreateVIP(model);
            
            if (result == null)
            	return NotFound();
            				            
            return Ok(result);
        }
        
        [HttpPut]
        [Route("")]
        public async Task<ActionResult<VIP>> Put([FromBody] UpdateVIPRequestModel rm)
        {
        	if(!(rm.age > 10 )) 
        		return BadRequest("Operation failed due to request failing the following constraint: " + 
        								"rm.age > 10 ");
        	
        	var model = _mapper.Map<VIP>(rm);
        	var result = await _VIPHandler.Update(model);
        	
        	if (result == null)
        		return NotFound();
        					            
        	return Ok(result);
        }
        
        [HttpDelete]
        [Route("")]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
        	var result = await _VIPHandler.DeleteVIP(id);
        	
        	if (!result)
        	     return NotFound();
        	
        	return Ok(result);
        }
        
    }
}
