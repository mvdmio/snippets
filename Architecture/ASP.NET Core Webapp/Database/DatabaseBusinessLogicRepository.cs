using System;
using System.Collections.Generic;
using System.Linq;
using BusinessLogic.Entities;
using BusinessLogic.Interfaces.Repositories;
using Database.Models;

namespace Database
{
    public class DatabaseBusinessLogicRepository : IBusinessLogicRepository
    {
        private readonly IList<DatabaseModel> _databaseModels;

        public DatabaseBusinessLogicRepository()
        {
            _databaseModels = new List<DatabaseModel>();
        }

        public IEnumerable<BusinessLogicEntity> GetAll()
        {
            return _databaseModels.Select(
                x => new BusinessLogicEntity {
                    Property = x.Property
                }
            );
        }

        public void Save(BusinessLogicEntity entity)
        {
            var existingDbModel = _databaseModels.SingleOrDefault(x => x.Property == entity.Property);

            if (existingDbModel == null)
            {
                _databaseModels.Add(
                    new DatabaseModel {
                        Property = entity.Property
                    }
                );
            }
            else
            {
                existingDbModel.Property = entity.Property;
            }
        }
    }
}
