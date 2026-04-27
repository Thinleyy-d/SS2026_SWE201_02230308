import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, TouchableOpacity } from 'react-native';

// Contact details screen - shows complete information for a selected contact
export default function ContactDetailsScreen({ route }) {
  // Get the contact data passed from the Contacts screen
  const { contact } = route.params;

  // Function to handle phone call (opens phone dialer)
  const handleCall = () => {
    Linking.openURL(`tel:${contact.phone}`);
  };

  // Function to handle email (opens email app)
  const handleEmail = () => {
    Linking.openURL(`mailto:${contact.email}`);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.name}>{contact.name}</Text>
        <Text style={styles.role}>{contact.role}</Text>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailCard}>
          <Text style={styles.detailLabel}>📞 Phone Number</Text>
          <TouchableOpacity onPress={handleCall}>
            <Text style={styles.detailValue}>{contact.phone}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailLabel}>✉️ Email Address</Text>
          <TouchableOpacity onPress={handleEmail}>
            <Text style={styles.detailValue}>{contact.email}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.detailCard}>
          <Text style={styles.detailLabel}>📍 Office Location</Text>
          <Text style={styles.detailValue}>{contact.office}</Text>
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteText}>
            💡 Tip: Tap on phone number or email to contact directly!
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#3498db',
    padding: 30,
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  role: {
    fontSize: 18,
    color: '#ffffff',
    opacity: 0.9,
  },
  detailsContainer: {
    padding: 20,
  },
  detailCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#7f8c8d',
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  detailValue: {
    fontSize: 18,
    color: '#2c3e50',
    fontWeight: '500',
  },
  noteCard: {
    backgroundColor: '#e8f4fd',
    borderRadius: 12,
    padding: 16,
    marginTop: 10,
  },
  noteText: {
    fontSize: 14,
    color: '#2980b9',
    textAlign: 'center',
  },
});