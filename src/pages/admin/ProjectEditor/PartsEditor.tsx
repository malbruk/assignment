import { useMemo, useState } from 'react';
import { ProjectAsset, ProjectPart } from '../../../types/project';
import { Card, CardDescription, CardTitle } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';

type PartWithLinks = ProjectPart & { linkedAssets?: string[] };

export function PartsEditor({ parts, assets }: { parts: ProjectPart[]; assets: ProjectAsset[] }) {
  const [partList, setPartList] = useState<PartWithLinks[]>(
    parts.map((part) => ({ ...part, linkedAssets: assets.map((asset) => asset.label) })),
  );
  const [message, setMessage] = useState('');
  const nextIndex = useMemo(() => partList.length + 1, [partList.length]);

  const handleAddPart = () => {
    const newPart: PartWithLinks = {
      id: `part-${Date.now()}`,
      name: `חלק חדש ${nextIndex}`,
      type: 'ai',
      weight: 0.2,
      linkedAssets: [],
    };
    setPartList((prev) => [...prev, newPart]);
    setMessage('נוסף חלק ציון חדש.');
  };

  const handleEditPart = (partId: string) => {
    const part = partList.find((item) => item.id === partId);
    if (!part) return;

    const newName = window.prompt('שם החלק', part.name);
    if (newName === null) return;

    setPartList((prev) => prev.map((item) => (item.id === partId ? { ...item, name: newName || item.name } : item)));
    setMessage('פרטי החלק עודכנו (דמו).');
  };

  const handleLinkAsset = (partId: string) => {
    const assetLabel = window.prompt('איזה נכס לקשר? כתבו שם נכס קיים', assets[0]?.label ?? '');
    if (!assetLabel) return;

    setPartList((prev) =>
      prev.map((item) =>
        item.id === partId ? { ...item, linkedAssets: Array.from(new Set([...(item.linkedAssets ?? []), assetLabel])) } : item,
      ),
    );
    setMessage('עודכנה רשימת הנכסים המקושרים לחלק.');
  };

  const handleDeletePart = (partId: string) => {
    setPartList((prev) => prev.filter((item) => item.id !== partId));
    setMessage('החלק הוסר מהרשימה (דמו).');
  };

  return (
    <Card className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <CardTitle>חלקי ציון</CardTitle>
          <CardDescription>חלקים, סוגי בדיקה, משקלים וקבצים מקושרים.</CardDescription>
        </div>
        <Button variant="secondary" onClick={handleAddPart}>
          הוספת חלק
        </Button>
      </div>
      {message && <div className="text-sm text-emerald-700">{message}</div>}
      <ul className="space-y-2 text-sm text-slate-700">
        {partList.map((part) => (
          <li key={part.id} className="space-y-1 rounded-lg border border-slate-100 bg-slate-50 px-3 py-3">
            <div className="flex items-center justify-between text-slate-900">
              <span className="font-medium">{part.name}</span>
              <div className="flex items-center gap-3 text-xs text-slate-600">
                <span>{part.type === 'ai' ? 'בדיקת AI' : 'בדיקה ידנית'}</span>
                <span>משקל {part.weight}</span>
              </div>
            </div>
            <div className="text-xs text-slate-600">קבצים מקושרים: {(part.linkedAssets ?? []).join(', ') || 'אין'}</div>
            <div className="flex gap-2 pt-1">
              <Button variant="ghost" onClick={() => handleEditPart(part.id)}>
                עריכה
              </Button>
              <Button variant="ghost" onClick={() => handleLinkAsset(part.id)}>
                קישור נכס
              </Button>
              <Button variant="ghost" className="text-red-600" onClick={() => handleDeletePart(part.id)}>
                מחיקה
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}
