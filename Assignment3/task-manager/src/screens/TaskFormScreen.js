import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ScrollView } from 'react-native';
import { useTasks } from '../hooks/useTasks';
import { TASK_STATUS } from '../config';

export default function TaskFormScreen({ route, navigation }) {
  const existingTask = route.params?.task;
  const isEditing = !!existingTask;
  
  const [title, setTitle] = useState(existingTask?.title || '');
  const [description, setDescription] = useState(existingTask?.description || '');
  const [status, setStatus] = useState(existingTask?.status || TASK_STATUS.TODO);
  
  const { createTask, updateTask, loading } = useTasks();

  const validate = () => {
    if (!title.trim()) {
      Alert.alert('Validation Error', 'Title is required');
      return false;
    }
    if (title.length < 3) {
      Alert.alert('Validation Error', 'Title must be at least 3 characters');
      return false;
    }
    if (!description.trim()) {
      Alert.alert('Validation Error', 'Description is required');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;

    const taskData = {
      title: title.trim(),
      description: description.trim(),
      status
    };

    let success;
    if (isEditing) {
      success = await updateTask(existingTask.id, taskData);
    } else {
      success = await createTask(taskData);
    }

    if (success) {
      Alert.alert('Success', `Task ${isEditing ? 'updated' : 'created'} successfully`);
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter task title"
          value={title}
          onChangeText={setTitle}
          maxLength={100}
        />

        <Text style={styles.label}>Description *</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Enter task description"
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          maxLength={500}
        />

        <Text style={styles.label}>Status</Text>
        <View style={styles.statusContainer}>
          {Object.values(TASK_STATUS).map(s => (
            <TouchableOpacity
              key={s}
              style={[styles.statusButton, status === s && styles.statusButtonActive]}
              onPress={() => setStatus(s)}
            >
              <Text style={[styles.statusText, status === s && styles.statusTextActive]}>
                {s.replace('_', ' ')}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={[styles.submitButton, loading && styles.submitButtonDisabled]}
          onPress={handleSubmit}
          disabled={loading}
        >
          <Text style={styles.submitButtonText}>
            {loading ? 'Saving...' : isEditing ? 'Update Task' : 'Create Task'}
          </Text>
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
  form: {
    padding: 16
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#333'
  },
  input: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#ddd'
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top'
  },
  statusContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24
  },
  statusButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#f0f0f0',
    alignItems: 'center'
  },
  statusButtonActive: {
    backgroundColor: '#007AFF'
  },
  statusText: {
    color: '#666',
    textTransform: 'capitalize'
  },
  statusTextActive: {
    color: 'white',
    fontWeight: 'bold'
  },
  submitButton: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8
  },
  submitButtonDisabled: {
    backgroundColor: '#ccc'
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  }
});