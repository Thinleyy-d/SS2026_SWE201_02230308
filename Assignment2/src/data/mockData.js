// Mock data for the app - no backend needed

export const tasks = [
  {
    id: '1',
    title: 'Math Homework',
    subject: 'Mathematics',
    dueDate: '2024-05-20',
    priority: 'High',
    completed: false,
    description: 'Complete Chapter 5 exercises from page 45 to 52. Focus on quadratic equations and word problems.',
  },
  {
    id: '2',
    title: 'Chemistry Lab Report',
    subject: 'Chemistry',
    dueDate: '2024-05-22',
    priority: 'Medium',
    completed: false,
    description: 'Write lab report on the acid-base titration experiment conducted last week.',
  },
  {
    id: '3',
    title: 'English Essay',
    subject: 'English',
    dueDate: '2024-05-25',
    priority: 'Low',
    completed: true,
    description: 'Essay on "The Impact of Technology on Modern Society" - 1500 words.',
  },
  {
    id: '4',
    title: 'Physics Assignment',
    subject: 'Physics',
    dueDate: '2024-05-18',
    priority: 'High',
    completed: false,
    description: 'Solve problems related to Newton\'s laws of motion.',
  },
  {
    id: '5',
    title: 'History Project',
    subject: 'History',
    dueDate: '2024-05-28',
    priority: 'Medium',
    completed: false,
    description: 'Research project on World War II - prepare presentation slides.',
  },
];

export const categories = [
  { id: '1', name: 'Mathematics', color: '#FF6B6B', icon: '📐', taskCount: 5 },
  { id: '2', name: 'Chemistry', color: '#4ECDC4', icon: '🧪', taskCount: 3 },
  { id: '3', name: 'Physics', color: '#45B7D1', icon: '⚛️', taskCount: 4 },
  { id: '4', name: 'English', color: '#FFA07A', icon: '📚', taskCount: 2 },
  { id: '5', name: 'History', color: '#98D8C8', icon: '📜', taskCount: 3 },
  { id: '6', name: 'Computer', color: '#A8E6CF', icon: '💻', taskCount: 6 },
];

export const userProfile = {
  name: 'Thinley Dorji',
  studentId: '02230308',
  email: '02230308.cst@rub.edu.bt',
  course: 'Software Engineering',
  year: 'Second Year',
};