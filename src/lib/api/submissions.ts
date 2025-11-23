import { appeals, submissions } from '../../utils/mockData';
import { Appeal, Submission } from '../../types/submission';

export async function getSubmissionByProject(projectId: string): Promise<Submission | undefined> {
  return submissions.find((s) => s.projectId === projectId);
}

export async function getSubmissionById(id: string): Promise<Submission | undefined> {
  return submissions.find((s) => s.id === id);
}

export async function getAppealForSubmission(submissionId: string): Promise<Appeal | undefined> {
  return appeals.find((a) => a.submissionId === submissionId);
}
