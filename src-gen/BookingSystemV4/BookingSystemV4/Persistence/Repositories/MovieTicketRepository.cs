using System;
using BookingSystemV4.Configuration;
using BookingSystemV4.Persistence.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace BookingSystemV4.Persistence.Repositories
{
    public interface IMovieTicketRepository : IBaseRepository<MovieTicket>
    {
    }
    
    public class MovieTicketRepository : BaseRepository<MovieTicket>, IMovieTicketRepository
    {
        public MovieTicketRepository(IMongoClient client, IOptions<PersistenceConfiguration> config) : base(client, config)
        {
        }
    }
}
