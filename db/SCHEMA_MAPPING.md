# Schema alignment notes

This project spec assumes a Supabase schema for a project submission platform. The existing database already includes general organization, group, course, and subscriber tables, so the application should reuse them instead of introducing duplicate structures.

## Key mappings to the existing database
- **Students** → use `public.subscribers` (`id` bigint) as the student table. Anywhere the spec mentions `student_id`, the column should be named `subscriber_id` and reference `public.subscribers(id)`.
- **Organizations** → keep using `public.organizations`. No changes required.
- **Groups** → keep using `public.groups` with `organization_id` as a foreign key to `public.organizations`.
- **Courses** → reuse `public.courses` (already has `name`, `price`, and `duration`). The spec's `description` field can be omitted or handled at the application layer without altering the DB.
- **Organization–Course link** → reuse `public.organizations_courses` (`organization_id`, `course_id`).
- **Users for auditing/review** → where the spec refers to reviewers, map them to `auth.users` (UUID).

## New tables introduced by the project
The existing database does not contain the project/submission domain tables. Use `db/new_project_tables.sql` to create them so they align with the existing tables above.

## Running the SQL
Execute the SQL script in `db/new_project_tables.sql` on the target Postgres/Supabase instance *after* the existing schema has been applied:

```sql
\i db/new_project_tables.sql
```

The script is idempotent for types and tables, so it can be run safely if the objects are absent.
