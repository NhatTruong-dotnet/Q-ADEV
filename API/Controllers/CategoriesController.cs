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
        [Route("Add")]
        public void InsertUser(CategoryDTO category)
        {
            Category insertCategory = new Category()
            {
                CategoryName = category.CategoryName
            };
            _repositoryImp.Insert<Category>(insertCategory);
        }

        [HttpPost]
        [Route("Delete")]
        public void DeleteUser(CategoryDTO category)
        {
            Category deleteCategory = _stackOverflowContext.Categories.Where(item => item.CategoryId == category.CategoryID).FirstOrDefault();
            if (deleteCategory != null)
            {
                deleteCategory.CategoryId = category.CategoryID;
                deleteCategory.CategoryName = category.CategoryName;
                _repositoryImp.Delete<Category>(deleteCategory);
            }
        }

        [HttpPost]
        [Route("Update")]
        public void UpdateUser(CategoryDTO category)
        {

            Category updateCategory = _stackOverflowContext.Categories.Where(item => item.CategoryId == category.CategoryID).FirstOrDefault();
            if (updateCategory != null)
            {
                updateCategory.CategoryId = category.CategoryID;
                updateCategory.CategoryName = category.CategoryName;
                _repositoryImp.Update<Category>(updateCategory);
            };


        }
        #endregion

        #region GetMethod
        [HttpGet]
        [Route("")]
        public List<CategoryDTO> GetCategories()
        {
            List<Category> categoriesInDB = _stackOverflowContext.Categories.ToList();
            List<CategoryDTO> categories = new List<CategoryDTO>();
            foreach (Category item in categoriesInDB)
            {
                categories.Add(new CategoryDTO()
                {
                    CategoryID = item.CategoryId,
                    CategoryName = item.CategoryName
                });
            }
            return categories;
        }

        [HttpGet]
        [Route("{CategoryID}")]
        public CategoryDTO GetCategoryByID(int CategoryID)
        {
            Category categoryInDB = _stackOverflowContext.Categories.Where(item => item.CategoryId == CategoryID).FirstOrDefault();
            CategoryDTO category = null;
            if (categoryInDB != null)
            {
                category = new CategoryDTO()
                {
                    CategoryName = categoryInDB.CategoryName,
                    CategoryID = categoryInDB.CategoryId
                };
            }

            return category;
        }
        #endregion
    }
}
