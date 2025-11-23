import { useQuery } from '@tanstack/react-query';
import { getProjectById, getProjects } from '../lib/api/projects';

export function useProjects() {
  return useQuery({ queryKey: ['projects'], queryFn: getProjects });
}

export function useProject(projectId?: string) {
  return useQuery({ queryKey: ['projects', projectId], queryFn: () => getProjectById(projectId ?? ''), enabled: !!projectId });
}
