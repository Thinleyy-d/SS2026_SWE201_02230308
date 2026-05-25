import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useTasks } from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';
import Loading from '../components/Loading';
import useStore from '../store/useStore';

export default function TaskListScreen({ navigation }) {
  const { tasks, loading, error, fetchTasks } = useTasks();
  const logout = useStore(state => state.logout);
  const [filter, setFilter] = useState('all');

  const handleLogout = () => {
    Alert.alert('Logout', 'Are you sure?', [
      { text: 'Cancel' },
      { text: 'Logout', onPress: async () => {
        await logout();
        navigation.replace('Login');
      }}
    ]);
  };

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(task => task.status === filter);

  if (loading && tasks.length === 0) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>My Tasks</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Filter Buttons */}
      <View style={styles.filterContainer}>
        {['all', 'todo', 'in_progress', 'done'].map(status => (
          <TouchableOpacity
            key={status}
            style={[styles.filterButton, filter === status && styles.filterButtonActive]}
            onPress={() => setFilter(status)}
          >
            <Text style={[styles.filterText, filter === status && styles.filterTextActive]}>
              {status.replace('_', ' ')}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Error Message */}
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <TouchableOpacity onPress={fetchTasks}>
            <Text style={styles.retryText}>Retry</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* Task List */}
      <FlatList
        data={filteredTasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
          <TaskCard 
            task={item} 
            onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No tasks found</Text>
            <Text style={styles.emptySubtext}>Create your first task!</Text>
          </View>
        }
        refreshing={loading}
        onRefresh={fetchTasks}
      />

      {/* Add Button */}
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('TaskForm')}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  logoutText: {
    color: '#FF3B30',
    fontSize: 16
  },
  filterContainer: {
    flexDirection: 'row',
    padding: 12,
    backgroundColor: 'white'
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f0f0f0'
  },
  filterButtonActive: {
    backgroundColor: '#007AFF'
  },
  filterText: {
    color: '#666',
    textTransform: 'capitalize'
  },
  filterTextActive: {
    color: 'white',
    fontWeight: '600'
  },
  errorContainer: {
    backgroundColor: '#FFE5E5',
    padding: 12,
    margin: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  errorText: {
    color: '#FF3B30',
    flex: 1
  },
  retryText: {
    color: '#007AFF',
    fontWeight: 'bold'
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 100
  },
  emptyText: {
    fontSize: 20,
    color: '#999',
    fontWeight: '600'
  },
  emptySubtext: {
    fontSize: 14,
    color: '#ccc',
    marginTop: 8
  },
  fab: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5
  },
  fabText: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold'
  }
});