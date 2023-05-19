```sql
BEGIN;

DO $$
DECLARE
  r RECORD;
  v_sql text;
BEGIN
  FOR r IN (SELECT schema_name FROM information_schema.schemata WHERE schema_name LIKE 'workset%') LOOP

  BEGIN
      v_sql := format('
            ALTER TABLE %I.tbl_adres_import ADD COLUMN IF NOT EXISTS the_geom_local geometry;
            ALTER TABLE %I.tbl_workset ADD COLUMN IF NOT EXISTS the_geom_local geometry;
            CREATE INDEX IF NOT EXISTS tbl_adres_the_geom_local_idx ON %I.tbl_adres_import USING gist (the_geom_local);
            CREATE INDEX IF NOT EXISTS tbl_workset_the_geom_local_idx ON %I.tbl_workset USING gist (the_geom_local);
          ', r.schema_name, r.schema_name, r.schema_name, r.schema_name
      );

      EXECUTE v_sql;
      RAISE NOTICE 'Updated schema: %', r.schema_name;
  EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Failed to update schema: %', r.schema_name;
  END;

  END LOOP;
END;
$$ LANGUAGE plpgsql;

ROLLBACK;
--COMMIT;
```