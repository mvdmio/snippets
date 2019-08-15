using System.Collections.Generic;
using BusinessLogic.Entities;

namespace BusinessLogic.Interfaces
{
    public interface IBusinessLogicService
    {
        IEnumerable<BusinessLogicEntity> GetAll();
        void Save(BusinessLogicEntity entity);
    }
}
