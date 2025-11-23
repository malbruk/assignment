import { Link } from 'react-router-dom';
import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { SimpleTable } from '../../components/tables/SimpleTable';
import { Button } from '../../components/ui/Button';
import { projects } from '../../utils/mockData';

export default function AdminProjects() {
  const adminProjects = projects.map((project) => ({
    ...project,
    orgUsage: project.id === 'proj-1' ? 4 : 2,
    status: project.status === 'open' ? 'פעיל' : 'לא פעיל',
  }));

  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>פרויקטי אדמין</CardTitle>
            <CardDescription>ניהול יצירת פרויקטים, עדכון תצורה ורובריקות.</CardDescription>
          </div>
          <div className="flex gap-2">
            <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
              <option>כל הקורסים</option>
              <option>למידת מכונה</option>
              <option>פיתוח מערכות</option>
            </select>
            <select className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700">
              <option>כל המצבים</option>
              <option>פעיל</option>
              <option>לא פעיל</option>
            </select>
            <Button>יצירת פרויקט חדש</Button>
          </div>
        </div>
        <div className="text-sm text-slate-600">הצג זמינות קורסים, סטטוס ונתוני שימוש בארגונים.</div>
      </Card>
      <SimpleTable
        data={adminProjects}
        columns={[
          { header: 'שם', accessor: (row) => row.name },
          { header: 'קורס', accessor: (row) => row.course },
          { header: 'דדליין', accessor: (row) => row.dueDate },
          { header: 'מצב', accessor: (row) => row.status },
          { header: 'שימושים בארגונים', accessor: (row) => row.orgUsage },
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
