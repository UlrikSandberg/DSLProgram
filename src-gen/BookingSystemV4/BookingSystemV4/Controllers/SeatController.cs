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
    [Route("Seat")]
    public class SeatController : ControllerBase
    {
        private readonly ISeatHandler _SeatHandler;
        private readonly IMapper _mapper;

        public SeatController(ISeatHandler SeatHandler, IMapper mapper)
        {
            _SeatHandler = SeatHandler;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult<IEnumerable<Seat>>> Get(int page = 0, int pageSize = 100)
        {
            var result = await _SeatHandler.GetAll(page, pageSize);
            
            if (result == null)
            	return NotFound();
            
            return Ok(result);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<Seat>> Get(Guid id)
        {
            var result = await _SeatHandler.Get(id);
            
            if (result == null)
            	return NotFound();
            				            
           	return Ok(result);
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Guid>> Create([FromBody]CreateSeatRequestModel rm)
        {
        	
            var model = _mapper.Map<Seat>(rm);
            var result = await _SeatHandler.CreateSeat(model);
            
            if (result == null)
            	return NotFound();
            				            
            return Ok(result);
        }
        
        [HttpPut]
        [Route("")]
        public async Task<ActionResult<Seat>> Put([FromBody] UpdateSeatRequestModel rm)
        {
        	
        	var model = _mapper.Map<Seat>(rm);
        	var result = await _SeatHandler.Update(model);
        	
        	if (result == null)
        		return NotFound();
        					            
        	return Ok(result);
        }
        
        [HttpDelete]
        [Route("")]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
        	var result = await _SeatHandler.DeleteSeat(id);
        	
        	if (!result)
        	     return NotFound();
        	
        	return Ok(result);
        }
        
        [HttpPut]
        [Route("AddRegularSeatSchedulesToAll")]
        public async Task<ActionResult<List<Seat>>> AddRegularSeatSchedulesToAll([FromBody] List<RegularSeatSchedule> list)
        {
        	var result = await _SeatHandler.AddRegularSeatScheduleToAllResources(list);
        	
        	if(result == null) return BadRequest();
        	
        	return Ok(result);
        }
    }
}
