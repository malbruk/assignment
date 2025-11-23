import { ProjectAsset } from '../../types/project';

interface AssetUploaderProps {
  assets: ProjectAsset[];
}

export function AssetUploader({ assets }: AssetUploaderProps) {
  return (
    <div className="space-y-3">
      {assets.map((asset) => (
        <div key={asset.id} className="rounded-xl border border-dashed border-slate-300 bg-white p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-900">{asset.label}</p>
              <p className="text-xs text-slate-500">{asset.required ? 'חובה' : 'אופציונלי'} · סוג: {asset.type}</p>
            </div>
            {asset.type === 'demo_url' ? (
              <input type="url" placeholder="הדבק קישור" className="w-64 rounded-lg border border-slate-200 px-3 py-2 text-sm" />
            ) : (
              <input type="file" className="text-sm" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
