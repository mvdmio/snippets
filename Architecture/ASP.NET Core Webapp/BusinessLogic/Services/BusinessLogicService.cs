using System;
using System.Collections.Generic;
using System.Text;
using BusinessLogic.Entities;
using BusinessLogic.Interfaces;
using BusinessLogic.Interfaces.Repositories;

namespace BusinessLogic.Services
{
    public class BusinessLogicService : IBusinessLogicService
    {
        private readonly IBusinessLogicRepository _businessLogicRepository;

        public BusinessLogicService(IBusinessLogicRepository businessLogicRepository)
        {
            _businessLogicRepository = businessLogicRepository;
        }

        public IEnumerable<BusinessLogicEntity> GetAll()
        {
            return _businessLogicRepository.GetAll();
        }

        public void Save(BusinessLogicEntity entity)
        {
            _businessLogicRepository.Save(entity);
        }
    }
}
