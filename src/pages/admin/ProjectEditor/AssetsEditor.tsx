import { useMemo, useState } from 'react';
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
  const [assetList, setAssetList] = useState<ProjectAsset[]>(assets);
  const [message, setMessage] = useState('');
  const nextIndex = useMemo(() => assetList.length + 1, [assetList.length]);

  const handleAddAsset = () => {
    const newAsset: ProjectAsset = {
      id: `asset-${Date.now()}`,
      label: `נכס חדש ${nextIndex}`,
      description: 'דמו לנכס חדש, ניתן לערוך ולסמן חובה.',
      required: false,
      type: 'code',
    };
    setAssetList((prev) => [...prev, newAsset]);
    setMessage('נוסף נכס חדש לרשימת ההגשה.');
  };

  const handleEditAsset = (assetId: string) => {
    const asset = assetList.find((item) => item.id === assetId);
    if (!asset) return;

    const newLabel = window.prompt('שם הנכס', asset.label);
    if (newLabel === null) return;

    setAssetList((prev) => prev.map((item) => (item.id === assetId ? { ...item, label: newLabel || item.label } : item)));
    setMessage('פרטי הנכס עודכנו (דמו).');
  };

  const handleToggleRequired = (assetId: string) => {
    setAssetList((prev) => prev.map((item) => (item.id === assetId ? { ...item, required: !item.required } : item)));
    setMessage('עודכן האם הנכס חובה או אופציונלי.');
  };

  const handleDeleteAsset = (assetId: string) => {
    setAssetList((prev) => prev.filter((item) => item.id !== assetId));
    setMessage('הנכס הוסר מהרשימה (דמו).');
  };

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>נכסי הגשה</CardTitle>
          <CardDescription>העלאת קבצים וקישורים עם הגדרות חובה/אופציונלי.</CardDescription>
        </div>
        <Button variant="secondary" onClick={handleAddAsset}>
          הוספת נכס
        </Button>
      </div>
      {message && <div className="text-sm text-emerald-700">{message}</div>}
      <ul className="space-y-2 text-sm text-slate-700">
        {assetList.map((asset) => (
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
              <Button variant="ghost" onClick={() => handleEditAsset(asset.id)}>
                עריכה
              </Button>
              <Button variant="ghost" onClick={() => handleToggleRequired(asset.id)}>
                החלפת חובה
              </Button>
              <Button variant="ghost" className="text-red-600" onClick={() => handleDeleteAsset(asset.id)}>
                מחיקה
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
