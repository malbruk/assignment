import { Link } from 'react-router-dom';
import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { SimpleTable } from '../../components/tables/SimpleTable';
import { Button } from '../../components/ui/Button';
import { projects } from '../../utils/mockData';

export default function AdminProjects() {
  return (
    <div className="space-y-6">
      <Card className="flex items-center justify-between">
        <div>
          <CardTitle>פרויקטי אדמין</CardTitle>
          <CardDescription>ניהול יצירת פרויקטים, עדכון תצורה ורובריקות.</CardDescription>
        </div>
        <Button>יצירת פרויקט</Button>
      </Card>
      <SimpleTable
        data={projects}
        columns={[
          { header: 'שם', accessor: (row) => row.name },
          { header: 'קורס', accessor: (row) => row.course },
          { header: 'דדליין', accessor: (row) => row.dueDate },
          { header: 'שימושים', accessor: () => 3 },
          {
            header: 'עריכה',
            accessor: (row) => (
              <Button asChild variant="ghost" className="text-blue-700">
                <Link to={`/admin/projects/${row.id}/edit`}>ניהול</Link>
              </Button>
            ),
          },
        ]}
      />
    </div>
  );
}
