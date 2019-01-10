using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.WindowsAzure.Storage.Table;

namespace MMBusiness.Data.Azure
{
    /// <summary>
    /// Additions and simplification of CloudTable methods.
    /// </summary>
    public static class CloudTableExtentions
    {
        /// <summary>
        /// Execute the query on the table and return the results as an IEnumerable.
        /// </summary>
        /// <typeparam name="T">The type of result.</typeparam>
        /// <param name="cloudTable">The table against which to run the query.</param>
        /// <param name="query">The query.</param>
        /// <returns>An array of results as returned by executing the query.</returns>
        /// <remarks>
        /// .NET Core 2.0 cloudtables are missing a simple ExecuteQuery method.
        /// Instead, we need to do a rolling query using a continuation token.
        /// This method encapulates that behaviour, so that users don't have to worry about this anymore.
        /// </remarks>
        public static async Task<IEnumerable<T>> ExecuteQueryAsync<T>(this CloudTable cloudTable, TableQuery<T> query) where T : ITableEntity, new()
        {
            TableContinuationToken continuationToken = null;
            var result = new List<T>();
            do
            {
                var iterationResult = await cloudTable.ExecuteQuerySegmentedAsync(query, continuationToken);
                continuationToken = iterationResult.ContinuationToken;
                result.AddRange(iterationResult.Results);
            }
            while (continuationToken != null);

            return result;
        }
    }
}