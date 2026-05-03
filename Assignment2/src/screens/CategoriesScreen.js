import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Animated,
  StatusBar,
} from 'react-native';
import CategoryCard from '../components/CategoryCard';
import { categories } from '../data/mockData';

const CategoriesScreen = ({ navigation }) => {
  // Animation values
  const [slideAnim] = useState(new Animated.Value(50));
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Slide up and fade in animation
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleCategoryPress = (category) => {
    console.log('Category pressed:', category.name);
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      <Animated.View
        style={[
          styles.content,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }],
          },
        ]}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Subject Categories 📚</Text>
          <Text style={styles.subtitle}>Organize your studies by subject</Text>
        </View>

        <FlatList
          data={categories}
          keyExtractor={(item) => item.id}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <CategoryCard
              category={item}
              onPress={() => handleCategoryPress(item)}
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
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
  header: {
    padding: 20,
    paddingTop: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
  listContent: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default CategoriesScreen;