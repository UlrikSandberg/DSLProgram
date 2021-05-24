using System;
using BookingSystemV4.Configuration;
using BookingSystemV4.Persistence.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace BookingSystemV4.Persistence.Repositories
{
    public interface IVIPRepository : IBaseRepository<VIP>
    {
    }
    
    public class VIPRepository : BaseRepository<VIP>, IVIPRepository
    {
        public VIPRepository(IMongoClient client, IOptions<PersistenceConfiguration> config) : base(client, config)
        {
        }
    }
}
