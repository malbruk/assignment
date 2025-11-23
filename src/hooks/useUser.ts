const mockUser = {
  id: 'student-1',
  name: 'דנה כהן',
  role: 'student' as const,
  organizationId: 'org-1',
};

export function useUser() {
  return mockUser;
}
