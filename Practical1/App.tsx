import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const Stack = createNativeStackNavigator();

function MainScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Main Screen</Text>
      <Text style={styles.text}>This is my main screen.</Text>
      <Button
        title="See Contact Info"
        onPress={() => navigation.navigate('Contact')}
      />
    </View>
  );
}

function ContactScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Contact Screen</Text>
      <Text style={styles.text}>02230308.cst@rub.edu.bt</Text>
      <Button
        title="Back to Main"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} />
        <Stack.Screen name="Contact" component={ContactScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#eaf4fb',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 14,
  },
  text: {
    fontSize: 15,
    textAlign: 'center',
    marginBottom: 22,
    color: '#333',
  },
});