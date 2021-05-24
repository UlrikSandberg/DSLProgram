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
    [Route("RegularSeatSchedule")]
    public class RegularSeatScheduleController : ControllerBase
    {
        private readonly IRegularSeatScheduleHandler _RegularSeatScheduleHandler;
        private readonly IMapper _mapper;

        public RegularSeatScheduleController(IRegularSeatScheduleHandler RegularSeatScheduleHandler, IMapper mapper)
        {
            _RegularSeatScheduleHandler = RegularSeatScheduleHandler;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult<IEnumerable<RegularSeatSchedule>>> Get(int page = 0, int pageSize = 100)
        {
            var result = await _RegularSeatScheduleHandler.GetAll(page, pageSize);
            
            if (result == null)
            	return NotFound();
            
            return Ok(result);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<RegularSeatSchedule>> Get(Guid id)
        {
            var result = await _RegularSeatScheduleHandler.Get(id);
            
            if (result == null)
            	return NotFound();
            				            
           	return Ok(result);
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Guid>> Create([FromBody]CreateRegularSeatScheduleRequestModel rm)
        {
        	
            var model = _mapper.Map<RegularSeatSchedule>(rm);
            var result = await _RegularSeatScheduleHandler.CreateRegularSeatSchedule(model);
            
            if (result == null)
            	return NotFound();
            				            
            return Ok(result);
        }
        
        [HttpPut]
        [Route("")]
        public async Task<ActionResult<RegularSeatSchedule>> Put([FromBody] UpdateRegularSeatScheduleRequestModel rm)
        {
        	
        	var model = _mapper.Map<RegularSeatSchedule>(rm);
        	var result = await _RegularSeatScheduleHandler.Update(model);
        	
        	if (result == null)
        		return NotFound();
        					            
        	return Ok(result);
        }
        
        [HttpDelete]
        [Route("")]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
        	var result = await _RegularSeatScheduleHandler.DeleteRegularSeatSchedule(id);
        	
        	if (!result)
        	     return NotFound();
        	
        	return Ok(result);
        }
        
    }
}
