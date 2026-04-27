import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import { scheduleData } from '../data/contactsData';

// Schedule screen - displays weekly timetable
export default function ScheduleScreen() {
  const [selectedDay, setSelectedDay] = useState('All');
  const days = ['All', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Filter schedule based on selected day
  const filteredSchedule = selectedDay === 'All' 
    ? scheduleData 
    : scheduleData.filter(item => item.day === selectedDay);

  // Render each schedule item
  const renderScheduleItem = ({ item }) => (
    <View style={styles.scheduleCard}>
      <View style={styles.scheduleHeader}>
        <Text style={styles.dayText}>{item.day}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <Text style={styles.subjectText}>{item.subject}</Text>
      <Text style={styles.locationText}>📍 {item.location}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Weekly Schedule</Text>
        <Text style={styles.headerSubtitle}>Fall Semester 2024</Text>
      </View>

      {/* Day filter buttons - using ScrollView horizontally */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.filterScrollView}
      >
        <View style={styles.filterContainer}>
          {days.map(day => (
            <TouchableOpacity
              key={day}
              style={[
                styles.filterButton,
                selectedDay === day && styles.filterButtonActive,
              ]}
              onPress={() => setSelectedDay(day)}
            >
              <Text style={[
                styles.filterText,
                selectedDay === day && styles.filterTextActive,
              ]}>
                {day}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>

      <FlatList
        data={filteredSchedule}
        renderItem={renderScheduleItem}
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
  filterScrollView: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  filterButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#3498db',
  },
  filterText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  filterTextActive: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 16,
  },
  scheduleCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  scheduleHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  dayText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
  },
  timeText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  subjectText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#7f8c8d',
  },
});