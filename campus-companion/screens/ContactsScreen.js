import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { contactsData } from '../data/contactsData';

// Contacts screen - displays list of all contacts
export default function ContactsScreen({ navigation }) {
  const [selectedId, setSelectedId] = useState(null);

  // Render each contact item in the list
  const renderContactItem = ({ item }) => {
    // Dynamic styling: highlight selected contact
    const isSelected = selectedId === item.id;
    
    return (
      <TouchableOpacity
        style={[styles.contactItem, isSelected && styles.selectedContact]}
        onPress={() => {
          setSelectedId(item.id); // Update selected contact (dynamic style)
          navigation.navigate('ContactDetails', { contact: item }); // Pass data to details screen
        }}
      >
        <View style={styles.contactInfo}>
          <Text style={[styles.contactName, isSelected && styles.selectedText]}>
            {item.name}
          </Text>
          <Text style={[styles.contactRole, isSelected && styles.selectedText]}>
            {item.role}
          </Text>
        </View>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Campus Contacts</Text>
        <Text style={styles.headerSubtitle}>Tap on any contact for details</Text>
      </View>
      <FlatList
        data={contactsData}
        renderItem={renderContactItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#3498db',
    padding: 20,
    paddingTop: 30,
    paddingBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#ffffff',
    marginTop: 5,
    opacity: 0.9,
  },
  listContainer: {
    padding: 16,
  },
  contactItem: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  selectedContact: {
    backgroundColor: '#3498db', // Dynamic style: changes color when selected
    transform: [{ scale: 1.02 }],
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  contactRole: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  selectedText: {
    color: '#ffffff', // White text when selected
  },
  arrow: {
    fontSize: 20,
    color: '#3498db',
    fontWeight: 'bold',
  },
});