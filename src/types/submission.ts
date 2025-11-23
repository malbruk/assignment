import { ProjectAsset, ProjectCustomField, ProjectPart } from './project';

export type SubmissionStatus = 'draft' | 'submitted' | 'ai_checked_pending_review' | 'graded' | 'appeal_pending';

export interface SubmissionAsset {
  asset: ProjectAsset;
  storagePath?: string;
  externalUrl?: string;
}

export interface SubmissionPartResult {
  part: ProjectPart;
  score: number;
  comment?: string;
  source: 'ai' | 'manual';
}

export interface SubmissionCriterionResult {
  criterion: string;
  score: number;
  comment?: string;
}

export interface Submission {
  id: string;
  projectId: string;
  studentId: string;
  submittedAt?: string;
  isLate?: boolean;
  lateOverride?: boolean;
  status: SubmissionStatus;
  finalScore?: number;
  finalComment?: string;
  assets: SubmissionAsset[];
  customFieldValues: Record<ProjectCustomField['id'], string>;
  partResults: SubmissionPartResult[];
  criteriaResults: SubmissionCriterionResult[];
}

export interface Appeal {
  id: string;
  submissionId: string;
  text: string;
  status: 'pending' | 'resolved';
  reviewComment?: string;
}
