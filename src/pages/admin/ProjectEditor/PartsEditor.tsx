import { ProjectAsset, ProjectPart } from '../../../types/project';
import { Card, CardDescription, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

export function PartsEditor({ parts, assets }: { parts: ProjectPart[]; assets: ProjectAsset[] }) {
  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>חלקי ציון</CardTitle>
          <CardDescription>חלקים, סוגי בדיקה, משקלים וקבצים מקושרים.</CardDescription>
        </div>
        <Button variant="secondary">הוספת חלק</Button>
      </div>
      <ul className="space-y-2 text-sm text-slate-700">
        {parts.map((part) => (
          <li key={part.id} className="space-y-1 rounded-lg border border-slate-100 bg-slate-50 px-3 py-3">
            <div className="flex items-center justify-between text-slate-900">
              <span className="font-medium">{part.name}</span>
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <span>{part.type === 'ai' ? 'בדיקת AI' : 'בדיקה ידנית'}</span>
                <span>משקל {part.weight}</span>
              </div>
            </div>
            <div className="text-xs text-slate-600">קבצים מקושרים: {assets.map((asset) => asset.label).join(', ')}</div>
            <div className="flex gap-2 pt-1">
              <Button variant="ghost">עריכה</Button>
              <Button variant="ghost">קישור נכס</Button>
              <Button variant="ghost" className="text-red-600">
                מחיקה
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
