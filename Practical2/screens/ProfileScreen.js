import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Button, 
  ScrollView,
  useWindowDimensions,
} from 'react-native';

export default function ProfileScreen({ navigation }) {
  const { width, height } = useWindowDimensions();
  const isWide = width > 700;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={[
        styles.container,
        isWide ? styles.horizontalProfile : styles.verticalProfile
      ]}>
        
        {/* Profile Image Section */}
        <View style={[styles.imageSection, isWide && styles.imageSectionWide]}>
          <View style={styles.profileCircle}>
            <Text style={styles.avatarEmoji}>👨‍🎓</Text>
          </View>
        </View>

        {/* Profile Info Section */}
        <View style={[styles.infoSection, isWide && styles.infoSectionWide]}>
          <Text style={styles.name}>Thinleyy Dorjee</Text>
          <Text style={styles.studentId}>Student ID: 02230308</Text>
          
          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>📧 Email</Text>
            <Text style={styles.detailText}>02230308.cst@rub.edu.bt</Text>
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>📚 Course</Text>
            <Text style={styles.detailText}>Software Engineering</Text>
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>📅 Year</Text>
            <Text style={styles.detailText}>Second Year</Text>
          </View>

          <View style={styles.detailCard}>
            <Text style={styles.detailLabel}>📱 Phone</Text>
            <Text style={styles.detailText}>+975 1234 5678</Text>
          </View>

          {/* Screen info for debugging */}
          <View style={styles.screenInfo}>
            <Text style={styles.screenInfoText}>
              📱 Screen: {Math.round(width)} x {Math.round(height)}px
            </Text>
            <Text style={styles.screenInfoText}>
              🖥️ Mode: {isWide ? 'Wide Screen (Landscape/Tablet)' : 'Phone Mode (Portrait)'}
            </Text>
          </View>

          {/* Back Button */}
          <View style={styles.buttonContainer}>
            <Button
              title="← Back to Home"
              onPress={() => navigation.goBack()}
              color="#3498db"
            />
          </View>
        </View>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5', // Added background color
  },
  // Phone layout (vertical)
  verticalProfile: {
    flexDirection: 'column',
  },
  // Tablet layout (horizontal)
  horizontalProfile: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  imageSection: {
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  imageSectionWide: {
    width: '30%', // On wide screens, image takes 30%
    marginBottom: 0,
  },
  profileCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatarEmoji: {
    fontSize: 60,
  },
  infoSection: {
    flex: 1,
    width: '100%',
  },
  infoSectionWide: {
    width: '70%', // On wide screens, info takes 70%
    paddingLeft: 20,
  },
  name: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 5,
  },
  studentId: {
    fontSize: 16,
    color: '#7f8c8d',
    textAlign: 'center',
    marginBottom: 20,
  },
  detailCard: {
    backgroundColor: '#ffffff', // Changed to white for better visibility
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Added shadow for Android
  },
  detailLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
    color: '#2c3e50',
  },
  screenInfo: {
    backgroundColor: '#e8f4fd',
    padding: 12,
    borderRadius: 10,
    marginTop: 10,
    marginBottom: 20,
  },
  screenInfoText: {
    fontSize: 12,
    color: '#2980b9',
    textAlign: 'center',
    marginBottom: 3,
  },
  buttonContainer: {
    marginTop: 10,
    marginBottom: 30,
  },
});