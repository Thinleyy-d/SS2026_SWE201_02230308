import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Button, 
  ScrollView,
  useWindowDimensions 
} from 'react-native';
import Card from '../components/Card';

export default function HomeScreen({ navigation }) {
  // Get screen width and height (updates when screen rotates)
  const { width, height } = useWindowDimensions();
  
  // Check if screen is wide (like a tablet)
  const isWide = width > 700;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Main container - changes direction based on screen width */}
      <View style={[
        styles.container,
        isWide ? styles.horizontalLayout : styles.verticalLayout
      ]}>
        
        {/* Welcome Section */}
        <View style={styles.welcomeBox}>
          <Text style={styles.title}>Welcome Student! 👋</Text>
          <Text style={styles.subtitle}>
            Screen width: {Math.round(width)}px
          </Text>
          <Text style={styles.info}>
            {isWide ? '📱 Tablet mode: Horizontal layout' : '📱 Phone mode: Vertical layout'}
          </Text>
        </View>

        {/* Cards Section - uses Card component */}
        <View style={styles.cardsContainer}>
          <Card 
            title="About Me"
            description="Learn more about this app"
          />
          <Card 
            title="My Courses"
            description="View your enrolled subjects"
          />
          <Card 
            title="Grades"
            description="Check your semester results"
          />
        </View>

        {/* Navigation Button */}
        <View style={styles.buttonContainer}>
          <Button
            title="Go to My Profile"
            onPress={() => navigation.navigate('Profile')}
            color="#3498db"
          />
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
  },
  // For phone layout (vertical stacking)
  verticalLayout: {
    flexDirection: 'column',
  },
  // For tablet layout (horizontal arrangement)
  horizontalLayout: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  welcomeBox: {
    backgroundColor: '#3498db',
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    width: '100%',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    color: 'white',
    marginTop: 10,
  },
  cardsContainer: {
    flex: 1,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    marginBottom: 30,
  },
});