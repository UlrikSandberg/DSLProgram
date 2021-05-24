using System;
using BookingSystemV4.Configuration;
using BookingSystemV4.Persistence.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;

namespace BookingSystemV4.Persistence.Repositories
{
    public interface ICust1Repository : IBaseRepository<Cust1>
    {
    }
    
    public class Cust1Repository : BaseRepository<Cust1>, ICust1Repository
    {
        public Cust1Repository(IMongoClient client, IOptions<PersistenceConfiguration> config) : base(client, config)
        {
        }
    }
}
