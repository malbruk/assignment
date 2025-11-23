import { useParams } from 'react-router-dom';
import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { AssetUploader } from '../../components/submission/AssetUploader';
import { CustomFieldsForm } from '../../components/forms/CustomFieldsForm';
import { Button } from '../../components/ui/Button';
import { useProject } from '../../hooks/useProjects';

export default function SubmissionEditor() {
  const { projectId } = useParams();
  const { data: project } = useProject(projectId);

  if (!project) return <p>טוען...</p>;

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>הגשת פרויקט</CardTitle>
        <CardDescription>העלו את הקבצים הנדרשים ומלאו שדות נוספים לשמירת טיוטה או שליחה.</CardDescription>
      </Card>
      <Card className="space-y-6">
        <section className="space-y-2">
          <h3 className="text-lg font-semibold text-slate-900">קבצים</h3>
          <AssetUploader assets={project.assets} />
        </section>
        {project.customFields.length ? (
          <section className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">שדות נוספים</h3>
            <CustomFieldsForm fields={project.customFields} />
          </section>
        ) : null}
        <div className="flex gap-3">
          <Button variant="secondary">שמירת טיוטה</Button>
          <Button>שליחת הגשה</Button>
        </div>
      </Card>
    </div>
  );
}
