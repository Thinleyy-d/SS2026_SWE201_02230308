import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';

// A simple card component that can be reused anywhere
export default function Card({ title, description }) {
  const { width } = useWindowDimensions();
  const isWide = width > 700;

  return (
    <View style={[
      styles.card,
      // On wide screens, cards have less margin
      isWide && styles.wideCard
    ]}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow
  },
  wideCard: {
    width: '48%', // Two cards side by side
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});