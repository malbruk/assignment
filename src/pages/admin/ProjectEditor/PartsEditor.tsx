import { ProjectPart } from '../../../types/project';
import { Card, CardTitle } from '../../../components/ui/Card';

export function PartsEditor({ parts }: { parts: ProjectPart[] }) {
  return (
    <Card className="space-y-3">
      <CardTitle>חלקי ציון</CardTitle>
      <ul className="space-y-2 text-sm text-slate-700">
        {parts.map((part) => (
          <li key={part.id} className="flex justify-between rounded-lg bg-slate-50 px-3 py-2">
            <span>{part.name}</span>
            <span>משקל {part.weight}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
