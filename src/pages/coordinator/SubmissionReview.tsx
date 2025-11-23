import { useParams } from 'react-router-dom';
import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { useSubmission } from '../../hooks/useSubmissions';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export default function SubmissionReview() {
  const { submissionId } = useParams();
  const { data: submission } = useSubmission(submissionId);

  if (!submission) return <p>לא נמצאה הגשה.</p>;

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>לוח בדיקה</CardTitle>
        <CardDescription>צפו בקבצים, עדכנו ציוני חלקים וטפלו בערעורים.</CardDescription>
      </Card>
      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600">סטודנט</p>
            <p className="text-lg font-semibold text-slate-900">{submission.studentId}</p>
          </div>
          <Badge tone={submission.status === 'appeal_pending' ? 'warning' : 'info'}>{submission.status}</Badge>
        </div>
        <div className="rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
          <p className="font-semibold">קבצים</p>
          <ul className="list-disc space-y-1 pl-5">
            {submission.assets.map((asset) => (
              <li key={asset.asset.id}>{asset.asset.label}</li>
            ))}
          </ul>
        </div>
        <div className="space-y-2 text-sm text-slate-700">
          <p className="font-semibold">ציוני חלקים</p>
          {submission.partResults.map((part) => (
            <div key={part.part.id} className="flex justify-between rounded-lg bg-slate-50 px-3 py-2">
              <span>{part.part.name}</span>
              <span>{part.score}</span>
            </div>
          ))}
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">סימון איחור</Button>
          <Button>שמירת ציון</Button>
        </div>
      </Card>
    </div>
  );
}
