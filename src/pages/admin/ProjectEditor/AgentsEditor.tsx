import { useMemo, useState } from 'react';
import { Card, CardDescription, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

const initialAgents = [
  { id: 'agent-1', type: 'grading', template: 'llama3', trigger: 'on_submit' },
  { id: 'agent-2', type: 'plagiarism', template: 'openai', trigger: 'manual' },
];

export function AgentsEditor() {
  const [agents, setAgents] = useState(initialAgents);
  const [message, setMessage] = useState('');
  const nextIndex = useMemo(() => agents.length + 1, [agents.length]);

  const handleAddAgent = () => {
    setAgents((prev) => [
      ...prev,
      { id: `agent-${Date.now()}`, type: `agent-${nextIndex}`, template: 'openai', trigger: 'manual' },
    ]);
    setMessage('Agent חדש נוסף (דמו).');
  };

  const handleEditAgent = (agentId: string) => {
    const agent = agents.find((item) => item.id === agentId);
    if (!agent) return;

    const newType = window.prompt('סוג ה-Agent', agent.type);
    if (newType === null) return;

    setAgents((prev) => prev.map((item) => (item.id === agentId ? { ...item, type: newType || item.type } : item)));
    setMessage('עודכן סוג ה-Agent (דמו).');
  };

  const handleDeleteAgent = (agentId: string) => {
    setAgents((prev) => prev.filter((item) => item.id !== agentId));
    setMessage('Agent הוסר מהרשימה.');
  };

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>Agents</CardTitle>
          <CardDescription>אוטומציות לבדיקת קבצים ותגובה לערעורים.</CardDescription>
        </div>
        <Button variant="secondary" onClick={handleAddAgent}>
          הוספת Agent
        </Button>
      </div>
      {message && <div className="text-sm text-emerald-700">{message}</div>}
      <ul className="space-y-2 text-sm text-slate-700">
        {agents.map((agent) => (
          <li key={agent.id} className="rounded-lg border border-slate-100 bg-slate-50 px-3 py-3">
            <div className="flex items-center justify-between text-slate-900">
              <span className="font-medium">{agent.type}</span>
              <div className="text-xs text-slate-600">{agent.template} · {agent.trigger}</div>
            </div>
            <div className="flex gap-2 pt-2">
              <Button variant="ghost" onClick={() => handleEditAgent(agent.id)}>
                עריכה
              </Button>
              <Button variant="ghost" onClick={() => setMessage('Agent שוכפל (דמו).')}>
                שכפול
              </Button>
              <Button variant="ghost" className="text-red-600" onClick={() => handleDeleteAgent(agent.id)}>
                מחיקה
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
