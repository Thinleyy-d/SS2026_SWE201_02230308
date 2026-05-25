import { useEffect } from 'react';
import useStore from '../store/useStore';
import { taskApi, categoryApi } from '../api/taskApi';

export const useTasks = () => {
  const { 
    tasks, 
    categories, 
    loading, 
    error,
    setTasks, 
    setCategories,
    setLoading, 
    setError,
    addTask,
    updateTaskInStore,
    removeTask
  } = useStore();

  // Fetch all tasks
  const fetchTasks = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await taskApi.getTasks();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const data = await categoryApi.getCategories();
      setCategories(data);
    } catch (err) {
      console.error('Categories fetch failed:', err);
    }
  };

  // Create task
  const createTask = async (taskData) => {
    setLoading(true);
    try {
      const newTask = await taskApi.createTask(taskData);
      addTask(newTask);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Update task
  const updateTask = async (id, taskData) => {
    setLoading(true);
    try {
      const updated = await taskApi.updateTask(id, taskData);
      updateTaskInStore(id, updated);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Delete task
  const deleteTask = async (id) => {
    setLoading(true);
    try {
      await taskApi.deleteTask(id);
      removeTask(id);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  return {
    tasks,
    categories,
    loading,
    error,
    fetchTasks,
    createTask,
    updateTask,
    deleteTask
  };
};