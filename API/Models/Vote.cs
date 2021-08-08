using System;
using System.Collections.Generic;

#nullable disable

namespace API.Models
{
    public partial class Vote
    {
        public int VoteId { get; set; }
        public int? UserId { get; set; }
        public int? AnswerId { get; set; }
        public int? VoteValue { get; set; }

        public virtual Answer Answer { get; set; }
        public virtual User User { get; set; }
    }
}
