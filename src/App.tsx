import { Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import ProjectsList from './pages/student/ProjectsList';
import ProjectPage from './pages/student/ProjectPage';
import SubmissionEditor from './pages/student/SubmissionEditor';
import SubmissionView from './pages/student/SubmissionView';
import AppealFormPage from './pages/student/AppealForm';
import CoordinatorDashboard from './pages/coordinator/Dashboard';
import CoordinatorProjects from './pages/coordinator/Projects';
import ProjectSubmissions from './pages/coordinator/ProjectSubmissions';
import SubmissionReview from './pages/coordinator/SubmissionReview';
import ReviewerTasks from './pages/reviewer/Tasks';
import ReviewPage from './pages/reviewer/ReviewPage';
import AdminDashboard from './pages/admin/Dashboard';
import CoursesPage from './pages/admin/Courses';
import AdminProjects from './pages/admin/Projects';
import ProjectEditorPage from './pages/admin/ProjectEditor';

export default function App() {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<ProjectsList />} />
        <Route path="/student/projects/:projectId" element={<ProjectPage />} />
        <Route path="/student/projects/:projectId/submit" element={<SubmissionEditor />} />
        <Route path="/student/submissions/:submissionId" element={<SubmissionView />} />
        <Route path="/student/submissions/:submissionId/appeal" element={<AppealFormPage />} />

        <Route path="/coordinator" element={<CoordinatorDashboard />} />
        <Route path="/coordinator/projects" element={<CoordinatorProjects />} />
        <Route path="/coordinator/projects/:projectId/submissions" element={<ProjectSubmissions />} />
        <Route path="/coordinator/submissions/:submissionId" element={<SubmissionReview />} />

        <Route path="/reviewer" element={<ReviewerTasks />} />
        <Route path="/reviewer/submissions/:submissionId" element={<ReviewPage />} />

        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/courses" element={<CoursesPage />} />
        <Route path="/admin/projects" element={<AdminProjects />} />
        <Route path="/admin/projects/:projectId/edit" element={<ProjectEditorPage />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AppLayout>
  );
}
