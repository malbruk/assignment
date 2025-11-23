import { Link } from 'react-router-dom';
import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { SimpleTable } from '../../components/tables/SimpleTable';
import { submissions } from '../../utils/mockData';
import { Button } from '../../components/ui/Button';

export default function ReviewerTasks() {
  const pending = submissions.filter((s) => s.status !== 'graded');
  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>משימות בודק</CardTitle>
        <CardDescription>רשימת ההגשות והערעורים הממתינים לעיון.</CardDescription>
      </Card>
      <SimpleTable
        data={pending}
        columns={[
          { header: 'פרויקט', accessor: (row) => row.projectId },
          { header: 'סטטוס', accessor: (row) => row.status },
          {
            header: 'כניסה',
            accessor: (row) => (
              <Button asChild variant="ghost" className="text-blue-700">
                <Link to={`/reviewer/submissions/${row.id}`}>בדיקה</Link>
              </Button>
            ),
          },
        ]}
      />
    </div>
  );
}
