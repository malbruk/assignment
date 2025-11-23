import { Project } from '../types/project';
import { Appeal, Submission } from '../types/submission';

export const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'מערכת המלצות עם ML',
    course: 'למידת מכונה',
    description: 'בנו מנוע המלצות לסרטים תוך שימוש ב-Supabase Storage ו-Edge Functions.',
    dueDate: '2024-10-30',
    status: 'open',
    averageScore: 88,
    assets: [
      { id: 'asset-1', type: 'code', label: 'קוד', required: true },
      { id: 'asset-2', type: 'report', label: 'דוח מחקר', required: true },
      { id: 'asset-3', type: 'video', label: 'וידאו דמו', required: false },
      { id: 'asset-4', type: 'demo_url', label: 'קישור דמו', required: false },
    ],
    parts: [
      { id: 'part-1', name: 'AI evaluation', type: 'ai', weight: 0.5 },
      { id: 'part-2', name: 'בדיקה ידנית', type: 'manual', weight: 0.5 },
    ],
    customFields: [
      { id: 'cf-1', name: 'summary', label: 'תיאור קצר', type: 'textarea', required: true },
      { id: 'cf-2', name: 'gha', label: 'GitHub Actions', type: 'select', options: ['on', 'off'], required: false },
    ],
  },
  {
    id: 'proj-2',
    name: 'אפליקציית מובייל',
    course: 'פיתוח מערכות',
    description: 'יישום React Native עם אחסון Supabase.',
    dueDate: '2024-11-15',
    status: 'submitted',
    averageScore: 91,
    assets: [
      { id: 'asset-5', type: 'code', label: 'קוד', required: true },
      { id: 'asset-6', type: 'demo_url', label: 'קישור דמו', required: true },
    ],
    parts: [{ id: 'part-3', name: 'AI evaluation', type: 'ai', weight: 1 }],
    customFields: [],
  },
];

export const submissions: Submission[] = [
  {
    id: 'sub-1',
    projectId: 'proj-2',
    studentId: 'student-1',
    submittedAt: '2024-09-10T10:00:00Z',
    isLate: false,
    lateOverride: false,
    status: 'graded',
    finalScore: 92,
    finalComment: 'עבודה מצוינת',
    assets: [
      { asset: projects[1].assets[0], storagePath: 'submissions/sub-1/code.zip' },
      { asset: projects[1].assets[1], externalUrl: 'https://demo.app' },
    ],
    customFieldValues: {},
    partResults: [
      { part: projects[1].parts[0], score: 92, source: 'ai', comment: 'קוד תקין' },
    ],
    criteriaResults: [
      { criterion: 'תפקוד', score: 45, comment: 'עובד נהדר' },
      { criterion: 'UX', score: 47, comment: 'נגיש ומדויק' },
    ],
  },
];

export const appeals: Appeal[] = [
  {
    id: 'appeal-1',
    submissionId: 'sub-1',
    text: 'מבקשת העלאה של 3 נקודות בשל באג בחישוב.',
    status: 'pending',
    reviewComment: undefined,
  },
];
