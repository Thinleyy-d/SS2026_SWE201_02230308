import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Animated,
  StatusBar,
} from 'react-native';

const DetailScreen = ({ route, navigation }) => {
  const { task } = route.params;
  
  // Animation values
  const [scaleAnim] = useState(new Animated.Value(0.9));
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Scale and fade animation
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const getPriorityColor = (priority) => {
    if (priority === 'High') return '#FF6B6B';
    if (priority === 'Medium') return '#FFA500';
    if (priority === 'Low') return '#4ECDC4';
    return '#666';
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />
      
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Task Details</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View
          style={[
            styles.card,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Text style={styles.title}>{task.title}</Text>

          <View style={styles.subjectBadge}>
            <Text style={styles.subjectText}>{task.subject}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Priority:</Text>
            <View
              style={[
                styles.priorityBadge,
                { backgroundColor: getPriorityColor(task.priority) },
              ]}
            >
              <Text style={styles.priorityText}>{task.priority}</Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Due Date:</Text>
            <Text style={styles.value}>{task.dueDate}</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.label}>Status:</Text>
            <Text
              style={[
                styles.value,
                { color: task.completed ? '#4CAF50' : '#FF9800' },
              ]}
            >
              {task.completed ? '✓ Completed' : '⏳ Pending'}
            </Text>
          </View>

          <View style={styles.descriptionSection}>
            <Text style={styles.sectionTitle}>Description</Text>
            <Text style={styles.description}>{task.description}</Text>
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: task.completed ? '#FF9800' : '#4CAF50' },
            ]}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    backgroundColor: '#6366f1',
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    marginBottom: 10,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  card: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  subjectBadge: {
    backgroundColor: '#E8EAF6',
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  subjectText: {
    color: '#6366f1',
    fontWeight: 'bold',
    fontSize: 14,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  label: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  priorityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  priorityText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  descriptionSection: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 15,
    color: '#666',
    lineHeight: 24,
  },
  button: {
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailScreen;