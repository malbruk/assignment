import { Button } from '../ui/Button';

export function AppealFormComponent() {
  return (
    <div className="space-y-3">
      <label className="block text-sm font-semibold text-slate-900">נימוק לערעור</label>
      <textarea className="h-32 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="תארו מדוע יש לעדכן את הציון" />
      <Button className="w-fit">שליחת ערעור</Button>
    </div>
  );
}
