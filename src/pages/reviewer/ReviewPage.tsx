import { useParams } from 'react-router-dom';
import { Card, CardDescription, CardTitle } from '../../components/ui/Card';
import { useSubmission } from '../../hooks/useSubmissions';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';

export default function ReviewPage() {
  const { submissionId } = useParams();
  const { data: submission } = useSubmission(submissionId);

  if (!submission) return <p>לא נמצאה הגשה.</p>;

  return (
    <div className="space-y-6">
      <Card>
        <CardTitle>בדיקת הגשה</CardTitle>
        <CardDescription>הערכת קריטריונים ועדכון ציון סופי.</CardDescription>
      </Card>
      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-slate-600">סטודנט</p>
            <p className="text-lg font-semibold text-slate-900">{submission.studentId}</p>
          </div>
          <Badge tone="info">בבדיקה</Badge>
        </div>
        <div className="space-y-2 text-sm text-slate-700">
          <p className="font-semibold">ציוני קריטריונים</p>
          {submission.criteriaResults.map((crit) => (
            <div key={crit.criterion} className="flex justify-between rounded-lg bg-slate-50 px-3 py-2">
              <span>{crit.criterion}</span>
              <span>{crit.score}</span>
            </div>
          ))}
        </div>
        <Button>שמירת עדכון</Button>
      </Card>
    </div>
  );
}
