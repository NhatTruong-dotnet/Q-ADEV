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
    public class CategoriesController : ControllerBase
    {
        private readonly StackOverflowContext _stackOverflowContext;
        private readonly RepositoryImp _repositoryImp;

        public CategoriesController(StackOverflowContext stackOverflowContext, RepositoryImp repositoryImp)
        {
            _stackOverflowContext = stackOverflowContext;
            _repositoryImp = repositoryImp;
        }

        #region PostMethod
        [HttpPost]
        public void InsertUser(Category category)
        {
            _repositoryImp.Insert<Category>(category);
        }

        [HttpPost]
        public void DeleteUser(Category category)
        {
            _repositoryImp.Delete<Category>(category);
        }

        [HttpPost]
        public void UpdateUser(Category category)
        {
            _repositoryImp.Update<Category>(category);
        }
        #endregion

        #region GetMethod
        [HttpGet]
        [Route("")]
        public List<Category> GetCategories()
        {
            List<Category> categories = _stackOverflowContext.Categories.ToList();
            return categories;
        }

        [HttpGet]
        [Route("{CategoryID}")]
        public Category GetCategoryByID(int CategoryID)
        {
            Category  category = _stackOverflowContext.Categories.Where(item => item.CategoryId == CategoryID).FirstOrDefault(); 
            return category;
        }
        #endregion
    }
}
