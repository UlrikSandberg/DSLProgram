using System;
using BookingSystemV4.Configuration;
using BookingSystemV4.Persistence.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace BookingSystemV4.Persistence.Repositories
{
    public interface ISeatRepository : IBaseRepository<Seat>
    {
    }
    
    public class SeatRepository : BaseRepository<Seat>, ISeatRepository
    {
        public SeatRepository(IMongoClient client, IOptions<PersistenceConfiguration> config) : base(client, config)
        {
        }
    }
}
