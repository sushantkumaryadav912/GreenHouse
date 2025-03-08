import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Platform,
  StatusBar,
  Animated,
  Easing,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SETTING_ITEMS = [
  { id: '1', icon: 'notifications-outline', title: 'Notifications', hasSwitch: true },
  { id: '2', icon: 'lock-closed-outline', title: 'Privacy', hasSwitch: false },
  { id: '3', icon: 'moon-outline', title: 'Dark Mode', hasSwitch: true },
  { id: '4', icon: 'color-palette-outline', title: 'Theme', hasSwitch: false },
  { id: '5', icon: 'language-outline', title: 'Language', hasSwitch: false },
  { id: '6', icon: 'cloud-outline', title: 'Backup', hasSwitch: true },
  { id: '7', icon: 'help-circle-outline', title: 'Help & Support', hasSwitch: false },
  { id: '8', icon: 'information-circle-outline', title: 'About', hasSwitch: false },
];

const SettingScreen = () => {
  // Animation values
  const headerAnimation = useRef(new Animated.Value(0)).current;
  const cardAnimation = useRef(new Animated.Value(0)).current;
  const cardRotateX = useRef(new Animated.Value(0)).current;
  const cardRotateY = useRef(new Animated.Value(0)).current;
  const buttonScale = useRef(new Animated.Value(1)).current;
  const settingsAnimation = useRef(new Animated.Value(0)).current;
  const rotationAnimation = useRef(new Animated.Value(0)).current;
  const fabAnimation = useRef(new Animated.Value(0)).current;
  
  // For individual setting items
  const itemAnimations = useRef(SETTING_ITEMS.map(() => new Animated.Value(0))).current;
  
  // Animation function
  const animateButton = () => {
    Animated.sequence([
      Animated.timing(buttonScale, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1.1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(buttonScale, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };
  
  // 3D card flip animation
  const flip3DCard = () => {
    animateButton();
    
    Animated.sequence([
      Animated.timing(cardRotateY, {
        toValue: 0.1,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(cardRotateY, {
        toValue: -0.1,
        duration: 400,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
      Animated.timing(cardRotateY, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        easing: Easing.linear,
      }),
    ]).start();
  };
  
  // Continuous rotation animation
  const startRotationAnimation = () => {
    Animated.loop(
      Animated.timing(rotationAnimation, {
        toValue: 1,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  };
  
  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    
    // Start animations
    Animated.parallel([
      Animated.timing(headerAnimation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5)),
      }),
      Animated.timing(cardAnimation, {
        toValue: 1,
        duration: 800,
        delay: 200,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5)),
      }),
      Animated.timing(settingsAnimation, {
        toValue: 1,
        duration: 800,
        delay: 400,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.2)),
      }),
      Animated.timing(fabAnimation, {
        toValue: 1,
        duration: 800,
        delay: 800,
        useNativeDriver: true,
        easing: Easing.out(Easing.back(1.5)),
      }),
      ...itemAnimations.map((anim, index) => 
        Animated.timing(anim, {
          toValue: 1,
          duration: 400,
          delay: 500 + (index * 100),
          useNativeDriver: true,
          easing: Easing.out(Easing.back(1.2)),
        })
      ),
    ]).start();
    
    // Start rotation animation for background elements
    startRotationAnimation();
    
    return () => {
      StatusBar.setBarStyle('default');
    };
  }, []);
  
  const spin = rotationAnimation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
  
  // Calculate 3D transforms
  const cardYRotation = cardRotateY.interpolate({
    inputRange: [-1, 0, 1],
    outputRange: ['-30deg', '0deg', '30deg'],
  });
  
  return (
    <View style={styles.container}>
      {/* Background elements with rotation */}
      <Animated.View style={[styles.backgroundElements, { transform: [{ rotate: spin }] }]}>
        {[...Array(5)].map((_, index) => (
          <View 
            key={index}
            style={[
              styles.backgroundShape,
              { 
                width: 80 + (index * 20),
                height: 80 + (index * 20),
                left: 40 + (index * 30),
                top: 100 + (index * 40),
                backgroundColor: `rgba(66, 133, 244, ${0.1 - (index * 0.01)})`,
              }
            ]}
          />
        ))}
      </Animated.View>
      
      {/* Header */}
      <Animated.View 
        style={[
          styles.header,
          { 
            opacity: headerAnimation,
            transform: [
              { 
                translateY: headerAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [-50, 0],
                }) 
              }
            ] 
          }
        ]}
      >
        <Text style={styles.headerTitle}>Settings</Text>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
      
      {/* Profile Card with 3D effect */}
      <Animated.View
        style={[
          styles.profileCard,
          {
            opacity: cardAnimation,
            transform: [
              { 
                translateY: cardAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [40, 0],
                }) 
              },
              { perspective: 800 },
              { rotateY: cardYRotation },
            ],
          },
        ]}
      >
        <View style={styles.profileContent}>
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage} />
            <View style={styles.profileImageOverlay} />
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>John Doe</Text>
            <Text style={styles.profileEmail}>john.doe@example.com</Text>
          </View>
        </View>
        <Animated.View 
          style={[
            styles.editButton, 
            { transform: [{ scale: buttonScale }] }
          ]}
        >
          <TouchableOpacity onPress={flip3DCard}>
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
      
      {/* Settings List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Animated.View 
          style={[
            styles.settingsContainer,
            {
              opacity: settingsAnimation,
              transform: [
                { 
                  translateY: settingsAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [100, 0],
                  }) 
                }
              ],
            }
          ]}
        >
          {SETTING_ITEMS.map((item, index) => (
            <Animated.View
              key={item.id}
              style={[
                styles.settingItem,
                {
                  opacity: itemAnimations[index],
                  transform: [
                    { 
                      translateY: itemAnimations[index].interpolate({
                        inputRange: [0, 1],
                        outputRange: [50, 0],
                      }) 
                    }
                  ],
                },
              ]}
            >
              <View style={styles.settingItemContent}>
                <View style={styles.iconContainer}>
                  <Ionicons name={item.icon} size={24} color="#fff" />
                </View>
                <Text style={styles.settingItemTitle}>{item.title}</Text>
              </View>
              {item.hasSwitch ? (
                <Switch
                  trackColor={{ false: "#767577", true: "#4285F4" }}
                  thumbColor={Platform.OS === 'ios' ? '#fff' : "#f4f3f4"}
                  ios_backgroundColor="#3e3e3e"
                />
              ) : (
                <Ionicons name="chevron-forward" size={24} color="#888" />
              )}
            </Animated.View>
          ))}
        </Animated.View>
      </ScrollView>
      
      {/* Floating action button with 3D effect */}
      <Animated.View
        style={[
          styles.floatingButton,
          {
            opacity: fabAnimation,
            transform: [
              { 
                translateY: fabAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [30, 0],
                }) 
              },
              { 
                scale: fabAnimation.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 1],
                }) 
              },
            ],
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            Animated.sequence([
              Animated.timing(buttonScale, {
                toValue: 0.8,
                duration: 100,
                useNativeDriver: true,
              }),
              Animated.timing(buttonScale, {
                toValue: 1.2,
                duration: 100,
                useNativeDriver: true,
              }),
              Animated.timing(buttonScale, {
                toValue: 1,
                duration: 200,
                useNativeDriver: true,
              }),
            ]).start();
          }}
          style={styles.floatingButtonInner}
        >
          <Ionicons name="add" size={30} color="#fff" />
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingTop: Platform.OS === 'ios' ? 50 : 20,
  },
  backgroundElements: {
    ...StyleSheet.absoluteFillObject,
    overflow: 'hidden',
  },
  backgroundShape: {
    position: 'absolute',
    borderRadius: 40,
    backgroundColor: 'rgba(66, 133, 244, 0.08)',
  },
  header: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  backButton: {
    position: 'absolute',
    left: 20,
  },
  profileCard: {
    margin: 16,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    overflow: 'hidden',
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImageContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    overflow: 'hidden',
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#4285F4',
  },
  profileImageOverlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileEmail: {
    fontSize: 14,
    color: '#aaa',
    marginTop: 4,
  },
  editButton: {
    marginTop: 16,
    alignSelf: 'flex-end',
  },
  editButtonText: {
    color: '#4285F4',
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  settingsContainer: {
    padding: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 12,
    marginBottom: 12,
  },
  settingItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(66, 133, 244, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  settingItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4285F4',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingButtonInner: {
    width: '100%',
    height: '100%',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SettingScreen;