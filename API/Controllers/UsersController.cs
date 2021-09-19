using API.Controllers.Helper;
using API.Models;
using API.Models.DTO;
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
        [Route("Register")]
        public int InsertUser(RegisterDTO user)
        {
            User insertUser = new User();
            insertUser.Email = user.Email;
            insertUser.Name = user.Name;
            insertUser.PasswordHash = SHA256HashGenerator.GenerateHash(user.Password);
            insertUser.Mobile = user.Mobile;

            _repositoryImp.Insert<User>(insertUser);
            return GetLastestUserId();
        }

        [HttpPost]
        [Route("Delete")]
        public void DeleteUser(UserDTO user)
        {
            User deleteUser = GetUserByEmail(user.Email);
            _repositoryImp.Delete<User>(deleteUser);
        }

        [HttpPost]
        [Route("Update/{userEmail}/{userName}/{Mobile}")]
        public void UpdateUser(string userEmail, string userName, string Mobile)
        {
            User updateUser = GetUserByEmail(userEmail);
            updateUser.Email = userEmail;
            updateUser.Name = userName;
            //updateUser.PasswordHash = SHA256HashGenerator.GenerateHash(user.Password);
            updateUser.Mobile = Mobile;
            _repositoryImp.Update<User>(updateUser);
        }
        [HttpPost]
        [Route("Update/{userPassword}/{userEmail}")]
        public void UpdateUserPassword(string userPassword,string userEmail)
        {
            User updateUser = GetUserByEmail(userEmail);
            updateUser.Email = userEmail;
            updateUser.PasswordHash = SHA256HashGenerator.GenerateHash(userPassword);
            _repositoryImp.Update<User>(updateUser);
        }
        #endregion

        #region GetMethod
        [HttpGet]
        [Route("")]
        public List<UserDTO> GetUsers()
        {
            List<User> usersInDB = _stackOverflowContext.Users.Where(user => user.IsAdmin == false).OrderBy(item => item.Name).ToList();
            List<UserDTO> users = new List<UserDTO>();
            foreach (User item in usersInDB)
            {
                users.Add(new UserDTO
                {
                    Email = item.Email,
                    Name = item.Name,
                    IsAdmin = item.IsAdmin,
                    Mobile = item.Mobile,
                    UserID = item.UserId,
                    Password = item.PasswordHash
                });
            }
            return users;
        }

        public User GetUserByEmail(string email)
        {
            User user = _stackOverflowContext.Users.Where(user => user.Email == email).FirstOrDefault();
            return user;
        }

        [HttpGet]
        [Route("{userID}")]
        public UserDTO GetUserByID(int userID)
        {
            User userInDB = _stackOverflowContext.Users.Where(user => user.UserId == userID).FirstOrDefault();
            UserDTO user = null;
            if (userInDB != null)
            {
                user = new UserDTO()
                {
                    Email = userInDB.Email,
                    Name = userInDB.Name,
                    IsAdmin = userInDB.IsAdmin,
                    Mobile = userInDB.Mobile,
                    UserID = userInDB.UserId,
                    Password = userInDB.PasswordHash
                };
            }


            return user;
        }

        [HttpGet]
        [Route("{email}/{password}")]
        public UserDTO GetUserByEmailAndPassword(string email, string password)
        {
            User userInDB = _stackOverflowContext.Users.Where(user => user.Email == email && user.PasswordHash == SHA256HashGenerator.GenerateHash(password)).FirstOrDefault();
            UserDTO user = null;
            if (userInDB != null)
            {
                user = new UserDTO()
                {
                    Email = userInDB.Email,
                    Name = userInDB.Name,
                    IsAdmin = userInDB.IsAdmin,
                    Mobile = userInDB.Mobile,
                    UserID = userInDB.UserId,
                    Password = userInDB.PasswordHash
                };
            }


            return user;
        }

        public int GetLastestUserId()
        {
            int userID = _stackOverflowContext.Users.Select(user => user.UserId).Max();
            return userID;
        }
        #endregion
    }
}
