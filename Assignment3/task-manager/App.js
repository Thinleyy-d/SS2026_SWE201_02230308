import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import TaskListScreen from './src/screens/TaskListScreen';
import TaskDetailScreen from './src/screens/TaskDetailScreen';
import TaskFormScreen from './src/screens/TaskFormScreen';
import useStore from './src/store/useStore';
import Loading from './src/components/Loading';

const Stack = createNativeStackNavigator();

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const isAuthenticated = useStore(state => state.isAuthenticated);
  const restoreSession = useStore(state => state.restoreSession);

  useEffect(() => {
    async function prepare() {
      try {
        console.log('App starting, restoring session...');
        await restoreSession();
        console.log('Session restored');
      } catch (error) {
        console.error('Session restore error:', error);
      } finally {
        setIsReady(true);
        console.log('App ready');
      }
    }

    prepare();
  }, []);

  if (!isReady) {
    return <Loading />;
  }

  console.log('Rendering App, isAuthenticated:', isAuthenticated);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!isAuthenticated ? (
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen 
              name="TaskList" 
              component={TaskListScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen 
              name="TaskDetail" 
              component={TaskDetailScreen}
              options={{ title: 'Task Details' }}
            />
            <Stack.Screen 
              name="TaskForm" 
              component={TaskFormScreen}
              options={({ route }) => ({ 
                title: route.params?.task ? 'Edit Task' : 'New Task' 
              })}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}