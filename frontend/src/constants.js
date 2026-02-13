
export const TaskStatus = {
  OPEN: 'Open',
  COMPLETED: 'Completed'
};

export const INITIAL_TASKS = [
  { id: 1, task: 'Define Q4 marketing objectives', owner: 'Alex Rivera', dueDate: '2024-11-20', status: 'Open' },
  { id: 2, task: 'Sync with design team on landing page', owner: 'Jamie Smith', dueDate: '2024-11-15', status: 'Completed' },
  { id: 3, task: 'Prepare budget spreadsheet', owner: 'Alex Rivera', dueDate: '2024-11-25', status: 'Open' }
];

export const INITIAL_HISTORY = [
  { id: 1, title: 'Weekly Sprint Sync', date: 'Oct 28, 2024', tasks: 4 },
  { id: 2, title: 'Product Launch Brainstorm', date: 'Oct 25, 2024', tasks: 8 },
  { id: 3, title: 'Client Feedback Session', date: 'Oct 22, 2024', tasks: 3 },
  { id: 4, title: 'Budget Planning Review', date: 'Oct 15, 2024', tasks: 5 },
  { id: 5, title: 'Daily Standup - Monday', date: 'Oct 14, 2024', tasks: 2 }
];
