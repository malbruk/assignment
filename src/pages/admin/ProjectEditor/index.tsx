import { useParams } from 'react-router-dom';
import { Card, CardDescription, CardTitle } from '../../../components/ui/Card';
import { projects } from '../../../utils/mockData';
import { AssetsEditor } from './AssetsEditor';
import { PartsEditor } from './PartsEditor';
import { RubricsEditor } from './RubricsEditor';
import { AgentsEditor } from './AgentsEditor';

export default function ProjectEditorPage() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId);

  if (!project) return <p>פרויקט לא נמצא.</p>;

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>עריכת פרויקט: {project.name}</CardTitle>
        <CardDescription>ערכו פרטים, נכסים, חלקים ורובריקות.</CardDescription>
      </Card>
      <div className="grid gap-4 md:grid-cols-2">
        <AssetsEditor assets={project.assets} />
        <PartsEditor parts={project.parts} />
        <RubricsEditor />
        <AgentsEditor />
      </div>
    </div>
  );
}
