import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { taskApi } from '../api/taskApi';
import { useTasks } from '../hooks/useTasks';
import Loading from '../components/Loading';

export default function TaskDetailScreen({ route, navigation }) {
  const { taskId } = route.params;
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const { deleteTask } = useTasks();

  useEffect(() => {
    loadTask();
  }, [taskId]);

  const loadTask = async () => {
    try {
      const data = await taskApi.getTask(taskId);
      setTask(data);
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        { text: 'Cancel' },
        { 
          text: 'Delete', 
          style: 'destructive',
          onPress: async () => {
            const success = await deleteTask(taskId);
            if (success) {
              navigation.goBack();
            }
          }
        }
      ]
    );
  };

  if (loading) return <Loading />;
  if (!task) return <Text>Task not found</Text>;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.label}>Title</Text>
        <Text style={styles.value}>{task.title}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Description</Text>
        <Text style={styles.value}>{task.description}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.label}>Status</Text>
        <Text style={[styles.value, styles.status]}>
          {task.status.replace('_', ' ')}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={[styles.button, styles.editButton]}
          onPress={() => navigation.navigate('TaskForm', { task })}
        >
          <Text style={styles.buttonText}>Edit Task</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, styles.deleteButton]}
          onPress={handleDelete}
        >
          <Text style={styles.buttonText}>Delete Task</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  section: {
    backgroundColor: 'white',
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 8
  },
  label: {
    fontSize: 14,
    color: '#999',
    marginBottom: 4,
    fontWeight: '600'
  },
  value: {
    fontSize: 16,
    color: '#333'
  },
  status: {
    textTransform: 'capitalize',
    fontWeight: 'bold',
    color: '#007AFF'
  },
  buttonContainer: {
    padding: 16,
    gap: 12
  },
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center'
  },
  editButton: {
    backgroundColor: '#007AFF'
  },
  deleteButton: {
    backgroundColor: '#FF3B30'
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});