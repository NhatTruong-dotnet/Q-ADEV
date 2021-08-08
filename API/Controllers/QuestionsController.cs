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
    public class QuestionsController : ControllerBase
    {
        private readonly StackOverflowContext _stackOverflowContext;
        private readonly RepositoryImp _repositoryImp;
        public QuestionsController(StackOverflowContext stackOverflowContext, RepositoryImp repositoryImp)
        {
            _stackOverflowContext = stackOverflowContext;
            _repositoryImp = repositoryImp;
        }

        #region PostMethod
        [HttpPost]
        public void InsertQuestion(Question question)
        {
            _repositoryImp.Insert<Question>(question);
        }

        [HttpPost]
        public void DeleteaQuestion(Question question)
        {
            _repositoryImp.Delete<Question>(question);
        }

        [HttpPost]
        public void UpdateQuestion(Question question)
        {
            _repositoryImp.Update<Question>(question);
        }

        [HttpPost]
        public void UpdateQuestionVotesCount(int? questionID, int value)
        {
            Question question = _stackOverflowContext.Questions.Where(item => item.QuestionId == questionID).FirstOrDefault();
            if (question != null)
            {
                question.VotesCount += value;
                _stackOverflowContext.SaveChanges();
            }
        }

        [HttpPost]
        public void UpdateQuestionAnswerCount(int? questionId, int value)
        {
            Question question = _stackOverflowContext.Questions.Where(item => item.QuestionId == questionId).FirstOrDefault();
            if (question != null)
            {
                question.AnswersCount += value;
                _stackOverflowContext.SaveChanges();
            }
        }

        [HttpPost]
        public void UpdateQuestionViewsCount(int questionId, int value)
        {
            Question question = _stackOverflowContext.Questions.Where(item => item.QuestionId == questionId).FirstOrDefault();
            if (question != null)
            {
                question.ViewsCount += value;
                _stackOverflowContext.SaveChanges();
            }
        }
        #endregion

        #region GetMethod
        [HttpGet]
        public List<Question> GetQuestions()
        {
            List<Question> questions = _stackOverflowContext.Questions.OrderByDescending(item => item.QuestionDateAndTime).ToList();
            return questions;
        }
        [HttpGet]
        public Question GetQuestionbyID(int questionsID)
        {
            Question question = _stackOverflowContext.Questions.Where(item => item.QuestionId == questionsID).FirstOrDefault() ;
            return question;
        }
        #endregion
    }
}
