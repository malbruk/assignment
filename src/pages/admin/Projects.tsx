import { Link } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { SimpleTable } from '../../components/tables/SimpleTable';
import { Button } from '../../components/ui/Button';
import { projects } from '../../utils/mockData';

export default function AdminProjects() {
  const [courseFilter, setCourseFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [actionMessage, setActionMessage] = useState<string>('');
  const [adminProjects, setAdminProjects] = useState(
    projects.map((project) => ({
      ...project,
      orgUsage: project.id === 'proj-1' ? 4 : 2,
      statusLabel: project.status === 'open' ? 'פעיל' : 'לא פעיל',
    })),
  );

  const filteredProjects = useMemo(
    () =>
      adminProjects.filter((project) => {
        const matchesCourse = courseFilter === 'all' || project.course === courseFilter;
        const matchesStatus = statusFilter === 'all' || project.statusLabel === statusFilter;
        return matchesCourse && matchesStatus;
      }),
    [adminProjects, courseFilter, statusFilter],
  );

  const handleCreateProject = () => {
    const newProject = {
      id: `proj-${Date.now()}`,
      name: 'פרויקט חדש',
      course: courseFilter === 'all' ? 'למידת מכונה' : courseFilter,
      description: 'דמו להמחשת יצירה מהירה של פרויקט אדמין.',
      dueDate: '2024-12-31',
      status: 'open' as const,
      statusLabel: 'פעיל',
      averageScore: undefined,
      assets: [],
      parts: [],
      orgUsage: 0,
    };

    setAdminProjects((prev) => [...prev, newProject]);
    setActionMessage('פרויקט חדש נוסף לרשימה (דמו בלבד).');
  };

  return (
    <div className="space-y-6">
      <Card className="space-y-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>פרויקטי אדמין</CardTitle>
            <CardDescription>ניהול יצירת פרויקטים, עדכון תצורה ורובריקות.</CardDescription>
          </div>
          <div className="flex gap-2">
            <select
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700"
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
            >
              <option value="all">כל הקורסים</option>
              <option value="למידת מכונה">למידת מכונה</option>
              <option value="פיתוח מערכות">פיתוח מערכות</option>
            </select>
            <select
              className="rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">כל המצבים</option>
              <option value="פעיל">פעיל</option>
              <option value="לא פעיל">לא פעיל</option>
            </select>
            <Button onClick={handleCreateProject}>יצירת פרויקט חדש</Button>
          </div>
        </div>
        <div className="text-sm text-slate-600">הצג זמינות קורסים, סטטוס ונתוני שימוש בארגונים.</div>
        {actionMessage && <div className="text-sm text-emerald-700">{actionMessage}</div>}
      </Card>
      <SimpleTable
        data={filteredProjects}
        columns={[
          { header: 'שם', accessor: (row) => row.name },
          { header: 'קורס', accessor: (row) => row.course },
          { header: 'דדליין', accessor: (row) => row.dueDate },
          { header: 'מצב', accessor: (row) => row.statusLabel },
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
