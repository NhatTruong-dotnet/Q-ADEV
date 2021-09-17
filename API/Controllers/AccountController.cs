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
    public class AccountController : ControllerBase
    {
        private readonly RepositoryImp repositoryImp;
        private readonly StackOverflowContext stackOverflowContext;
        private UsersController usersController;
        public AccountController(RepositoryImp repositoryImp, StackOverflowContext stackOverflowContext)
        {
            this.repositoryImp = repositoryImp;
            this.stackOverflowContext = stackOverflowContext;
            usersController = new UsersController(stackOverflowContext,repositoryImp);

        }
    }
}
