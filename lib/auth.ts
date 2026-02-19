export interface User {
  id: string;
  username: string;
  name: string;
  role: 'admin' | 'supervisor' | 'user';
}

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    name: 'Admin',
    role: 'admin',
  },
  {
    id: '2',
    username: 'johndoe',
    name: 'John Doe',
    role: 'supervisor',
  },
  {
    id: '3',
    username: 'alice',
    name: 'Alice',
    role: 'user',
  },
];

export function authenticateUser(username: string, password: string): User | null {
  // Simple mock authentication - any password works
  const user = mockUsers.find(u => u.username.toLowerCase() === username.toLowerCase());
  return user || null;
}
