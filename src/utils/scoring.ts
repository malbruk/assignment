import { Submission } from '../types/submission';

export function calculateWeightedScore(submission: Submission): number {
  if (!submission.partResults.length) return 0;
  const weighted = submission.partResults.reduce((acc, result) => acc + result.score * result.part.weight, 0);
  const totalWeight = submission.partResults.reduce((acc, result) => acc + result.part.weight, 0);
  return Math.round((weighted / totalWeight) * 100) / 100;
}
