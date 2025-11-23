-- Project Submission Platform schema (PostgreSQL/Supabase compatible)
-- Aligns with the tables described in README.md and can be applied to an empty database.

-- Extension for UUID generation (Supabase/Postgres)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- Enums
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'project_asset_type') THEN
        CREATE TYPE project_asset_type AS ENUM ('code', 'document', 'video', 'link', 'image', 'archive', 'other');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'project_part_type') THEN
        CREATE TYPE project_part_type AS ENUM ('auto', 'manual', 'composite');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'submission_status') THEN
        CREATE TYPE submission_status AS ENUM ('draft', 'submitted', 'ai_checked_pending_review', 'graded', 'appeal_pending', 'appeal_resolved');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'result_source') THEN
        CREATE TYPE result_source AS ENUM ('ai', 'reviewer');
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'appeal_status') THEN
        CREATE TYPE appeal_status AS ENUM ('open', 'accepted', 'rejected');
    END IF;
END$$;

-- Core reference tables
CREATE TABLE IF NOT EXISTS organizations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS groups (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    organization_id UUID NOT NULL REFERENCES organizations(id)
);

CREATE TABLE IF NOT EXISTS courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT
);

CREATE TABLE IF NOT EXISTS organization_courses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    organization_id UUID NOT NULL REFERENCES organizations(id),
    course_id UUID NOT NULL REFERENCES courses(id),
    UNIQUE (organization_id, course_id)
);

CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id UUID NOT NULL REFERENCES courses(id),
    name TEXT NOT NULL,
    description TEXT,
    due_date DATE NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS project_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    type project_asset_type NOT NULL,
    label TEXT NOT NULL,
    description TEXT,
    required BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS project_parts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type project_part_type NOT NULL,
    weight NUMERIC(5,2) NOT NULL DEFAULT 1.0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS project_part_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_part_id UUID NOT NULL REFERENCES project_parts(id) ON DELETE CASCADE,
    project_asset_id UUID NOT NULL REFERENCES project_assets(id) ON DELETE CASCADE,
    UNIQUE (project_part_id, project_asset_id)
);

CREATE TABLE IF NOT EXISTS project_custom_fields (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    label TEXT NOT NULL,
    type TEXT NOT NULL,
    options JSONB,
    required BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Submission domain
CREATE TABLE IF NOT EXISTS submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
    student_id UUID NOT NULL,
    organization_id UUID NOT NULL REFERENCES organizations(id),
    group_id UUID REFERENCES groups(id),
    submitted_at TIMESTAMPTZ,
    is_late BOOLEAN NOT NULL DEFAULT FALSE,
    late_override BOOLEAN NOT NULL DEFAULT FALSE,
    status submission_status NOT NULL DEFAULT 'draft',
    final_score NUMERIC(5,2),
    final_comment TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_trigger WHERE tgname = 'set_submissions_updated_at'
    ) THEN
        CREATE TRIGGER set_submissions_updated_at
        BEFORE UPDATE ON submissions
        FOR EACH ROW
        EXECUTE FUNCTION update_updated_at_column();
    END IF;
END$$;

CREATE TABLE IF NOT EXISTS submission_assets (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    project_asset_id UUID NOT NULL REFERENCES project_assets(id),
    storage_path TEXT,
    external_url TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS submission_custom_field_values (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    project_custom_field_id UUID NOT NULL REFERENCES project_custom_fields(id),
    value TEXT,
    UNIQUE (submission_id, project_custom_field_id)
);

CREATE TABLE IF NOT EXISTS submission_part_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    project_part_id UUID NOT NULL REFERENCES project_parts(id),
    score NUMERIC(5,2),
    comment TEXT,
    source result_source NOT NULL DEFAULT 'ai',
    UNIQUE (submission_id, project_part_id)
);

-- If project_part criteria become first-class, map them via this table
CREATE TABLE IF NOT EXISTS project_part_criteria (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    project_part_id UUID NOT NULL REFERENCES project_parts(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    max_score NUMERIC(5,2) NOT NULL,
    weight NUMERIC(5,2) NOT NULL DEFAULT 1.0
);

CREATE TABLE IF NOT EXISTS submission_criteria_results (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_part_result_id UUID NOT NULL REFERENCES submission_part_results(id) ON DELETE CASCADE,
    project_part_criteria_id UUID NOT NULL REFERENCES project_part_criteria(id) ON DELETE CASCADE,
    score NUMERIC(5,2),
    comment TEXT,
    UNIQUE (submission_part_result_id, project_part_criteria_id)
);

CREATE TABLE IF NOT EXISTS appeals (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    submission_id UUID NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    student_id UUID NOT NULL,
    text TEXT NOT NULL,
    status appeal_status NOT NULL DEFAULT 'open',
    review_comment TEXT,
    reviewed_by UUID,
    reviewed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Indexes to speed up common lookups
CREATE INDEX IF NOT EXISTS idx_groups_org ON groups(organization_id);
CREATE INDEX IF NOT EXISTS idx_projects_course ON projects(course_id);
CREATE INDEX IF NOT EXISTS idx_project_assets_project ON project_assets(project_id);
CREATE INDEX IF NOT EXISTS idx_project_parts_project ON project_parts(project_id);
CREATE INDEX IF NOT EXISTS idx_submissions_project ON submissions(project_id);
CREATE INDEX IF NOT EXISTS idx_submissions_student ON submissions(student_id);
CREATE INDEX IF NOT EXISTS idx_submission_assets_submission ON submission_assets(submission_id);
CREATE INDEX IF NOT EXISTS idx_submission_part_results_submission ON submission_part_results(submission_id);

