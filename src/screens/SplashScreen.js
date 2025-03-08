import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';
import { useFonts } from 'expo-font';

const SplashScreen = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    'BonaNovaSC-Bold': require('../../assets/fonts/YoungSerif-Regular.ttf'),
  });

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (fontsLoaded) {
      // Fade-in animation
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();

      // Navigate to Login after 3 seconds
      const timer = setTimeout(() => {
        navigation.replace('Login');
      }, 3000);

      // Cleanup timer on unmount
      return () => clearTimeout(timer);
    }
  }, [fontsLoaded, fadeAnim, navigation]);

  if (!fontsLoaded) {
    return null; // Prevent rendering until fonts load
  }

  return (
    <View style={styles.container}>
      <Animated.View style={{ opacity: fadeAnim }}>
        <Text style={styles.name}>Greenhouse</Text>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#040720', // Dark blue for a "green" energy vibe
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontFamily: 'BonaNovaSC-Bold', // Use the loaded font key
    fontSize: 40,
    fontWeight: '700',
    letterSpacing: 1,
    lineHeight: 60,
    color: '#A3E635', // Bright green to match the energy-saving theme
    textAlign: 'center',
  },
});

export default SplashScreen;