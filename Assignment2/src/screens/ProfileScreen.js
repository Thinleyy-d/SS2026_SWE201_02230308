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
import { userProfile } from '../data/mockData';

const ProfileScreen = () => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  const settingsOptions = [
    { id: '1', title: 'Notifications', icon: '🔔' },
    { id: '2', title: 'Theme', icon: '🎨' },
    { id: '3', title: 'Language', icon: '🌐' },
    { id: '4', title: 'Privacy', icon: '🔒' },
    { id: '5', title: 'Help & Support', icon: '❓' },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.profileCard, { opacity: fadeAnim }]}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {userProfile.name.charAt(0)}
              </Text>
            </View>
          </View>

          <Text style={styles.name}>{userProfile.name}</Text>
          <Text style={styles.studentId}>{userProfile.studentId}</Text>

          <View style={styles.infoContainer}>
            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{userProfile.email}</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Course</Text>
              <Text style={styles.infoValue}>{userProfile.course}</Text>
            </View>

            <View style={styles.infoCard}>
              <Text style={styles.infoLabel}>Year</Text>
              <Text style={styles.infoValue}>{userProfile.year}</Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View style={[styles.settingsSection, { opacity: fadeAnim }]}>
          <Text style={styles.sectionTitle}>Settings</Text>

          {settingsOptions.map((option) => (
            <TouchableOpacity key={option.id} style={styles.settingItem}>
              <View style={styles.settingLeft}>
                <Text style={styles.settingIcon}>{option.icon}</Text>
                <Text style={styles.settingTitle}>{option.title}</Text>
              </View>
              <Text style={styles.settingArrow}>›</Text>
            </TouchableOpacity>
          ))}

          <TouchableOpacity style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: '#fff',
    margin: 16,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#6366f1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  studentId: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  infoContainer: {
    width: '100%',
  },
  infoCard: {
    backgroundColor: '#f8f9fa',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  settingsSection: {
    backgroundColor: '#fff',
    margin: 16,
    marginTop: 0,
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    color: '#333',
  },
  settingArrow: {
    fontSize: 24,
    color: '#999',
  },
  logoutButton: {
    marginTop: 20,
    backgroundColor: '#FF6B6B',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;