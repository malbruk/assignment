import { Card, CardTitle } from '../../../components/ui/Card';

const mockCriteria = [
  { id: 'crit-1', name: 'תפקוד', maxScore: 50 },
  { id: 'crit-2', name: 'UX', maxScore: 50 },
];

export function RubricsEditor() {
  return (
    <Card className="space-y-3">
      <CardTitle>רובריקות</CardTitle>
      <ul className="space-y-2 text-sm text-slate-700">
        {mockCriteria.map((crit) => (
          <li key={crit.id} className="flex justify-between rounded-lg bg-slate-50 px-3 py-2">
            <span>{crit.name}</span>
            <span>מקסימום {crit.maxScore}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
