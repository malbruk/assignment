import { useParams } from 'react-router-dom';
import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { SubmissionSummary } from '../../components/submission/SubmissionSummary';
import { useSubmission } from '../../hooks/useSubmissions';

export default function SubmissionView() {
  const { submissionId } = useParams();
  const { data: submission } = useSubmission(submissionId);

  if (!submission) return <p>לא נמצאה הגשה.</p>;

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>פרטי הגשה</CardTitle>
        <CardDescription>סטטוס, קבצים וציון חלקים.</CardDescription>
      </Card>
      <SubmissionSummary submission={submission} />
      <Card className="space-y-3">
        <h3 className="text-lg font-semibold text-slate-900">קבצים</h3>
        <ul className="space-y-2 text-sm text-slate-700">
          {submission.assets.map((asset) => (
            <li key={asset.asset.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
              <span>{asset.asset.label}</span>
              <span className="text-xs text-blue-700">{asset.externalUrl ?? asset.storagePath}</span>
            </li>
          ))}
        </ul>
      </Card>
      <Card className="space-y-2">
        <h3 className="text-lg font-semibold text-slate-900">ציונים</h3>
        <ul className="space-y-1 text-sm text-slate-700">
          {submission.partResults.map((result) => (
            <li key={result.part.id} className="flex justify-between">
              <span>
                {result.part.name} ({result.source})
              </span>
              <span>{result.score}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}
