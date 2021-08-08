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
    public class AnswersController : ControllerBase
    {
        private readonly StackOverflowContext _stackOverflowContext;
        private readonly RepositoryImp _repositoryImp;
        private readonly QuestionsController _questionsController;
        private readonly VotesController _votesController;

        public AnswersController(StackOverflowContext stackOverflowContext, RepositoryImp repositoryImp)
        {
            _stackOverflowContext = stackOverflowContext;
            _repositoryImp = repositoryImp;
            _questionsController = new QuestionsController(stackOverflowContext, repositoryImp);
            _votesController = new VotesController(stackOverflowContext, repositoryImp);
        }

        #region PostMethod
        [HttpPost]
        public void InsertAnswer(Answer answer)
        {
            _repositoryImp.Insert<Answer>(answer);
            _questionsController.UpdateQuestionAnswerCount(answer.QuestionId, 1);
        }

        [HttpPost]
        public void DeleteAnswer(Answer answer)
        {
            _repositoryImp.Delete<Answer>(answer);
            _questionsController.UpdateQuestionAnswerCount(answer.QuestionId, -1);
        }

        [HttpPost]
        public void UpdateAnswer(Answer answer)
        {
            _repositoryImp.Update<Answer>(answer);
        }

        [HttpPost]
        public void UpdateAnswerVotesCount(int answerID, int userID, int value)
        {
            Answer answer = _stackOverflowContext.Answers.Where(item => item.AnswerId == answerID).FirstOrDefault();
            if (answer != null)
            {
                answer.VotesCount += value;
                _stackOverflowContext.SaveChanges();
                _questionsController.UpdateQuestionVotesCount(answer.QuestionId, 1);
                _votesController.UpdateVote(answerID, userID, value);
            }
        }

        #endregion

        #region GetMethod
        [HttpGet]
        [Route("question/{questionsID}")]
        public List<Answer> GetAnswersByQuestionID(int questionsID)
        {
            List<Answer> anwers = _stackOverflowContext.Answers.Where(item => item.QuestionId == questionsID).OrderBy(item => item.AnswerDateAndTime).ToList();
            return anwers;
        }

        [HttpGet]
        [Route("{answerID}")]
        public Answer GetAnswersID(int answerID)
        {
            Answer anwer = _stackOverflowContext.Answers.Where(item => item.AnswerId == answerID).FirstOrDefault();
            return anwer;
        }
        #endregion
    }
}
