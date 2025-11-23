import { ProjectAsset } from '../../../types/project';
import { Card, CardTitle } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';

export function AssetsEditor({ assets }: { assets: ProjectAsset[] }) {
  return (
    <Card className="space-y-3">
      <CardTitle>נכסים</CardTitle>
      <ul className="space-y-2 text-sm text-slate-700">
        {assets.map((asset) => (
          <li key={asset.id} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2">
            <span>{asset.label}</span>
            <Badge tone={asset.required ? 'warning' : 'default'}>{asset.required ? 'חובה' : 'אופציונלי'}</Badge>
          </li>
        ))}
      </ul>
    </Card>
  );
}
