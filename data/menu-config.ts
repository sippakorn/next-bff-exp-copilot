export interface MenuItem {
  id: string;
  label: string;
  icon?: string;
  path?: string;
  children?: MenuItem[];
  roles: string[];
}

export const menuConfig: MenuItem[] = [
  {
    id: 'my-task',
    label: 'My Task',
    path: '/dashboard',
    roles: ['admin', 'supervisor', 'user'],
  },
  {
    id: 'task-history',
    label: 'Task History',
    path: '/task-history',
    roles: ['admin', 'supervisor', 'user'],
  },
  {
    id: 'quick-actions',
    label: 'Quick Actions',
    roles: ['admin', 'supervisor', 'user'],
    children: [
      {
        id: 'template-checkout',
        label: 'Template Checkout',
        path: '/quick-actions/template-checkout',
        roles: ['admin', 'supervisor', 'user'],
      },
      {
        id: 'clone-task',
        label: 'Clone Task',
        path: '/quick-actions/clone-task',
        roles: ['admin', 'supervisor', 'user'],
      },
      {
        id: 'pending-task',
        label: 'Pending Task',
        path: '/quick-actions/pending-task',
        roles: ['admin', 'supervisor', 'user'],
      },
      {
        id: 'closed-task',
        label: 'Closed Task',
        path: '/quick-actions/closed-task',
        roles: ['admin', 'supervisor', 'user'],
      },
    ],
  },
  {
    id: 'settings',
    label: 'Settings',
    path: '/settings',
    roles: ['admin', 'supervisor'],
  },
];

export function filterMenuByRole(menu: MenuItem[], userRole: string): MenuItem[] {
  return menu
    .filter(item => item.roles.includes(userRole))
    .map(item => {
      if (item.children) {
        return {
          ...item,
          children: filterMenuByRole(item.children, userRole),
        };
      }
      return item;
    });
}
