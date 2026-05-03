import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Reusable component for displaying task cards
const TaskCard = ({ task, onPress }) => {
  // Function to get color based on priority
  const getPriorityColor = (priority) => {
    if (priority === 'High') return '#FF6B6B';
    if (priority === 'Medium') return '#FFA500';
    if (priority === 'Low') return '#4ECDC4';
    return '#666';
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.cardHeader}>
        <Text style={styles.title} numberOfLines={1}>
          {task.title}
        </Text>
        <View 
          style={[
            styles.priorityBadge, 
            { backgroundColor: getPriorityColor(task.priority) }
          ]}
        >
          <Text style={styles.priorityText}>{task.priority}</Text>
        </View>
      </View>

      <Text style={styles.subject}>{task.subject}</Text>
      <Text style={styles.dueDate}>Due: {task.dueDate}</Text>

      {task.completed && (
        <View style={styles.completedBadge}>
          <Text style={styles.completedText}>✓ Completed</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  priorityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    marginLeft: 8,
  },
  priorityText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  subject: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  dueDate: {
    fontSize: 14,
    color: '#999',
  },
  completedBadge: {
    marginTop: 8,
    alignSelf: 'flex-start',
  },
  completedText: {
    color: '#4CAF50',
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default TaskCard;