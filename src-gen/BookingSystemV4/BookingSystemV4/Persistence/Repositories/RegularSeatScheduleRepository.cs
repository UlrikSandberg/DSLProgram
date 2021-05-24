using System;
using BookingSystemV4.Configuration;
using BookingSystemV4.Persistence.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace BookingSystemV4.Persistence.Repositories
{
    public interface IRegularSeatScheduleRepository : IBaseRepository<RegularSeatSchedule>
    {
    }
    
    public class RegularSeatScheduleRepository : BaseRepository<RegularSeatSchedule>, IRegularSeatScheduleRepository
    {
        public RegularSeatScheduleRepository(IMongoClient client, IOptions<PersistenceConfiguration> config) : base(client, config)
        {
        }
    }
}
