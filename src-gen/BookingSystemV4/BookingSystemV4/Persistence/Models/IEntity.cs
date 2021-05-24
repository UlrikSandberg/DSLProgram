using System;
using System.Collections.Generic;

namespace BookingSystemV4.Persistence.Models
{
    public interface IEntity
    {
        Guid Id { get; }
    }
}
