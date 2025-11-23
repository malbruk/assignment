import { useQuery } from '@tanstack/react-query';
import { getAppealForSubmission, getSubmissionById, getSubmissionByProject } from '../lib/api/submissions';

export function useSubmissionByProject(projectId?: string) {
  return useQuery({
    queryKey: ['submission', 'project', projectId],
    queryFn: () => getSubmissionByProject(projectId ?? ''),
    enabled: !!projectId,
  });
}

export function useSubmission(submissionId?: string) {
  return useQuery({ queryKey: ['submission', submissionId], queryFn: () => getSubmissionById(submissionId ?? ''), enabled: !!submissionId });
}

export function useAppeal(submissionId?: string) {
  return useQuery({
    queryKey: ['appeal', submissionId],
    queryFn: () => getAppealForSubmission(submissionId ?? ''),
    enabled: !!submissionId,
  });
}
