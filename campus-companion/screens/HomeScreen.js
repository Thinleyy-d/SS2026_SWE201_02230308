import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

// Home screen - main dashboard with navigation cards
export default function HomeScreen({ navigation }) {
  // Get current greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <ScrollView style={styles.container}>
      {/* Welcome Section */}
      <View style={styles.welcomeSection}>
        <Text style={styles.greeting}>{getGreeting()},</Text>
        <Text style={styles.title}>Campus Companion</Text>
        <Text style={styles.subtitle}>Your guide to campus life! 🎓</Text>
      </View>

      {/* Quick Actions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Access</Text>
        
        <TouchableOpacity 
          style={styles.quickCard}
          onPress={() => navigation.navigate('Contacts')}
        >
          <Text style={styles.quickIcon}>📞</Text>
          <View style={styles.quickTextContainer}>
            <Text style={styles.quickTitle}>Contacts</Text>
            <Text style={styles.quickDescription}>Find important campus contacts</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.quickCard}
          onPress={() => navigation.navigate('Schedule')}
        >
          <Text style={styles.quickIcon}>📅</Text>
          <View style={styles.quickTextContainer}>
            <Text style={styles.quickTitle}>Schedule</Text>
            <Text style={styles.quickDescription}>View your weekly timetable</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.quickCard}
          onPress={() => navigation.navigate('More')}
        >
          <Text style={styles.quickIcon}>📢</Text>
          <View style={styles.quickTextContainer}>
            <Text style={styles.quickTitle}>Announcements</Text>
            <Text style={styles.quickDescription}>Latest campus news</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Tips Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Tips for New Students</Text>
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>💡 Visit the library for study resources</Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>💡 Join student clubs to meet people</Text>
        </View>
        <View style={styles.tipCard}>
          <Text style={styles.tipText}>💡 Check announcements regularly</Text>
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
  welcomeSection: {
    backgroundColor: '#3498db',
    padding: 25,
    paddingTop: 40,
    paddingBottom: 30,
  },
  greeting: {
    fontSize: 16,
    color: '#ffffff',
    opacity: 0.9,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#ffffff',
    marginTop: 10,
    opacity: 0.9,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 15,
  },
  quickCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  quickIcon: {
    fontSize: 35,
    marginRight: 15,
  },
  quickTextContainer: {
    flex: 1,
  },
  quickTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  quickDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    marginTop: 3,
  },
  tipCard: {
    backgroundColor: '#e8f4fd',
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    color: '#2980b9',
  },
});