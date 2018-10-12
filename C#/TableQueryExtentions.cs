using System;
using Microsoft.WindowsAzure.Storage.Table;

namespace MMBusiness.Data.Azure
{
    /// <summary>
    /// Additions and simplification of <see cref="TableQuery"/> methods.
    /// </summary>
    public static class TableQueryExtentions
    {
        /// <summary>
        /// Adds a new filter to the query, combining with the previous filter(s) using the <see cref="TableOperators.And"/> operator.
        /// If the filter was previously empty, this method will have the same behaviour as calling <see cref="TableQuery.Where(string)"/>
        /// </summary>
        /// <typeparam name="T">The query result type</typeparam>
        /// <param name="query">The existing query</param>
        /// <param name="filter">The filter that should be added</param>
        /// <returns>The combined <see cref="TableQuery"/></returns>
        public static TableQuery<T> AndWhere<T>(this TableQuery<T> query, string filter) where T : ITableEntity, new()
        {
            if (string.IsNullOrWhiteSpace(query.FilterString))
                return query.Where(filter);

            query.FilterString = TableQuery.CombineFilters(query.FilterString, TableOperators.And, filter);
            return query;
        }

        /// <summary>
        /// Adds a new filter to the query, combining with the previous filter(s) using the <see cref="TableOperators.Or"/> operator.
        /// If the filter was previously empty, this method will have the same behaviour as calling <see cref="TableQuery.Where(string)"/>
        /// </summary>
        /// <typeparam name="T">The query result type</typeparam>
        /// <param name="query">The existing query</param>
        /// <param name="filter">The filter that should be added</param>
        /// <returns>The combined <see cref="TableQuery"/></returns>
        public static TableQuery<T> OrWhere<T>(this TableQuery<T> query, string filter) where T : ITableEntity, new()
        {
            if (string.IsNullOrWhiteSpace(query.FilterString))
                return query.Where(filter);

            query.FilterString = TableQuery.CombineFilters(query.FilterString, TableOperators.Or, filter);
            return query;
        }

        /// <summary>
        /// Adds a new filter to the query, combining with the previous filter(s) using the <see cref="TableOperators.Not"/> operator.
        /// If the filter was previously empty, this method will throw an <see cref="InvalidOperationException"/>, because it is not possible to combine a <see cref="TableOperators.Not"/> operation with an empty filter."/>
        /// </summary>
        /// <typeparam name="T">The query result type</typeparam>
        /// <param name="query">The existing query</param>
        /// <param name="filter">The filter that should be added</param>
        /// <returns>The combined <see cref="TableQuery"/></returns>
        /// <exception cref="InvalidOperationException">This exception is thrown if the previous filter was empty. It is not possible to combine the <see cref="TableOperators.Not"/> operator with an empty filter.</exception>
        public static TableQuery<T> NotWhere<T>(this TableQuery<T> query, string filter) where T : ITableEntity, new()
        {
            if (string.IsNullOrWhiteSpace(query.FilterString))
                throw new InvalidOperationException($"Cannot combine a {nameof(TableOperators.Not)} operation with an empty filter");

            query.FilterString = TableQuery.CombineFilters(query.FilterString, TableOperators.Not, filter);
            return query;
        }
    }
}