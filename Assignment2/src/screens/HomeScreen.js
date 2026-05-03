import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  StatusBar,
} from 'react-native';
import TaskCard from '../components/TaskCard';
import { tasks } from '../data/mockData';

const HomeScreen = ({ navigation }) => {
  // Animation value for fade effect
  const [fadeAnim] = useState(new Animated.Value(0));
  
  // Run animation when screen loads
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  // Handle task press - navigate to detail screen
  const handleTaskPress = (task) => {
    navigation.navigate('Detail', { task });
  };

  // Header component
  const ListHeader = () => (
    <View style={styles.header}>
      <Text style={styles.greeting}>Hello, Thinley! </Text>
      <Text style={styles.subtitle}>Here are your upcoming tasks</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
        <FlatList
          data={tasks}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={ListHeader}
          renderItem={({ item }) => (
            <TaskCard task={item} onPress={() => handleTaskPress(item)} />
          )}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  content: {
    flex: 1,
  },
  listContent: {
    paddingBottom: 20,
  },
  header: {
    padding: 20,
    paddingTop: 10,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});

export default HomeScreen;