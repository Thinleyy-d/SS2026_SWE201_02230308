import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Import all screens
import HomeScreen from '../screens/HomeScreen';
import ContactsScreen from '../screens/ContactsScreen';
import ContactDetailsScreen from '../screens/ContactDetailsScreen';
import ScheduleScreen from '../screens/ScheduleScreen';
import MoreScreen from '../screens/MoreScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack navigator for Contacts section (demonstrates nested navigation)
function ContactsStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3498db',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="ContactsList" 
        component={ContactsScreen} 
        options={{ title: 'Contacts' }}
      />
      <Stack.Screen 
        name="ContactDetails" 
        component={ContactDetailsScreen} 
        options={{ title: 'Contact Details' }}
      />
    </Stack.Navigator>
  );
}

// Main Tab Navigator
function MainTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          // Simple emoji icons for tabs (easy to understand)
          let iconEmoji;
          if (route.name === 'Home') {
            iconEmoji = '🏠';
          } else if (route.name === 'Contacts') {
            iconEmoji = '📞';
          } else if (route.name === 'Schedule') {
            iconEmoji = '📅';
          } else if (route.name === 'More') {
            iconEmoji = '📢';
          }
          return <Text style={{ fontSize: 22 }}>{iconEmoji}</Text>;
        },
        tabBarActiveTintColor: '#3498db',
        tabBarInactiveTintColor: '#7f8c8d',
        tabBarStyle: {
          paddingBottom: 5,
          paddingTop: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
        headerStyle: {
          backgroundColor: '#3498db',
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      })}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ title: 'Campus Companion' }}
      />
      <Tab.Screen 
        name="Contacts" 
        component={ContactsStackNavigator} 
        options={{ headerShown: false }}
      />
      <Tab.Screen 
        name="Schedule" 
        component={ScheduleScreen} 
      />
      <Tab.Screen 
        name="More" 
        component={MoreScreen} 
        options={{ title: 'Campus Life' }}
      />
    </Tab.Navigator>
  );
}

// Main App Navigator
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <MainTabNavigator />
    </NavigationContainer>
  );
}

// Import Text for the icon
import { Text } from 'react-native';