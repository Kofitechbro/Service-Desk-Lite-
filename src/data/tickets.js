const tickets = [
  {
    id: 'SD-001',
    title: 'Cannot connect to Wi-Fi',
    description: 'User cannot connect their laptop to the office Wi-Fi.',
    status: 'Open',
    priority: 'High',
    category: 'Network',
    requester: 'John Doe',
    createdAt: '2026-08-20',
  },
  {
    id: 'SD-002',
    title: 'Password reset request',
    description: 'User needs help resetting their account password.',
    status: 'In Progress',
    priority: 'Medium',
    category: 'Account',
    requester: 'Jane Smith',
    createdAt: '2026-08-21',
  },
  {
    id: 'SD-003',
    title: 'Printer not working',
    description: 'The printer in the finance department is not printing.',
    status: 'Resolved',
    priority: 'Low',
    category: 'Hardware',
    requester: 'Michael Mensah',
    createdAt: '2026-08-18',
  },
  {
    id: 'SD-004',
    title: 'Unable to access ERP',
    description: 'User receives an error when trying to access the ERP system.',
    status: 'Open',
    priority: 'Urgent',
    category: 'Application',
    requester: 'Sarah Adams',
    createdAt: '2026-08-22',
  },
];

export default tickets;