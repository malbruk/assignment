import { Link } from 'react-router-dom';
import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { Stat } from '../../components/ui/Stat';
import { Button } from '../../components/ui/Button';

const aiUsageByWeek = [
  { week: 'שבוע 1', percent: 42 },
  { week: 'שבוע 2', percent: 55 },
  { week: 'שבוע 3', percent: 68 },
  { week: 'שבוע 4', percent: 82 },
];

const scoreDistribution = [
  { bucket: '90-100', count: 18 },
  { bucket: '80-89', count: 24 },
  { bucket: '70-79', count: 11 },
  { bucket: '< 70', count: 6 },
];

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
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="space-y-3 lg:col-span-2">
          <div className="flex items-center justify-between">
            <CardTitle>שימוש ב-AI לפי שבוע</CardTitle>
            <CardDescription>מעקב אחר הפעלת agents אוטומטיים</CardDescription>
          </div>
          <div className="space-y-3">
            {aiUsageByWeek.map((row) => (
              <div key={row.week} className="space-y-1">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>{row.week}</span>
                  <span>{row.percent}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-blue-500"
                    style={{ width: `${row.percent}%` }}
                    aria-label={`${row.week} AI usage`}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card className="space-y-3">
          <CardTitle>התפלגות ציונים</CardTitle>
          <CardDescription>זיהוי פיזור ציונים בין הארגונים</CardDescription>
          <div className="space-y-3">
            {scoreDistribution.map((bucket) => (
              <div key={bucket.bucket} className="space-y-1">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>{bucket.bucket}</span>
                  <span>{bucket.count} הגשות</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className="h-2 rounded-full bg-emerald-500"
                    style={{ width: `${Math.min(bucket.count * 4, 100)}%` }}
                    aria-label={`${bucket.bucket} distribution`}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
      <Card className="space-y-3">
        <CardTitle>קישורים מהירים</CardTitle>
        <CardDescription>ניווט מהיר לכל פיצ'רי הניהול</CardDescription>
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <Button asChild variant="secondary" className="justify-start">
            <Link to="/admin/projects">ניהול פרויקטים</Link>
          </Button>
          <Button asChild variant="secondary" className="justify-start">
            <Link to="/admin/courses">קורסים</Link>
          </Button>
          <Button asChild variant="secondary" className="justify-start">
            <Link to="/admin">ארגונים</Link>
          </Button>
          <Button asChild variant="secondary" className="justify-start">
            <Link to="/admin/projects">תבניות Agents</Link>
          </Button>
        </div>
      </Card>
    </div>
  );
}
