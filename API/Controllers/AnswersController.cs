using API.Models;
using API.Models.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AnswersController : ControllerBase
    {
        private readonly StackOverflowContext _stackOverflowContext;
        private readonly RepositoryImp _repositoryImp;
        private readonly QuestionsController _questionsController;
        private readonly VotesController _votesController;
        private UsersController usersController;
        public AnswersController(StackOverflowContext stackOverflowContext, RepositoryImp repositoryImp)
        {
            _stackOverflowContext = stackOverflowContext;
            _repositoryImp = repositoryImp;
            _questionsController = new QuestionsController(stackOverflowContext, repositoryImp);
            _votesController = new VotesController(stackOverflowContext, repositoryImp);
            usersController = new UsersController(stackOverflowContext, repositoryImp);
        }

        #region PostMethod
        [HttpPost]
        [Route("Add")]
        public void InsertAnswer(AnswerDTO answer)
        {
            Answer insertAnswer = new Answer()
            {
                AnswerText = answer.AnswerText,
                AnswerDateAndTime = answer.AnswerDateAndTime,
                QuestionId = answer.QuestionID,
                UserId = answer.UserID,
                VotesCount = answer.VotesCount
            };
            _repositoryImp.Insert<Answer>(insertAnswer);
            _questionsController.UpdateQuestionAnswerCount(insertAnswer.QuestionId, 1);
        }

        [HttpPost]
        [Route("Delete")]
        public void DeleteAnswer(AnswerDTO answer)
        {
            Answer answerInDB = _stackOverflowContext.Answers.Where(item => item.AnswerId == answer.AnswerID).FirstOrDefault();

            _repositoryImp.Delete<Answer>(answerInDB);
            _questionsController.UpdateQuestionAnswerCount(answerInDB.QuestionId, -1);
        }

        [HttpPost]
        [Route("Update")]
        public void UpdateAnswer(AnswerDTO answer)
        {
            Answer answerInDB = _stackOverflowContext.Answers.Where(item => item.AnswerId == answer.AnswerID).FirstOrDefault();
            answerInDB.AnswerText = answer.AnswerText;
            answerInDB.AnswerDateAndTime = answer.AnswerDateAndTime;
            _repositoryImp.Update<Answer>(answerInDB);
        }

        [HttpPost]
        [Route("Update/Votes/{answerID}/{userID}/{value}/{currentVoteType}")]
        public void UpdateAnswerVotesCount(int answerID, int userID, int value, int currentVoteType)
        {
            Answer answer = _stackOverflowContext.Answers.Where(item => item.AnswerId == answerID).FirstOrDefault();
            if (answer != null)
            {
                if ( currentVoteType == 1 && value == 0)
                {
                    answer.VotesCount += -1;
                }
                else if(currentVoteType == -1 && value == 0)
                {
                    answer.VotesCount += 1;

                }
                else
                {
                    answer.VotesCount += value;
                }
                _stackOverflowContext.SaveChanges();
                _questionsController.UpdateQuestionVotesCount(answer.QuestionId, 1);
                _votesController.UpdateVote(answerID, userID, value);
            }
        }

        #endregion

        #region GetMethod
        [HttpGet]
        [Route("question/{questionsID}")]
        public List<AnswerDTO> GetAnswersByQuestionID(int questionsID)
        {
            List<Answer> anwersInDB = _stackOverflowContext.Answers.Where(item => item.QuestionId == questionsID).Include(item => item.Votes).OrderBy(item => item.AnswerDateAndTime).ToList();
            List<AnswerDTO> answers = new List<AnswerDTO>();
            foreach (Answer item in anwersInDB)
            {
                AnswerDTO insertAnswer = new AnswerDTO()
                {
                    AnswerID = item.AnswerId,
                    AnswerText = item.AnswerText,
                    AnswerDateAndTime = (DateTime)((DateTime)item.AnswerDateAndTime == null ? null : item.AnswerDateAndTime),
                    UserID = (int)(item.UserId == null ? null : item.UserId),
                    QuestionID = (int)item.QuestionId,
                    VotesCount = (int)item.VotesCount,
                    Votes = new List<VoteDTO>(),
                    User = usersController.GetUserByID((int)item.UserId)
                };
                foreach (Vote voteAnswer in item.Votes)
                {
                    VoteDTO vote = new VoteDTO();
                    {
                        vote.AnswerID = (int)voteAnswer.AnswerId;
                        vote.UserID = (int)voteAnswer.UserId;
                        vote.VoteID = voteAnswer.VoteId;
                        vote.VoteValue = (int)voteAnswer.VoteValue;
                    }
                    insertAnswer.Votes.Add(vote);

                }
                answers.Add(insertAnswer);
            }
            
            return answers;
        }

        [HttpGet]
        [Route("{answerID}")]
        public AnswerDTO GetAnswersID(int answerID)
        {
            Answer answerInDB = _stackOverflowContext.Answers.Where(item => item.AnswerId == answerID).FirstOrDefault();
            AnswerDTO answer = new AnswerDTO()
            {
                AnswerID = answerInDB.AnswerId,
                AnswerText = answerInDB.AnswerText,
                AnswerDateAndTime = (DateTime)((DateTime)answerInDB.AnswerDateAndTime == null ? null : answerInDB.AnswerDateAndTime),
                UserID = (int)(answerInDB.UserId == null ? null : answerInDB.UserId),
                QuestionID = (int)answerInDB.QuestionId,
                VotesCount = (int)answerInDB.VotesCount,
                Votes = new List<VoteDTO>(),
                User = new UserDTO()
            };
            return answer;
        }
        #endregion
    }
}
