import { useParams } from 'react-router-dom';
import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { AppealFormComponent } from '../../components/forms/AppealForm';
import { SubmissionSummary } from '../../components/submission/SubmissionSummary';
import { useAppeal, useSubmission } from '../../hooks/useSubmissions';
import { Badge } from '../../components/ui/Badge';

export default function AppealFormPage() {
  const { submissionId } = useParams();
  const { data: submission } = useSubmission(submissionId);
  const { data: appeal } = useAppeal(submissionId);

  if (!submission) return <p>לא נמצאה הגשה.</p>;

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>ערעור על ציון</CardTitle>
        <CardDescription>צפו בציון ובתגובות ובקשו עדכון.</CardDescription>
      </Card>
      <SubmissionSummary submission={submission} />
      {appeal ? (
        <Card className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600">ערעור קיים</p>
            <p className="text-slate-900">{appeal.text}</p>
          </div>
          <Badge tone={appeal.status === 'pending' ? 'warning' : 'success'}>{appeal.status}</Badge>
        </Card>
      ) : (
        <Card>
          <AppealFormComponent />
        </Card>
      )}
    </div>
  );
}
