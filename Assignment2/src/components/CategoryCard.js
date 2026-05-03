import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

// Reusable component for category cards
const CategoryCard = ({ category, onPress }) => {
  return (
    <TouchableOpacity
      style={[styles.card, { backgroundColor: category.color }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={styles.icon}>{category.icon}</Text>
      <Text style={styles.name}>{category.name}</Text>
      <Text style={styles.taskCount}>{category.taskCount} tasks</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '47%',
    aspectRatio: 1,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
    elevation: 3,
  },
  icon: {
    fontSize: 48,
    marginBottom: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
    textAlign: 'center',
  },
  taskCount: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
});

export default CategoryCard;