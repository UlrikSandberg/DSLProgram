using System;
using BookingSystemV4.Configuration;
using BookingSystemV4.Persistence.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace BookingSystemV4.Persistence.Repositories
{
    public interface ICinemaHallRepository : IBaseRepository<CinemaHall>
    {
    }
    
    public class CinemaHallRepository : BaseRepository<CinemaHall>, ICinemaHallRepository
    {
        public CinemaHallRepository(IMongoClient client, IOptions<PersistenceConfiguration> config) : base(client, config)
        {
        }
    }
}
