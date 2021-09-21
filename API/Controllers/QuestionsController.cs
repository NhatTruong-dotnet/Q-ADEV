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
    public class QuestionsController : ControllerBase
    {
        private readonly StackOverflowContext _stackOverflowContext;
        private readonly RepositoryImp _repositoryImp;
        private UsersController usersController ;
        private CategoriesController categoriesController;
        public QuestionsController(StackOverflowContext stackOverflowContext, RepositoryImp repositoryImp)
        {
            _stackOverflowContext = stackOverflowContext;
            _repositoryImp = repositoryImp;
            usersController = new UsersController(stackOverflowContext, repositoryImp);
            categoriesController = new CategoriesController(stackOverflowContext, repositoryImp);
        }

        #region PostMethod
        [HttpPost]
        [Route("Add")]
        public void InsertQuestion(NewQuestionDTO question)
        {
            Question insertQuestion = new Question()
            {
                QuestionName = question.QuestionName,
                QuestionDateAndTime = question.QuestionDateAndTime,
                UserId = question.UserID,
                CategoryId = question.CategoryID,
                VotesCount = question.VotesCount,
                ViewsCount = question.ViewsCount,
                AnswersCount = question.AnswersCount
            };
            _repositoryImp.Insert<Question>(insertQuestion);
        }

        [HttpPost]
        [Route("Delete")]
        public void DeleteQuestion(QuestionDTO question)
        {
            Question deleteQuestion = _stackOverflowContext.Questions.Where(item => item.QuestionId == question.QuestionID).FirstOrDefault();
            if (deleteQuestion != null)
            {
                deleteQuestion.QuestionId = question.QuestionID;
                _repositoryImp.Delete<Question>(deleteQuestion);
            }
            
        }

        [HttpPost]
        [Route("Update")]
        public void UpdateQuestion(EditQuestionDTO question)
        {
            Question updateQuestion = _stackOverflowContext.Questions.Where(item => item.QuestionId == question.QuestionID).FirstOrDefault();
            if (updateQuestion != null)
            {
                updateQuestion.QuestionName = question.QuestionName;
                updateQuestion.QuestionDateAndTime = question.QuestionDateAndTime;
                updateQuestion.CategoryId = question.CategoryID;
                _repositoryImp.Update<Question>(updateQuestion);
            }
        }

        [HttpPost]
        [Route("votes/question/{questionID}/{value}")]
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
        [Route("votes/answer/{questionID}/{value}")]
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
        [Route("votes/view/{questionID}/{value}")]
        public void UpdateQuestionViewCount(int questionId, int value)
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
        [Route("")]
        public List<QuestionDTO> GetQuestions()
        {
            List<Question> questionsInDB = _stackOverflowContext.Questions.OrderByDescending(item => item.QuestionDateAndTime).Include(item => item.Category).ToList();
            List<QuestionDTO> questions = new List<QuestionDTO>();
            if (questionsInDB.Count > 0)
            {
                foreach (Question item in questionsInDB)
                {
                    questions.Add(new QuestionDTO()
                    {
                        QuestionID = item.QuestionId,
                        QuestionName = item.QuestionName,
                        QuestionDateAndTime = (DateTime)item.QuestionDateAndTime,
                        UserID = (int)item.UserId,
                        CategoryID = (int)item.CategoryId,
                        VotesCount = (int)item.VotesCount,
                        AnswersCount = (int)item.AnswersCount,
                        Category = categoriesController.GetCategoryByID((int)item.CategoryId),
                        ViewsCount = (int)item.ViewsCount,
                        User = new UserDTO() { Name = _stackOverflowContext.Users.Where(user => user.UserId == item.UserId).First().Name}
                    });
                }
            }
            return questions;
        }

        [HttpGet]
        [Route("{questionsID}/{userID}")]
        public QuestionDTO GetQuestionbyID(int questionsID, int userID)
        {
            Question questionInDB = _stackOverflowContext.Questions.Include(answer => answer.Answers).ThenInclude(vote => vote.Votes)
                .Where(item => item.QuestionId == questionsID)
                .FirstOrDefault();
            QuestionDTO question = null;
            if (questionInDB != null)
            {
                #region mapQuestion
                question = new QuestionDTO()
                {
                    QuestionID = questionInDB.QuestionId,
                    QuestionName = questionInDB.QuestionName,
                    QuestionDateAndTime = (DateTime)questionInDB.QuestionDateAndTime,
                    UserID = (int)questionInDB.UserId,
                    CategoryID = (int)questionInDB.CategoryId,
                    VotesCount = (int)questionInDB.VotesCount,
                    ViewsCount = (int)questionInDB.ViewsCount,
                    Category = categoriesController.GetCategoryByID((int)questionInDB.CategoryId),
                    Answers = new List<AnswerDTO>(),
                    User = usersController.GetUserByID((int)questionInDB.UserId)
                    
                };
                foreach (Answer item in questionInDB.Answers)
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
                        User = usersController.GetUserByID((int)(item.UserId == null ? null : item.UserId))
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
                    question.Answers.Add(insertAnswer);

                }

                foreach (AnswerDTO item in question.Answers)
                {
                    item.CurrentVoteType = 0;
                    VoteDTO vote = item.Votes.Where(temp => temp.UserID == userID).FirstOrDefault();
                    if (vote != null)
                    {
                        item.CurrentVoteType = vote.VoteValue;
                    }
                }
                #endregion
            }

            return question;
        }
        #endregion
    }
}
