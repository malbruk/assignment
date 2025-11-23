import { ProjectCustomField } from '../../types/project';

export function CustomFieldsForm({ fields }: { fields: ProjectCustomField[] }) {
  return (
    <div className="space-y-4">
      {fields.map((field) => (
        <div key={field.id} className="space-y-1">
          <label className="text-sm font-semibold text-slate-900">
            {field.label} {field.required ? <span className="text-red-500">*</span> : null}
          </label>
          {field.type === 'textarea' ? (
            <textarea className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" rows={3} placeholder="הקלידו תיאור" />
          ) : field.type === 'select' ? (
            <select className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm">
              <option value="">בחרו</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm" placeholder="ערך טקסט" />
          )}
        </div>
      ))}
    </div>
  );
}
