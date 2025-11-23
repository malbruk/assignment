import { Submission } from '../../types/submission';
import { Badge } from '../ui/Badge';
import { Card } from '../ui/Card';

export function SubmissionSummary({ submission }: { submission: Submission }) {
  return (
    <Card className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900">סטטוס הגשה</h3>
        <Badge tone={submission.status === 'graded' ? 'success' : submission.status === 'appeal_pending' ? 'warning' : 'info'}>
          {submission.status}
        </Badge>
      </div>
      <p className="text-sm text-slate-600">הוגש ב-{submission.submittedAt ? new Date(submission.submittedAt).toLocaleString() : 'טיוטה'}</p>
      {submission.finalScore ? <p className="text-2xl font-semibold text-slate-900">ציון סופי: {submission.finalScore}</p> : null}
      {submission.finalComment ? <p className="text-sm text-slate-700">הערת בודק: {submission.finalComment}</p> : null}
    </Card>
  );
}
