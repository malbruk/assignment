export type AssetType = 'code' | 'report' | 'video' | 'demo_url';

export interface ProjectAsset {
  id: string;
  type: AssetType;
  label: string;
  description?: string;
  required: boolean;
}

export interface ProjectPart {
  id: string;
  name: string;
  type: 'manual' | 'ai';
  weight: number;
}

export interface ProjectCustomField {
  id: string;
  name: string;
  label: string;
  type: 'textarea' | 'select' | 'text';
  options?: string[];
  required: boolean;
}

export interface Project {
  id: string;
  name: string;
  course: string;
  description: string;
  dueDate: string;
  status: 'open' | 'submitted' | 'graded';
  averageScore?: number;
  assets: ProjectAsset[];
  parts: ProjectPart[];
  customFields: ProjectCustomField[];
}
