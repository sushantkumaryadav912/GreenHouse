import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AppNavigator from './';
export default function App() {
  
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}
