export interface Task {
  id: string;
  location: string;
  description: string;
  assignee: {
    name: string;
    avatar?: string;
  };
  reviewer: {
    name: string;
    avatar?: string;
  };
  createDate: string;
  dueDate: string;
  type: 'Regular' | 'Expedited' | 'Best Effort';
}

export const mockTasks: Task[] = [
  {
    id: 'TASK-001',
    location: 'Bangkok',
    description: 'Review and approve the quarterly financial reports. This task requires careful examination of all financial statements, balance sheets, and profit/loss reports to ensure accuracy and compliance with accounting standards.',
    assignee: {
      name: 'John Doe',
      avatar: 'JD',
    },
    reviewer: {
      name: 'Alice Johnson',
      avatar: 'AJ',
    },
    createDate: '2024-01-15',
    dueDate: '2024-02-15',
    type: 'Regular',
  },
  {
    id: 'TASK-002',
    location: 'Chiang Mai',
    description: 'Emergency server maintenance required. Critical security patches need to be applied immediately to prevent potential vulnerabilities.',
    assignee: {
      name: 'Bob Smith',
      avatar: 'BS',
    },
    reviewer: {
      name: 'Carol White',
      avatar: 'CW',
    },
    createDate: '2024-01-20',
    dueDate: '2024-01-22',
    type: 'Expedited',
  },
  {
    id: 'TASK-003',
    location: 'Phuket',
    description: 'Update documentation for the new API endpoints.',
    assignee: {
      name: 'David Lee',
      avatar: 'DL',
    },
    reviewer: {
      name: 'Eve Brown',
      avatar: 'EB',
    },
    createDate: '2024-01-18',
    dueDate: '2024-03-01',
    type: 'Best Effort',
  },
  {
    id: 'TASK-004',
    location: 'Pattaya',
    description: 'Conduct user training sessions for the new CRM system. Prepare training materials and schedule sessions with all departments.',
    assignee: {
      name: 'Frank Miller',
      avatar: 'FM',
    },
    reviewer: {
      name: 'Grace Taylor',
      avatar: 'GT',
    },
    createDate: '2024-01-22',
    dueDate: '2024-02-28',
    type: 'Regular',
  },
  {
    id: 'TASK-005',
    location: 'Krabi',
    description: 'Fix critical bug in payment processing system causing transaction failures.',
    assignee: {
      name: 'Henry Wilson',
      avatar: 'HW',
    },
    reviewer: {
      name: 'Ivy Chen',
      avatar: 'IC',
    },
    createDate: '2024-01-23',
    dueDate: '2024-01-24',
    type: 'Expedited',
  },
  {
    id: 'TASK-006',
    location: 'Hua Hin',
    description: 'Optimize database queries for better performance.',
    assignee: {
      name: 'Jack Anderson',
      avatar: 'JA',
    },
    reviewer: {
      name: 'Kate Martinez',
      avatar: 'KM',
    },
    createDate: '2024-01-19',
    dueDate: '2024-03-15',
    type: 'Best Effort',
  },
  {
    id: 'TASK-007',
    location: 'Bangkok',
    description: 'Prepare monthly sales report with detailed analysis of market trends and customer behavior patterns.',
    assignee: {
      name: 'Liam Garcia',
      avatar: 'LG',
    },
    reviewer: {
      name: 'Mia Robinson',
      avatar: 'MR',
    },
    createDate: '2024-01-25',
    dueDate: '2024-02-10',
    type: 'Regular',
  },
  {
    id: 'TASK-008',
    location: 'Chiang Mai',
    description: 'Coordinate with vendors for office supplies inventory.',
    assignee: {
      name: 'Noah Clark',
      avatar: 'NC',
    },
    reviewer: {
      name: 'Olivia Lewis',
      avatar: 'OL',
    },
    createDate: '2024-01-21',
    dueDate: '2024-03-30',
    type: 'Best Effort',
  },
];
