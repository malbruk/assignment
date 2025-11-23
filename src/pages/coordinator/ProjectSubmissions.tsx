import { Link, useParams } from 'react-router-dom';
import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { SimpleTable } from '../../components/tables/SimpleTable';
import { projects, submissions } from '../../utils/mockData';
import { Button } from '../../components/ui/Button';

export default function ProjectSubmissions() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);
  const projectSubmissions = submissions.filter((s) => s.projectId === projectId);

  if (!project) return <p>פרויקט לא נמצא</p>;

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>הגשות לפרויקט {project.name}</CardTitle>
        <CardDescription>סטטוסי הגשה, איחורים, ערעורים.</CardDescription>
      </Card>
      <SimpleTable
        data={projectSubmissions}
        columns={[
          { header: 'סטודנט', accessor: (row) => row.studentId },
          { header: 'סטטוס', accessor: (row) => row.status },
          { header: 'איחור', accessor: (row) => (row.isLate ? 'כן' : 'לא') },
          { header: 'ציון', accessor: (row) => row.finalScore ?? '—' },
          {
            header: 'בדיקה',
            accessor: (row) => (
              <Button asChild variant="ghost" className="text-blue-700">
                <Link to={`/coordinator/submissions/${row.id}`}>כניסה</Link>
              </Button>
            ),
          },
        ]}
      />
    </div>
  );
}
