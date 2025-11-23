import { useProjects } from '../../hooks/useProjects';
import { ProjectsGrid } from '../../components/project/ProjectsGrid';
import { Card, CardDescription, CardTitle } from '../../components/ui/Card';

export default function ProjectsList() {
  const { data: projectsData } = useProjects();

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>הפרויקטים שלי</CardTitle>
        <CardDescription>ריכוז המשימות הפתוחות וההגשות האחרונות לפי תאריך הגשה קרוב.</CardDescription>
      </Card>
      {projectsData ? <ProjectsGrid projects={projectsData} /> : <p>טוען נתונים...</p>}
    </div>
  );
}
