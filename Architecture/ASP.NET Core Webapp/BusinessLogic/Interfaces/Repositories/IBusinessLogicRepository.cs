using System;
using System.Collections.Generic;
using System.Text;
using BusinessLogic.Entities;

namespace BusinessLogic.Interfaces.Repositories
{
    public interface IBusinessLogicRepository
    {
        IEnumerable<BusinessLogicEntity> GetAll();
        void Save(BusinessLogicEntity entity);
    }
}
