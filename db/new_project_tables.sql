-- Schema additions for the project submission platform
-- Aligns with the existing database objects shown in the provided schema.

-- Enum-like domains
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'project_asset_type') THEN
        CREATE TYPE project_asset_type AS ENUM ('file', 'link', 'video', 'text');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'project_part_type') THEN
        CREATE TYPE project_part_type AS ENUM ('manual', 'ai');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'submission_status') THEN
        CREATE TYPE submission_status AS ENUM (
            'draft',
            'submitted',
            'ai_checked_pending_review',
            'in_review',
            'graded',
            'appeal_pending',
            'appeal_resolved'
        );
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'part_result_source') THEN
        CREATE TYPE part_result_source AS ENUM ('manual', 'ai');
    END IF;

    IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'appeal_status') THEN
        CREATE TYPE appeal_status AS ENUM ('pending', 'accepted', 'rejected');
    END IF;
END;
$$;

-- Projects
CREATE TABLE IF NOT EXISTS public.projects (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    course_id BIGINT REFERENCES public.courses(id),
    name TEXT NOT NULL,
    description TEXT,
    due_date DATE,
    organization_id BIGINT REFERENCES public.organizations(id)
);

-- Project assets
CREATE TABLE IF NOT EXISTS public.project_assets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    project_id BIGINT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    type project_asset_type NOT NULL,
    label TEXT NOT NULL,
    description TEXT,
    required BOOLEAN NOT NULL DEFAULT true,
    validations JSONB DEFAULT '{}'::jsonb
);

-- Project parts
CREATE TABLE IF NOT EXISTS public.project_parts (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    project_id BIGINT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    type project_part_type NOT NULL DEFAULT 'manual',
    weight NUMERIC(6,2) DEFAULT 1.0
);

-- Criteria per project part
CREATE TABLE IF NOT EXISTS public.project_part_criteria (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    project_part_id BIGINT NOT NULL REFERENCES public.project_parts(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    max_score NUMERIC(6,2) NOT NULL DEFAULT 100.0,
    weight NUMERIC(6,2) NOT NULL DEFAULT 1.0
);

-- Link parts to required assets
CREATE TABLE IF NOT EXISTS public.project_part_assets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    project_part_id BIGINT NOT NULL REFERENCES public.project_parts(id) ON DELETE CASCADE,
    project_asset_id BIGINT NOT NULL REFERENCES public.project_assets(id) ON DELETE CASCADE
);

-- Custom fields per project
CREATE TABLE IF NOT EXISTS public.project_custom_fields (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    project_id BIGINT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    label TEXT NOT NULL,
    type TEXT NOT NULL,
    options JSONB,
    required BOOLEAN NOT NULL DEFAULT false
);

-- Submissions
CREATE TABLE IF NOT EXISTS public.submissions (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    project_id BIGINT NOT NULL REFERENCES public.projects(id) ON DELETE CASCADE,
    subscriber_id BIGINT REFERENCES public.subscribers(id),
    organization_id BIGINT REFERENCES public.organizations(id),
    group_id BIGINT REFERENCES public.groups(id),
    submitted_at TIMESTAMPTZ,
    is_late BOOLEAN NOT NULL DEFAULT false,
    late_override BOOLEAN NOT NULL DEFAULT false,
    status submission_status NOT NULL DEFAULT 'draft',
    final_score NUMERIC(6,2),
    final_comment TEXT
);

-- Assets uploaded per submission
CREATE TABLE IF NOT EXISTS public.submission_assets (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    submission_id BIGINT NOT NULL REFERENCES public.submissions(id) ON DELETE CASCADE,
    project_asset_id BIGINT NOT NULL REFERENCES public.project_assets(id) ON DELETE CASCADE,
    storage_path TEXT,
    external_url TEXT
);

-- Custom field values per submission
CREATE TABLE IF NOT EXISTS public.submission_custom_field_values (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    submission_id BIGINT NOT NULL REFERENCES public.submissions(id) ON DELETE CASCADE,
    project_custom_field_id BIGINT NOT NULL REFERENCES public.project_custom_fields(id) ON DELETE CASCADE,
    value TEXT
);

-- Part-level scoring per submission
CREATE TABLE IF NOT EXISTS public.submission_part_results (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    submission_id BIGINT NOT NULL REFERENCES public.submissions(id) ON DELETE CASCADE,
    project_part_id BIGINT NOT NULL REFERENCES public.project_parts(id) ON DELETE CASCADE,
    score NUMERIC(6,2),
    comment TEXT,
    source part_result_source NOT NULL DEFAULT 'manual'
);

-- Criteria-level scoring per submission part
CREATE TABLE IF NOT EXISTS public.submission_criteria_results (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    submission_part_result_id BIGINT NOT NULL REFERENCES public.submission_part_results(id) ON DELETE CASCADE,
    project_part_criteria_id BIGINT NOT NULL REFERENCES public.project_part_criteria(id) ON DELETE CASCADE,
    score NUMERIC(6,2),
    comment TEXT
);

-- Appeals linked to submissions
CREATE TABLE IF NOT EXISTS public.appeals (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    submission_id BIGINT NOT NULL REFERENCES public.submissions(id) ON DELETE CASCADE,
    subscriber_id BIGINT REFERENCES public.subscribers(id),
    text TEXT NOT NULL,
    status appeal_status NOT NULL DEFAULT 'pending',
    review_comment TEXT,
    reviewed_by UUID REFERENCES auth.users(id),
    reviewed_at TIMESTAMPTZ
);

-- Useful indexes
CREATE INDEX IF NOT EXISTS submissions_project_id_idx ON public.submissions(project_id);
CREATE INDEX IF NOT EXISTS submissions_subscriber_id_idx ON public.submissions(subscriber_id);
CREATE INDEX IF NOT EXISTS submission_assets_submission_id_idx ON public.submission_assets(submission_id);
CREATE INDEX IF NOT EXISTS submission_part_results_submission_id_idx ON public.submission_part_results(submission_id);
CREATE INDEX IF NOT EXISTS submission_criteria_results_part_result_id_idx ON public.submission_criteria_results(submission_part_result_id);
