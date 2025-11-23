import { projects } from '../../utils/mockData';
import { Project } from '../../types/project';

export async function getAdminProjects(): Promise<Project[]> {
  return projects;
}
