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
    public class UsersController : ControllerBase
    {
        private readonly StackOverflowContext _stackOverflowContext;
        private readonly RepositoryImp _repositoryImp;

        public UsersController(StackOverflowContext stackOverflowContext, RepositoryImp repositoryImp)
        {
            _stackOverflowContext = stackOverflowContext;
            _repositoryImp = repositoryImp;
        }

        #region PostMethod
        [HttpPost]
        public void InsertUser(User user)
        {
            _repositoryImp.Insert<User>(user);
        }

        [HttpPost]
        public void DeleteUser(User user)
        {
            _repositoryImp.Delete<User>(user);
        }

        [HttpPost]
        public void UpdateUser(User user)
        {
            _repositoryImp.Update<User>(user);
        }
        #endregion

        #region GetMethod
        [HttpGet]
        public List<User> GetUsers()
        {
            List<User> users = _stackOverflowContext.Users.Where(user => user.IsAdmin == false).OrderBy(item => item.Name).ToList();
            return users;
        }

        [HttpGet]
        public User GetUserByEmail(string email)
        {
            User user = _stackOverflowContext.Users.Where(user => user.Email == email ).FirstOrDefault();
            return user;
        }

        [HttpGet]
        public int GetLastestUserId()
        {
            int userID = _stackOverflowContext.Users.Select(user => user.UserId).Max();
            return userID;
        }
        #endregion
    }
}
