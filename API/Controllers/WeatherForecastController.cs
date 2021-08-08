using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        private readonly ILogger<WeatherForecastController> _logger;
        private readonly StackOverflowContext _stackOverflowContext;
        private readonly RepositoryImp repositoryImp;

        public WeatherForecastController(ILogger<WeatherForecastController> logger, StackOverflowContext stackOverflowContext, RepositoryImp repositoryImp)
        {
            _logger = logger;
            _stackOverflowContext = stackOverflowContext;
            this.repositoryImp = repositoryImp;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get()
        {
            
            Category  category = new Category();
            category.CategoryId = 1;
            category.CategoryName = "HTML";

            repositoryImp.Update<Category>(category);
            var rng = new Random();
            return Enumerable.Range(1, 5).Select(index => new WeatherForecast
            {
                Date = DateTime.Now.AddDays(index),
                TemperatureC = rng.Next(-20, 55),
                Summary = Summaries[rng.Next(Summaries.Length)]
            })
            .ToArray();
             
        }
    }
}
