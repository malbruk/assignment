import { FileText, Film, Github, Link as LinkIcon, LucideIcon } from 'lucide-react';
import { Project } from '../../types/project';
import { Badge } from '../ui/Badge';

const assetIcons: Record<string, LucideIcon> = {
  code: Github,
  report: FileText,
  video: Film,
  demo_url: LinkIcon,
};

export function ProjectRequirements({ project }: { project: Project }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">נכסים נדרשים</h3>
      <div className="grid gap-3 md:grid-cols-2">
        {project.assets.map((asset) => {
          const Icon = assetIcons[asset.type] ?? FileText;
          return (
            <div key={asset.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-4 py-3">
              <div className="flex items-center gap-3">
                <Icon size={18} className="text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-slate-900">{asset.label}</p>
                  <p className="text-xs text-slate-500">{asset.description ?? 'העלה קובץ מתאים בהתאם להוראות'}</p>
                </div>
              </div>
              <Badge tone={asset.required ? 'warning' : 'default'}>{asset.required ? 'חובה' : 'אופציונלי'}</Badge>
            </div>
          );
        })}
      </div>
      {project.customFields.length ? (
        <div>
          <h4 className="mb-2 text-sm font-semibold text-slate-900">שדות נוספים</h4>
          <ul className="space-y-2 text-sm text-slate-700">
            {project.customFields.map((field) => (
              <li key={field.id} className="flex items-center justify-between rounded-lg bg-white px-3 py-2">
                <span>{field.label}</span>
                <Badge tone={field.required ? 'warning' : 'default'}>{field.required ? 'חובה' : 'אופציונלי'}</Badge>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}
