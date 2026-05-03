import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  StatusBar,
  PanResponder,
  ScrollView,
} from 'react-native';

const AnimationDemoScreen = () => {
  // Animation values
  const [fadeAnim] = useState(new Animated.Value(1));
  const [scaleAnim] = useState(new Animated.Value(1));
  const [rotateAnim] = useState(new Animated.Value(0));
  const [slideAnim] = useState(new Animated.Value(0));
  
  // For draggable box
  const pan = useRef(new Animated.ValueXY()).current;

  // Gesture handler
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: Animated.event(
        [null, { dx: pan.x, dy: pan.y }],
        { useNativeDriver: false }
      ),
      onPanResponderRelease: () => {
        Animated.spring(pan, {
          toValue: { x: 0, y: 0 },
          useNativeDriver: false,
        }).start();
      },
    })
  ).current;

  // Animation 1: Fade
  const handleFade = () => {
    Animated.timing(fadeAnim, {
      toValue: fadeAnim._value === 1 ? 0.2 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Animation 2: Scale
  const handleScale = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.5,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Animation 3: Rotate
  const handleRotate = () => {
    Animated.timing(rotateAnim, {
      toValue: rotateAnim._value === 0 ? 1 : 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  // Animation 4: Slide
  const handleSlide = () => {
    Animated.sequence([
      Animated.timing(slideAnim, {
        toValue: 100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Rotation interpolation
  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#6366f1" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Animation Demos 🎨</Text>
        <Text style={styles.subtitle}>Try these interactive animations</Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Fade Animation */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>1. Fade Animation</Text>
          <Animated.View
            style={[styles.animatedBox, { opacity: fadeAnim }]}
          >
            <Text style={styles.boxText}>Fade Me!</Text>
          </Animated.View>
          <TouchableOpacity style={styles.button} onPress={handleFade}>
            <Text style={styles.buttonText}>Toggle Fade</Text>
          </TouchableOpacity>
        </View>

        {/* Scale Animation */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>2. Scale (Bounce) Animation</Text>
          <Animated.View
            style={[
              styles.animatedBox,
              styles.scaleBox,
              { transform: [{ scale: scaleAnim }] },
            ]}
          >
            <Text style={styles.boxText}>Bounce!</Text>
          </Animated.View>
          <TouchableOpacity style={styles.button} onPress={handleScale}>
            <Text style={styles.buttonText}>Bounce</Text>
          </TouchableOpacity>
        </View>

        {/* Rotate Animation */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>3. Rotate Animation</Text>
          <Animated.View
            style={[
              styles.animatedBox,
              styles.rotateBox,
              { transform: [{ rotate: rotation }] },
            ]}
          >
            <Text style={styles.boxText}>Spin! 🔄</Text>
          </Animated.View>
          <TouchableOpacity style={styles.button} onPress={handleRotate}>
            <Text style={styles.buttonText}>Rotate</Text>
          </TouchableOpacity>
        </View>

        {/* Slide Animation */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>4. Slide Animation</Text>
          <Animated.View
            style={[
              styles.animatedBox,
              styles.slideBox,
              { transform: [{ translateX: slideAnim }] },
            ]}
          >
            <Text style={styles.boxText}>Slide →</Text>
          </Animated.View>
          <TouchableOpacity style={styles.button} onPress={handleSlide}>
            <Text style={styles.buttonText}>Slide</Text>
          </TouchableOpacity>
        </View>

        {/* Draggable Element */}
        <View style={styles.demoSection}>
          <Text style={styles.demoTitle}>5. Drag Gesture (Try dragging!)</Text>
          <Animated.View
            {...panResponder.panHandlers}
            style={[
              styles.draggableBox,
              {
                transform: [{ translateX: pan.x }, { translateY: pan.y }],
              },
            ]}
          >
            <Text style={styles.boxText}>Drag Me! 👆</Text>
          </Animated.View>
          <Text style={styles.hintText}>Drag the box and release</Text>
        </View>
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
  subtitle: {
    fontSize: 14,
    color: '#E8EAF6',
    marginTop: 4,
  },
  content: {
    flex: 1,
  },
  demoSection: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    margin: 16,
    marginBottom: 0,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  demoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  animatedBox: {
    backgroundColor: '#6366f1',
    width: 100,
    height: 100,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 16,
  },
  scaleBox: {
    backgroundColor: '#10b981',
  },
  rotateBox: {
    backgroundColor: '#f59e0b',
  },
  slideBox: {
    backgroundColor: '#ef4444',
  },
  draggableBox: {
    backgroundColor: '#8b5cf6',
    width: 120,
    height: 120,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 12,
  },
  boxText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#333',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  hintText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    fontStyle: 'italic',
  },
});

export default AnimationDemoScreen;