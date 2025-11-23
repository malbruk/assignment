import { Card, CardDescription, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

const mockAgents = [
  { id: 'agent-1', type: 'grading', template: 'llama3', trigger: 'on_submit' },
  { id: 'agent-2', type: 'plagiarism', template: 'openai', trigger: 'manual' },
];

export function AgentsEditor() {
  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>Agents</CardTitle>
          <CardDescription>אוטומציות לבדיקת קבצים ותגובה לערעורים.</CardDescription>
        </div>
        <Button variant="secondary">הוספת Agent</Button>
      </div>
      <ul className="space-y-2 text-sm text-slate-700">
        {mockAgents.map((agent) => (
          <li key={agent.id} className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-3">
            <div className="flex items-center justify-between text-slate-900">
              <span className="font-medium">{agent.type}</span>
              <div className="text-xs text-slate-600">{agent.template} · {agent.trigger}</div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="ghost">עריכה</Button>
              <Button variant="ghost">שכפול</Button>
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
