import { ProjectAsset } from '../../../types/project';
import { Card, CardDescription, CardTitle } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';

const assetTypeLabels: Record<ProjectAsset['type'], string> = {
  code: 'קוד',
  report: 'דוח',
  video: 'וידאו',
  demo_url: 'קישור דמו',
};

export function AssetsEditor({ assets }: { assets: ProjectAsset[] }) {
  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>נכסי הגשה</CardTitle>
          <CardDescription>העלאת קבצים וקישורים עם הגדרות חובה/אופציונלי.</CardDescription>
        </div>
        <Button variant="secondary">הוספת נכס</Button>
      </div>
      <ul className="space-y-2 text-sm text-slate-700">
        {assets.map((asset) => (
          <li key={asset.id} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-slate-900">
                <span className="font-medium">{asset.label}</span>
                <Badge tone="default">{assetTypeLabels[asset.type]}</Badge>
                <Badge tone={asset.required ? 'warning' : 'default'}>{asset.required ? 'חובה' : 'אופציונלי'}</Badge>
              </div>
              <p className="text-xs text-slate-600">{asset.description ?? 'תיאור קצר של הדרישות לקובץ זה.'}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="ghost">עריכה</Button>
              <Button variant="ghost" className="text-red-600">
                מחיקה
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
