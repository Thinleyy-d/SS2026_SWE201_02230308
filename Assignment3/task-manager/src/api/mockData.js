let mockTasks = [
  {
    id: '1',
    title: 'Complete Assignment',
    description: 'Finish the React Native CRUD app assignment',
    status: 'in_progress',
    categoryId: '1',
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Buy Groceries',
    description: 'Milk, bread, eggs, vegetables',
    status: 'todo',
    categoryId: '2',
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Morning Exercise',
    description: '30 minutes jogging',
    status: 'done',
    categoryId: '1',
    createdAt: new Date().toISOString()
  }
];

const mockCategories = [
  { id: '1', name: 'Personal', color: '#FF6B6B' },
  { id: '2', name: 'Work', color: '#4ECDC4' },
  { id: '3', name: 'Shopping', color: '#95E1D3' }
];

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const mockTaskApi = {
  getTasks: async () => {
    await delay(500);
    return [...mockTasks];
  },

  getTask: async (id) => {
    await delay(300);
    const task = mockTasks.find(t => t.id === id);
    if (!task) throw new Error('Task not found');
    return task;
  },

  createTask: async (taskData) => {
    await delay(500);
    const newTask = {
      ...taskData,
      id: String(Date.now()),
      createdAt: new Date().toISOString()
    };
    mockTasks.push(newTask);
    return newTask;
  },

  updateTask: async (id, taskData) => {
    await delay(500);
    const index = mockTasks.findIndex(t => t.id === id);
    if (index === -1) throw new Error('Task not found');
    
    mockTasks[index] = { ...mockTasks[index], ...taskData };
    return mockTasks[index];
  },

  deleteTask: async (id) => {
    await delay(500);
    mockTasks = mockTasks.filter(t => t.id !== id);
    return id;
  }
};

export const mockCategoryApi = {
  getCategories: async () => {
    await delay(300);
    return [...mockCategories];
  }
};