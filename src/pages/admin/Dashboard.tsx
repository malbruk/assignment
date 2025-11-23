import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { Stat } from '../../components/ui/Stat';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>דשבורד אדמין</CardTitle>
        <CardDescription>מדדי מערכת, שימוש ב-AI וקישורים מהירים לניהול.</CardDescription>
      </Card>
      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="ארגונים" value={6} />
        <Stat label="סטודנטים" value={1200} />
        <Stat label="פרויקטים" value={42} />
        <Stat label="שימוש ב-AI" value={'82%'} />
      </div>
    </div>
  );
}
