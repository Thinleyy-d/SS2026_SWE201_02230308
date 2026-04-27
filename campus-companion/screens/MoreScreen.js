import React from 'react';
import { View, Text, StyleSheet, FlatList, Linking, TouchableOpacity } from 'react-native';
import { announcementsData } from '../data/contactsData';

// More screen - displays campus announcements and useful links
export default function MoreScreen() {
  // Render each announcement
  const renderAnnouncement = ({ item }) => (
    <View style={styles.announcementCard}>
      <Text style={styles.announcementTitle}>{item.title}</Text>
      <Text style={styles.announcementDate}>{item.date}</Text>
      <Text style={styles.announcementDescription}>{item.description}</Text>
    </View>
  );

  // Open external links
  const openLink = (url) => {
    Linking.openURL(url);
  };

  return (
    <FlatList
      data={announcementsData}
      renderItem={renderAnnouncement}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={
        <>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Campus Life</Text>
            <Text style={styles.headerSubtitle}>Stay updated with campus news</Text>
          </View>

          {/* Useful Links Section */}
          <View style={styles.linksSection}>
            <Text style={styles.sectionTitle}>🔗 Useful Links</Text>
            <TouchableOpacity 
              style={styles.linkButton}
              onPress={() => openLink('https://www.google.com/maps/search/universities+near+me')}
            >
              <Text style={styles.linkText}>🗺️ Campus Map & Directions</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.linkButton}
              onPress={() => openLink('https://www.google.com')}
            >
              <Text style={styles.linkText}>📚 Online Library Portal</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.linkButton}
              onPress={() => openLink('https://www.google.com')}
            >
              <Text style={styles.linkText}>💻 Student Portal Login</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.announcementsHeader}>
            <Text style={styles.sectionTitle}>📢 Recent Announcements</Text>
          </View>
        </>
      }
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
    />
  );
}

const styles = StyleSheet.create({
  container: {
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
  linksSection: {
    padding: 20,
    backgroundColor: '#ffffff',
    marginBottom: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  linkButton: {
    backgroundColor: '#e8f4fd',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  linkText: {
    fontSize: 16,
    color: '#2980b9',
    fontWeight: '500',
  },
  announcementsHeader: {
    padding: 20,
    paddingBottom: 10,
  },
  announcementCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  announcementTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  announcementDate: {
    fontSize: 12,
    color: '#3498db',
    marginBottom: 10,
    fontWeight: '600',
  },
  announcementDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
});