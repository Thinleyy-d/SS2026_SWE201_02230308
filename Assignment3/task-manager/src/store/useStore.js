import { create } from 'zustand';
import AsyncStorage from '@react-native-async-storage/async-storage';

const useStore = create((set, get) => ({
  // Auth state
  user: null,
  isAuthenticated: false,
  
  // Tasks state
  tasks: [],
  categories: [],
  loading: false,
  error: null,

  // Auth actions
  login: async (email, password) => {
    try {
      console.log('Login attempt:', email); // Debug log
      
      // Simple validation
      if (!email || !password) {
        console.log('Email or password missing');
        return false;
      }

      // Create user object
      const user = { 
        email: email.trim(), 
        id: '1', 
        name: email.split('@')[0] || 'User' 
      };
      
      console.log('User created:', user); // Debug log
      
      // Save to AsyncStorage
      await AsyncStorage.setItem('user', JSON.stringify(user));
      console.log('User saved to storage'); // Debug log
      
      // Update state
      set({ user, isAuthenticated: true });
      console.log('State updated, isAuthenticated:', true); // Debug log
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  },

  logout: async () => {
    try {
      await AsyncStorage.removeItem('user');
      set({ user: null, isAuthenticated: false });
    } catch (error) {
      console.error('Logout error:', error);
    }
  },

  // Restore session
  restoreSession: async () => {
    try {
      const userStr = await AsyncStorage.getItem('user');
      console.log('Restored user:', userStr); // Debug log
      
      if (userStr) {
        const user = JSON.parse(userStr);
        set({ user, isAuthenticated: true });
      }
    } catch (error) {
      console.error('Session restore failed:', error);
    }
  },

  // Task actions
  setTasks: (tasks) => set({ tasks }),
  
  setCategories: (categories) => set({ categories }),
  
  setLoading: (loading) => set({ loading }),
  
  setError: (error) => set({ error }),

  addTask: (task) => set((state) => ({ 
    tasks: [...state.tasks, task] 
  })),

  updateTaskInStore: (id, updatedTask) => set((state) => ({
    tasks: state.tasks.map(task => 
      task.id === id ? { ...task, ...updatedTask } : task
    )
  })),

  removeTask: (id) => set((state) => ({
    tasks: state.tasks.filter(task => task.id !== id)
  })),

  // Selectors
  getTasksByStatus: (status) => {
    return get().tasks.filter(task => task.status === status);
  }
}));

export default useStore;