import { useState } from 'react';
import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { SimpleTable } from '../../components/tables/SimpleTable';
import { Button } from '../../components/ui/Button';

const mockCourses = [
  { id: 'c1', name: 'למידת מכונה', description: 'סמסטר ב' },
  { id: 'c2', name: 'פיתוח מערכות', description: 'סמסטר א' },
];

export default function CoursesPage() {
  const [courses, setCourses] = useState(mockCourses);
  const [message, setMessage] = useState('');

  const handleAddCourse = () => {
    const name = window.prompt('שם הקורס החדש', 'קורס חדש');
    if (!name) return;

    setCourses((prev) => [...prev, { id: `course-${Date.now()}`, name, description: 'הוסף תיאור' }]);
    setMessage('קורס חדש נוסף לרשימה.');
  };

  const handleEditCourse = (id: string) => {
    const course = courses.find((c) => c.id === id);
    if (!course) return;

    const newName = window.prompt('עדכון שם הקורס', course.name);
    if (newName === null) return;

    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, name: newName || c.name } : c)));
    setMessage('הקורס עודכן (דמו).');
  };

  return (
    <div className="space-y-6">
      <Card className="flex items-center justify-between">
        <div>
          <CardTitle>קורסים</CardTitle>
          <CardDescription>ניהול קורסים זמינים להקצאת פרויקטים.</CardDescription>
        </div>
        <Button onClick={handleAddCourse}>הוספת קורס</Button>
      </Card>
      {message && <div className="text-sm text-emerald-700">{message}</div>}
      <SimpleTable
        data={courses}
        columns={[
          { header: 'שם', accessor: (row) => row.name },
          { header: 'תיאור', accessor: (row) => row.description },
          {
            header: 'עריכה',
            accessor: (row) => (
              <Button variant="ghost" onClick={() => handleEditCourse(row.id)}>
                עריכה
              </Button>
            ),
          },
        ]}
      />
    </div>
  );
}
