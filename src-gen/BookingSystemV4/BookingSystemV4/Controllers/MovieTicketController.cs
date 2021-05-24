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
    [Route("MovieTicket")]
    public class MovieTicketController : ControllerBase
    {
        private readonly IMovieTicketHandler _MovieTicketHandler;
        private readonly IMapper _mapper;

        public MovieTicketController(IMovieTicketHandler MovieTicketHandler, IMapper mapper)
        {
            _MovieTicketHandler = MovieTicketHandler;
            _mapper = mapper;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult<IEnumerable<MovieTicket>>> Get(int page = 0, int pageSize = 100)
        {
            var result = await _MovieTicketHandler.GetAll(page, pageSize);
            
            if (result == null)
            	return NotFound();
            
            return Ok(result);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<MovieTicket>> Get(Guid id)
        {
            var result = await _MovieTicketHandler.Get(id);
            
            if (result == null)
            	return NotFound();
            				            
           	return Ok(result);
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<Guid>> Create([FromBody]CreateMovieTicketRequestModel rm)
        {
        	
            var model = _mapper.Map<MovieTicket>(rm);
            var result = await _MovieTicketHandler.CreateMovieTicket(model);
            
            if (result == null)
            	return NotFound();
            				            
            return Ok(result);
        }
        
        [HttpPut]
        [Route("")]
        public async Task<ActionResult<MovieTicket>> Put([FromBody] UpdateMovieTicketRequestModel rm)
        {
        	
        	var model = _mapper.Map<MovieTicket>(rm);
        	var result = await _MovieTicketHandler.Update(model);
        	
        	if (result == null)
        		return NotFound();
        					            
        	return Ok(result);
        }
        
        [HttpDelete]
        [Route("")]
        public async Task<ActionResult<bool>> Delete(Guid id)
        {
        	var result = await _MovieTicketHandler.DeleteMovieTicket(id);
        	
        	if (!result)
        	     return NotFound();
        	
        	return Ok(result);
        }
        
    }
}
