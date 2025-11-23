import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { Stat } from '../../components/ui/Stat';
import { SimpleTable } from '../../components/tables/SimpleTable';
import { projects, submissions } from '../../utils/mockData';

export default function CoordinatorDashboard() {
  const pendingAppeals = submissions.filter((s) => s.status === 'appeal_pending').length;

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>דשבורד רכז</CardTitle>
        <CardDescription>מדדים ופעולות על כלל הפרויקטים בארגון.</CardDescription>
      </Card>
      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="סטודנטים" value={240} />
        <Stat label="קורסים" value={12} />
        <Stat label="פרויקטים פעילים" value={projects.length} />
        <Stat label="ערעורים ממתינים" value={pendingAppeals} />
      </div>
      <Card className="space-y-3">
        <CardTitle>סטטוס הגשות אחרונות</CardTitle>
        <SimpleTable
          data={submissions}
          columns={[
            { header: 'פרויקט', accessor: (row) => projects.find((p) => p.id === row.projectId)?.name ?? '-' },
            { header: 'סטטוס', accessor: (row) => row.status },
            { header: 'ציון', accessor: (row) => row.finalScore ?? '—' },
          ]}
        />
      </Card>
    </div>
  );
}
