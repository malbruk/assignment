import { appeals } from '../../utils/mockData';
import { Appeal } from '../../types/submission';

export async function getAppeals(): Promise<Appeal[]> {
  return appeals;
}
