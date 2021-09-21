using API.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VotesController : ControllerBase
    {
        private readonly StackOverflowContext _stackOverflowContext;
        private readonly RepositoryImp _repositoryImp;
        public VotesController(StackOverflowContext stackOverflowContext, RepositoryImp repositoryImp)
        {
            _stackOverflowContext = stackOverflowContext;
            _repositoryImp = repositoryImp;
        }
        [HttpPost]
        [Route("{answerID}/{userID}/{value}")]
        public void UpdateVote(int answerID, int userID, int value)
        {
            Vote vote = _stackOverflowContext.Votes.Where(item => item.AnswerId == answerID && item.UserId == userID).FirstOrDefault();
            if (vote != null)
            {
                vote.VoteValue = value;
                _stackOverflowContext.SaveChanges();
            }
            else
            {
                Vote newVote = new Vote() { AnswerId = answerID, UserId = userID, VoteValue = value };
                _repositoryImp.Insert<Vote>(newVote);
            }
        }
    }
}
