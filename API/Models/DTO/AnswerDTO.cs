using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Models.DTO
{
    public class AnswerDTO
    {
        public int AnswerID { get; set; }
        public string AnswerText { get; set; }
        public DateTime? AnswerDateAndTime { get; set; }
        public int UserID { get; set; }
        public int QuestionID { get; set; }
        public int VotesCount { get; set; }
        public int CurrentVoteType { get; set; }
        public virtual UserDTO User { get; set; }
        public virtual ICollection<VoteDTO> Votes { get; set; }
    }
}
