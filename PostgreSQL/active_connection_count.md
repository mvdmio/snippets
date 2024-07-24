Get the count of all open connections to the database server grouped by database- and application name.

```SQL
WITH count AS (
   SELECT
      datname,
      application_name,
      COUNT(pid) AS connection_count
   FROM pg_stat_activity
   GROUP BY datname, application_name
)
SELECT * 
FROM count
ORDER BY connection_count DESC
```