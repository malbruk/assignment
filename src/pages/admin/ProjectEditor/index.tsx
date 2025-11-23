import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, CardDescription, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { projects } from '../../../utils/mockData';
import { AssetsEditor } from './AssetsEditor';
import { PartsEditor } from './PartsEditor';
import { RubricsEditor } from './RubricsEditor';
import { AgentsEditor } from './AgentsEditor';

const tabs = [
  { id: 'details', label: 'פרטי פרויקט' },
  { id: 'assets', label: 'נכסים' },
  { id: 'parts', label: 'חלקי ציון' },
  { id: 'rubrics', label: 'רובריקות' },
  { id: 'agents', label: 'Agents' },
];

function ProjectDetailsTab({
  project,
}: {
  project: (typeof projects)[number];
}) {
  return (
    <Card className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>פרטי פרויקט</CardTitle>
          <CardDescription>שם, קורס, תיאור ודדליין להגשה.</CardDescription>
        </div>
        <Button>שמירת פרטים</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm text-slate-700">
          שם פרויקט
          <input
            defaultValue={project.name}
            className="w-full rounded-lg border border-slate-200 px-3 py-2"
            placeholder="שם ברור לסטודנטים"
          />
        </label>
        <label className="space-y-1 text-sm text-slate-700">
          קורס
          <input
            defaultValue={project.course}
            className="w-full rounded-lg border border-slate-200 px-3 py-2"
            placeholder="למידת מכונה"
          />
        </label>
        <label className="space-y-1 text-sm text-slate-700 md:col-span-2">
          תיאור
          <textarea
            defaultValue={project.description}
            className="w-full rounded-lg border border-slate-200 px-3 py-2"
            rows={3}
          />
        </label>
        <label className="space-y-1 text-sm text-slate-700">
          דדליין
          <input defaultValue={project.dueDate} type="date" className="w-full rounded-lg border border-slate-200 px-3 py-2" />
        </label>
        <label className="space-y-1 text-sm text-slate-700">
          סטטוס
          <select defaultValue={project.status} className="w-full rounded-lg border border-slate-200 px-3 py-2">
            <option value="open">פתוח</option>
            <option value="submitted">הוגשו</option>
            <option value="graded">בדוק</option>
          </select>
        </label>
      </div>
      <div className="flex flex-wrap gap-3 text-sm text-slate-600">
        <span className="rounded-full bg-slate-100 px-3 py-1">הפעל בדיקות אוטומטיות</span>
        <span className="rounded-full bg-slate-100 px-3 py-1">אפשרות להגשה מחדש</span>
        <span className="rounded-full bg-slate-100 px-3 py-1">חיבור לקבוצות ארגון</span>
      </div>
    </Card>
  );
}

export default function ProjectEditorPage() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);
  const [activeTab, setActiveTab] = useState<string>('details');

  if (!project) return <p>פרויקט לא נמצא.</p>;

  return (
    <div className="space-y-6">
      <Card className="space-y-3">
        <CardTitle>עריכת פרויקט: {project.name}</CardTitle>
        <CardDescription>ערכו פרטים, נכסים, חלקים, רובריקות ו-agents.</CardDescription>
        <div className="flex flex-wrap gap-2 pt-1">
          {tabs.map((tab) => (
            <Button
              key={tab.id}
              variant={activeTab === tab.id ? 'primary' : 'secondary'}
              className="px-3 py-1"
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </Button>
          ))}
        </div>
      </Card>

      {activeTab === 'details' && <ProjectDetailsTab project={project} />}
      {activeTab === 'assets' && <AssetsEditor assets={project.assets} />}
      {activeTab === 'parts' && <PartsEditor parts={project.parts} assets={project.assets} />}
      {activeTab === 'rubrics' && <RubricsEditor />}
      {activeTab === 'agents' && <AgentsEditor />}
    </div>
  );
}
