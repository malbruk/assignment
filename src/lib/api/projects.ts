import { projects } from '../../utils/mockData';
import { Project } from '../../types/project';

export async function getProjects(): Promise<Project[]> {
  return projects;
}

export async function getProjectById(id: string): Promise<Project | undefined> {
  return projects.find((p) => p.id === id);
}
