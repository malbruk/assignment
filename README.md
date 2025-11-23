# Spec: React + Supabase App for Project Submission Platform

This spec combines the provided wireframes with a concise, code-ready plan so a developer can start building a React app backed by Supabase.

## 1) Wireframes (Textual)

### Student
- **Home – "הפרויקטים שלי"**: Header with logo/user/exit; grid (2–3 columns) of project cards sorted by nearest deadline. Card fields: project name, course, deadline (with relative label), status, primary button to enter; when graded show score.
- **Project Overview**: Back link; title + course subtitle; description; required assets list with type icons and required/optional labels; additional submission fields (short description, GitHub Actions select). Primary button: submit project; if already submitted: update/view submission.
- **Submission Editor**: Per-asset dropzones with validations (e.g., .py up to 1MB, video up to 50MB, demo URL textbox). Custom fields (textarea, multiselect). Buttons: save draft (secondary), submit (primary).
- **Submission View**: Status box (submitted at, on-time/late, late-override button); uploaded files (download/play); part scores with criteria breakdown; final score; appeal button when applicable.
- **Appeal Form**: Shows score + comments; large textarea; primary submit.

### Coordinator
- **Dashboard**: Org title; KPI row (students, courses, projects, appeals); two charts (submission rate by project, average scores by group); tasks list (appeals pending, submissions waiting review).
- **Projects List**: Table of all org projects with filters (course/group/status) and columns for project, course, deadline, submitted/total, average, entry.
- **Project Overview (Org Scope)**: Summary box (totals, submitted %, late, waiting for AI/review, in appeal); submissions table with student, group, status, score, review, appeal, entry.
- **Review Panel** (also for Reviewer): Two-column layout. Left: submission info, late flag toggle, files (download/play). Right: AI results with editable criteria; editable final score. Appeal box with student text and reviewer response fields (accept/reject). Primary button: save changes.

### Reviewer
- **Reviewer Tasks**: Table of pending submissions (student, project, course, status, entry). Button to open appeals list. Entry opens Review Panel.

### Admin
- **Admin Dashboard**: KPIs (orgs, students, projects, AI usage); charts (AI usage by week, score distribution); quick links (manage orgs, courses, projects, agent templates).
- **Admin Projects**: Table of all projects (name, course, deadline, org usage count, edit). Button to create new project.
- **Project Editor**: Tabs—Details (name, description, course, deadline, save); Assets (list with type/required/edit/delete, add asset); Parts (table with type/weight/linked files, add part); Rubrics (template dropdown, criteria list with max score/weight/override); Agents (list with type/template/trigger + edit/duplicate/delete).

### System
- **Login**: Logo, "Sign in with Google"; new user profile completion modal.
- **User Profile**: Editable username; email read-only; organization & group read-only for students; notification opt-in checkbox.

## 2) Supabase Schema (Tables)
- organizations (id, name)
- groups (id, name, organization_id fk)
- courses (id, name, description)
- organization_courses (id, organization_id fk, course_id fk)
- projects (id, course_id fk, name, description, due_date date)
- project_assets (id, project_id fk, type enum, label, description, required boolean)
- project_parts (id, project_id fk, name, type enum, weight float)
- project_part_assets (id, project_part_id fk, project_asset_id fk)
- project_custom_fields (id, project_id fk, name, label, type, options json, required)
- submissions (id, project_id fk, student_id, organization_id, group_id, submitted_at, is_late, late_override, status enum, final_score float, final_comment)
- submission_assets (id, submission_id fk, project_asset_id fk, storage_path, external_url)
- submission_custom_field_values (id, submission_id fk, project_custom_field_id fk, value)
- submission_part_results (id, submission_id fk, project_part_id fk, score, comment, source enum)
- submission_criteria_results (id, submission_part_result_id fk, project_part_criteria_id fk, score, comment)
- appeals (id, submission_id fk, student_id, text, status, review_comment, reviewed_by, reviewed_at)

## 3) API Spec (Front → Supabase)

### Student
- `GET /projects` (filtered by student org + courses): returns projects with due_date, calculated status, submission summary.
- `GET /projects/:id`: project details + assets + custom fields.
- `POST /submissions`: create submission, upload files to storage, persist submission_assets and custom fields.
- `GET /submissions/:id`: returns assets, AI results, part/criteria scores, comments.
- `POST /appeals`: submission_id, text.

### Coordinator
- `GET /organization/projects`: project list with KPIs (submission rate, average score).
- `GET /organization/projects/:id/submissions`: tabular submissions view.
- `PATCH /submissions/:id`: edit part/criterion scores, final score, late flag.
- `POST /appeals/:id/review`: accept/reject + score changes.

### Admin
- `GET /admin/courses`, `POST /admin/courses`.
- `GET /admin/projects`, `POST /admin/projects`, `PUT /admin/projects/:id` (including assets, parts, rubrics, agents).

## 4) React Project Structure
```
src/
  components/
    layout/
    ui/
    forms/
    tables/
    project/
    submission/
  pages/
    student/
      ProjectsList.tsx
      ProjectPage.tsx
      SubmissionEditor.tsx
      SubmissionView.tsx
      AppealForm.tsx
    coordinator/
      Dashboard.tsx
      Projects.tsx
      ProjectSubmissions.tsx
      SubmissionReview.tsx
    reviewer/
      Tasks.tsx
      ReviewPage.tsx
    admin/
      Dashboard.tsx
      Courses.tsx
      Projects.tsx
      ProjectEditor/
        AssetsEditor.tsx
        PartsEditor.tsx
        RubricsEditor.tsx
        AgentsEditor.tsx
  hooks/
    useUser.ts
    useProjects.ts
    useSubmissions.ts
  lib/
    supabaseClient.ts
    api/
      projects.ts
      submissions.ts
      appeals.ts
      admin.ts
  types/
    db.ts
    project.ts
    submission.ts
  utils/
    scoring.ts
  styles/
```

## 5) Key React Components
- Student: `ProjectsGrid`, `ProjectRequirements`, `AssetUploader`, `CustomFieldsForm`, `SubmissionSummary`, `AppealForm`.
- Coordinator: `DashboardKPIs`, `ProjectStats`, `SubmissionsTable`, `SubmissionReviewPanel`.
- Reviewer: `ReviewerTasks`, `ReviewCriteriaEditor`.
- Admin: `ProjectEditor` (with `AssetsEditor`, `PartsEditor`, `RubricTemplateSelector`, `AgentsManager`).

## 6) Flows
- **Submission**: student uploads → create submission → trigger agents via Edge Function → agents create part_results → status `ai_checked_pending_review`.
- **Manual Review**: coordinator/reviewer edits scores → recompute score → update status `graded`.
- **Appeal**: student submits appeal → status `appeal_pending` → reviewer acts (accept/reject) → update final_score → status `appeal_resolved`.

## 7) Technical Choices
React + Vite, TailwindCSS, shadcn/ui, React Query, Supabase JS SDK, Zod, react-hook-form, standard `<video />` playback with Supabase storage uploads.
