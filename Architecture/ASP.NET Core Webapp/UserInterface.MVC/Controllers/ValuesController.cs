using System.Collections.Generic;
using System.Linq;
using BusinessLogic.Entities;
using BusinessLogic.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using UserInterface.MVC.Controllers.Models;

namespace UserInterface.MVC.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly IBusinessLogicService _businessLogicService;

        public ValuesController(IBusinessLogicService businessLogicService)
        {
            _businessLogicService = businessLogicService;
        }

        [HttpGet, Route("GetAll")]
        public ActionResult<IEnumerable<UserInterfaceModel>> Get()
        {
            var entities = _businessLogicService.GetAll();

            return Ok(entities.Select(
                (x, i) => new UserInterfaceModel {
                    Index = i,
                    Property = x.Property
                }
            ));
        }

        [HttpGet, Route("Get/{index}")]
        public ActionResult<UserInterfaceModel> Get(int index)
        {
            var entities = _businessLogicService.GetAll().ToList();

            if (entities.Count >= index)
                return Ok(entities[index]);

            return BadRequest();
        }

        [HttpPost, Route("Post")]
        public void Post([FromBody] UserInterfaceModel value)
        {
            _businessLogicService.Save(
                new BusinessLogicEntity {
                    Property = value.Property
                }
            );
        }
    }
}
