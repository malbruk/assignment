import { Link } from 'react-router-dom';
import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { SimpleTable } from '../../components/tables/SimpleTable';
import { projects } from '../../utils/mockData';
import { Button } from '../../components/ui/Button';

export default function CoordinatorProjects() {
  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>פרויקטים בארגון</CardTitle>
        <CardDescription>פילוחים לפי קורס וסטטוסים.</CardDescription>
      </Card>
      <SimpleTable
        data={projects}
        columns={[
          { header: 'פרויקט', accessor: (row) => row.name },
          { header: 'קורס', accessor: (row) => row.course },
          { header: 'דדליין', accessor: (row) => row.dueDate },
          { header: 'ממוצע', accessor: (row) => row.averageScore ?? '—' },
          {
            header: 'כניסה',
            accessor: (row) => (
              <Button asChild variant="ghost" className="text-blue-700">
                <Link to={`/coordinator/projects/${row.id}/submissions`}>לצפייה</Link>
              </Button>
            ),
          },
        ]}
      />
    </div>
  );
}
