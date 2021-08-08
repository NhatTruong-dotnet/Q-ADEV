using API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    public class RepositoryImp
    {
        private readonly StackOverflowContext _stackOverflowContext;

        public RepositoryImp(StackOverflowContext stackOverflowContext)
        {
            _stackOverflowContext = stackOverflowContext;
        }
        public void Insert<T>(T insertObject)
        {
            Type typeObj = typeof(T);
            string nameDBSet = typeObj.Name;
            switch (nameDBSet)
            {
                case "User":
                    _stackOverflowContext.Users.Add(insertObject as User);
                    _stackOverflowContext.SaveChanges();
                    break;
                case "Category":
                    _stackOverflowContext.Categories.Add(insertObject as Category);
                    _stackOverflowContext.SaveChanges();
                    break;
                case "Question":
                    _stackOverflowContext.Questions.Add(insertObject as Question);
                    _stackOverflowContext.SaveChanges();
                    break;
                case "Answer":
                    _stackOverflowContext.Answers.Add(insertObject as Answer);
                    _stackOverflowContext.SaveChanges();
                    break;
                case "Vote":
                    _stackOverflowContext.Votes.Add(insertObject as Vote);
                    _stackOverflowContext.SaveChanges();
                    break;
                default:
                    break;
            }
        }

        public void Delete<T>(T deleteObject)
        {
            Type typeObj = typeof(T);
            string nameDBSet = typeObj.Name;
            switch (nameDBSet)
            {
                case "User":
                    _stackOverflowContext.Users.Remove(deleteObject as User);
                    _stackOverflowContext.SaveChanges();
                    break;
                case "Category":
                    _stackOverflowContext.Categories.Remove(deleteObject as Category);
                    _stackOverflowContext.SaveChanges();
                    break;
                case "Question":
                    _stackOverflowContext.Questions.Remove(deleteObject as Question);
                    _stackOverflowContext.SaveChanges();
                    break;
                case "Answer":
                    _stackOverflowContext.Answers.Remove(deleteObject as Answer);
                    _stackOverflowContext.SaveChanges();
                    break;
                case "Vote":
                    _stackOverflowContext.Votes.Remove(deleteObject as Vote);
                    _stackOverflowContext.SaveChanges();
                    break;
                default:
                    break;
            }
        }

        public void Update<T>(T updateObject)
        {
            Type typeObj = typeof(T);
            string nameDBSet = typeObj.Name;
            switch (nameDBSet)
            {
                case "User":
                    _stackOverflowContext.Users.Update(updateObject as User);
                    _stackOverflowContext.SaveChanges();
                    break;
                case "Category":
                    _stackOverflowContext.Categories.Update(updateObject as Category);
                    _stackOverflowContext.SaveChanges();
                    break;
                case "Question":
                    _stackOverflowContext.Questions.Update(updateObject as Question);
                    _stackOverflowContext.SaveChanges();
                    break;
                case "Answer":
                    _stackOverflowContext.Answers.Update(updateObject as Answer);
                    _stackOverflowContext.SaveChanges();
                    break;
                case "Vote":
                    _stackOverflowContext.Votes.Update(updateObject as Vote);
                    _stackOverflowContext.SaveChanges();
                    break;
                default:
                    break;
            }
        }
    }
}
