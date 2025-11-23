import { Link } from 'react-router-dom';
import { CalendarDays, Clock, GraduationCap } from 'lucide-react';
import { Project } from '../../types/project';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Card key={project.id} className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1">
              <p className="text-xs uppercase text-slate-500">{project.course}</p>
              <h3 className="text-lg font-semibold text-slate-900">{project.name}</h3>
            </div>
            <Badge tone={project.status === 'graded' ? 'success' : project.status === 'submitted' ? 'info' : 'warning'}>
              {project.status === 'graded' ? 'דורג' : project.status === 'submitted' ? 'הוגש' : 'פתוח'}
            </Badge>
          </div>
          <p className="text-sm text-slate-600">{project.description}</p>
          <div className="flex flex-wrap gap-2 text-xs text-slate-500">
            <span className="flex items-center gap-1"><CalendarDays size={14} /> דדליין {project.dueDate}</span>
            <span className="flex items-center gap-1"><Clock size={14} /> משקל AI {project.parts[0]?.weight ?? 0}</span>
            <span className="flex items-center gap-1"><GraduationCap size={14} /> ממוצע {project.averageScore ?? '—'}</span>
          </div>
          <Button asChild>
            <Link to={`/student/projects/${project.id}`}>כניסה למשימה</Link>
          </Button>
        </Card>
      ))}
    </div>
  );
}
