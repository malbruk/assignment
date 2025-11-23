import { useMemo, useState } from 'react';
import { Card, CardDescription, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

const initialCriteria = [
  { id: 'crit-1', name: 'תפקוד', maxScore: 50, weight: 0.5 },
  { id: 'crit-2', name: 'UX', maxScore: 50, weight: 0.5 },
];

export function RubricsEditor() {
  const [criteria, setCriteria] = useState(initialCriteria);
  const [message, setMessage] = useState('');
  const nextIndex = useMemo(() => criteria.length + 1, [criteria.length]);

  const handleAddCriterion = () => {
    setCriteria((prev) => [...prev, { id: `crit-${Date.now()}`, name: `קריטריון ${nextIndex}`, maxScore: 10, weight: 0.1 }]);
    setMessage('נוסף קריטריון רובריקה חדש.');
  };

  const handleEditCriterion = (criterionId: string) => {
    const criterion = criteria.find((crit) => crit.id === criterionId);
    if (!criterion) return;

    const newName = window.prompt('שם הקריטריון', criterion.name);
    if (newName === null) return;

    setCriteria((prev) => prev.map((crit) => (crit.id === criterionId ? { ...crit, name: newName || crit.name } : crit)));
    setMessage('הקריטריון עודכן (דמו).');
  };

  const handleDeleteCriterion = (criterionId: string) => {
    setCriteria((prev) => prev.filter((crit) => crit.id !== criterionId));
    setMessage('קריטריון הוסר מהרובריקה.');
  };

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>רובריקות</CardTitle>
          <CardDescription>בחרו תבנית, ערכו קריטריונים והגדירו משקלים.</CardDescription>
        </div>
        <Button variant="secondary" onClick={handleAddCriterion}>
          הוספת קריטריון
        </Button>
      </div>
      <div className="flex flex-col gap-3">
        <label className="text-sm text-slate-700">
          תבנית קיימת
          <select className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2">
            <option>תבנית ML</option>
            <option>תבנית UX</option>
            <option>ללא תבנית</option>
          </select>
        </label>
        {message && <div className="text-sm text-emerald-700">{message}</div>}
        <ul className="space-y-2 text-sm text-slate-700">
          {criteria.map((crit) => (
            <li key={crit.id} className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-3">
              <div className="flex items-center justify-between text-slate-900">
                <span className="font-medium">{crit.name}</span>
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <span>מקסימום {crit.maxScore}</span>
                  <span>משקל {crit.weight}</span>
                  <span>Override מותר</span>
                </div>
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="ghost" onClick={() => handleEditCriterion(crit.id)}>
                  עריכה
                </Button>
                <Button variant="ghost" onClick={() => setMessage('הקריטריון הועתק (דמו).')}>
                  העתקת שורה
                </Button>
                <Button variant="ghost" className="text-red-600" onClick={() => handleDeleteCriterion(crit.id)}>
                  מחיקה
                </Button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
