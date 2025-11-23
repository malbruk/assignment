import { Card, CardTitle } from '../../../components/ui/Card';

const mockAgents = [
  { id: 'agent-1', type: 'grading', template: 'llama3', trigger: 'on_submit' },
  { id: 'agent-2', type: 'plagiarism', template: 'openai', trigger: 'manual' },
];

export function AgentsEditor() {
  return (
    <Card className="space-y-3">
      <CardTitle>Agents</CardTitle>
      <ul className="space-y-2 text-sm text-slate-700">
        {mockAgents.map((agent) => (
          <li key={agent.id} className="flex justify-between rounded-lg bg-slate-50 px-3 py-2">
            <span>{agent.type}</span>
            <span>{agent.template} · {agent.trigger}</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}
