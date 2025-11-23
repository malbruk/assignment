import { Link, useNavigate, useParams } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { ProjectRequirements } from '../../components/project/ProjectRequirements';
import { useProject } from '../../hooks/useProjects';
import { useSubmissionByProject } from '../../hooks/useSubmissions';

export default function ProjectPage() {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const { data: project } = useProject(projectId);
  const { data: submission } = useSubmissionByProject(projectId);

  if (!project) return <p>טוען פרויקט...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>{project.name}</CardTitle>
          <CardDescription>{project.course}</CardDescription>
        </div>
        <Button onClick={() => navigate(-1)} variant="secondary">
          חזרה
        </Button>
      </div>
      <Card className="space-y-4">
        <p className="text-sm text-slate-700">{project.description}</p>
        <ProjectRequirements project={project} />
        <div className="flex gap-3">
          <Button asChild>
            <Link to={`/student/projects/${project.id}/submit`}>{submission ? 'עדכון הגשה' : 'הגשת פרויקט'}</Link>
          </Button>
          {submission ? (
            <Button asChild variant="secondary">
              <Link to={`/student/submissions/${submission.id}`}>צפייה בהגשה</Link>
            </Button>
          ) : null}
        </div>
      </Card>
    </div>
  );
}
