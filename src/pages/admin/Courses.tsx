import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { SimpleTable } from '../../components/tables/SimpleTable';
import { Button } from '../../components/ui/Button';

const mockCourses = [
  { id: 'c1', name: 'למידת מכונה', description: 'סמסטר ב' },
  { id: 'c2', name: 'פיתוח מערכות', description: 'סמסטר א' },
];

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <Card className="flex items-center justify-between">
        <div>
          <CardTitle>קורסים</CardTitle>
          <CardDescription>ניהול קורסים זמינים להקצאת פרויקטים.</CardDescription>
        </div>
        <Button>הוספת קורס</Button>
      </Card>
      <SimpleTable
        data={mockCourses}
        columns={[
          { header: 'שם', accessor: (row) => row.name },
          { header: 'תיאור', accessor: (row) => row.description },
          { header: 'עריכה', accessor: () => <Button variant="ghost">עריכה</Button> },
        ]}
      />
    </div>
  );
}
