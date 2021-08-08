using System;
using System.Collections.Generic;

#nullable disable

namespace API.Models
{
    public partial class Answer
    {
        public Answer()
        {
            Votes = new HashSet<Vote>();
        }

        public int AnswerId { get; set; }
        public string AnswerText { get; set; }
        public DateTime? AnswerDateAndTime { get; set; }
        public int? UserId { get; set; }
        public int? QuestionId { get; set; }
        public int? VotesCount { get; set; }

        public virtual Question Question { get; set; }
        public virtual User User { get; set; }
        public virtual ICollection<Vote> Votes { get; set; }
    }
}
