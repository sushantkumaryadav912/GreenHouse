import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
  Platform,
  StatusBar,
} from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSpring,
  withSequence,
  withDelay,
  interpolate,
  Extrapolation,
  runOnJS,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { Canvas, Skia, Shadow, BlurMask, vec } from '@shopify/react-native-skia';
import { BlurView } from 'expo-blur';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
  const insets = useSafeAreaInsets();
  const headerAnimation = useSharedValue(0);
  const settingsAnimation = useSharedValue(0);
  const rotationValue = useSharedValue(0);
  const buttonScale = useSharedValue(1);
  
  // 3D card rotation values
  const rotateX = useSharedValue(0);
  const rotateY = useSharedValue(0);
  
  useEffect(() => {
    StatusBar.setBarStyle('light-content');
    
    // Animate header
    headerAnimation.value = withSpring(1, { damping: 15 });
    
    // Animate settings items with sequence
    settingsAnimation.value = withDelay(400, withSpring(1, { damping: 12 }));
    
    // Start rotation animation
    startRotationAnimation();
    
    return () => {
      StatusBar.setBarStyle('default');
    };
  }, []);
  
  const startRotationAnimation = () => {
    rotationValue.value = withSequence(
      withTiming(2 * Math.PI, { duration: 10000 }),
      withTiming(0, { duration: 0 }),
    );
    
    // Make this continuous
    setTimeout(() => {
      runOnJS(startRotationAnimation)();
    }, 10000);
  };
  
  const animateButton = () => {
    buttonScale.value = withSequence(
      withTiming(0.9, { duration: 100 }),
      withTiming(1.1, { duration: 100 }),
      withTiming(1, { duration: 200 }),
    );
  };
  
  const headerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: headerAnimation.value,
      transform: [
        { translateY: interpolate(headerAnimation.value, [0, 1], [-50, 0]) },
      ],
    };
  });
  
  const settingsAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: settingsAnimation.value,
      transform: [
        { translateY: interpolate(settingsAnimation.value, [0, 1], [100, 0]) },
      ],
    };
  });
  
  const buttonAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: buttonScale.value }],
    };
  });
  
  const render3DCardPath = () => {
    const width = 60;
    const height = 60;
    const path = Skia.Path.Make();
    path.addRRect(Skia.RRectXY(Skia.Rect.Make(0, 0, width, height), 16, 16));
    return path;
  };
  
  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Background gradient and 3D objects */}
      <Canvas style={StyleSheet.absoluteFill}>
        {/* Animated background shapes */}
        <Animated.View
          style={[
            StyleSheet.absoluteFill,
            {
              transform: [{ rotate: `${rotationValue.value}rad` }],
            },
          ]}
        >
          {Array(5).fill(0).map((_, index) => {
            const size = 100 + index * 40;
            const x = 50 + index * 20;
            const y = 100 + index * 30;
            
            return (
              <Canvas key={index} style={{
                position: 'absolute',
                width: size,
                height: size,
                left: x,
                top: y,
              }}>
                <BlurMask blur={20} style="normal" />
                <Shadow dx={10} dy={10} blur={20} color="rgba(0, 0, 0, 0.2)" />
                {render3DCardPath()}
              </Canvas>
            );
          })}
        </Animated.View>
      </Canvas>

      {/* Blur overlay for depth effect */}
      <BlurView intensity={20} style={StyleSheet.absoluteFill} tint="dark" />
      
      {/* Header */}
      <Animated.View style={[styles.header, headerAnimatedStyle]}>
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
            transform: [
              { perspective: 800 },
              { rotateX: `${rotateX.value}deg` },
              { rotateY: `${rotateY.value}deg` },
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
        <Animated.View style={[styles.editButton, buttonAnimatedStyle]}>
          <TouchableOpacity 
            onPress={() => {
              animateButton();
              // Simulate 3D card flip
              rotateY.value = withSequence(
                withTiming(10, { duration: 200 }),
                withTiming(-10, { duration: 400 }),
                withTiming(0, { duration: 200 })
              );
            }}
          >
            <Text style={styles.editButtonText}>Edit Profile</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
      
      {/* Settings List */}
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.settingsContainer, settingsAnimatedStyle]}>
          {SETTING_ITEMS.map((item, index) => (
            <Animated.View
              key={item.id}
              style={[
                styles.settingItem,
                {
                  opacity: useSharedValue(0),
                  transform: [
                    { 
                      translateY: useAnimatedStyle(() => {
                        return {
                          translateY: withDelay(
                            index * 100,
                            withSpring(0, { damping: 15 })
                          ),
                        };
                      }).transform[0].translateY 
                    },
                  ],
                },
              ]}
              entering={withDelay(
                400 + index * 100,
                withSpring({ opacity: 1, translateY: 0 }, { damping: 15 })
              )}
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
            transform: [
              { translateY: withSpring(0, { damping: 10 }) },
              { scale: useSharedValue(1) },
            ],
          },
        ]}
        entering={withDelay(
          800,
          withSpring({ opacity: 1, scale: 1 }, { damping: 5 })
        )}
      >
        <TouchableOpacity
          onPress={() => {
            // Simulate 3D button press
            buttonScale.value = withSequence(
              withTiming(0.8, { duration: 100 }),
              withTiming(1.2, { duration: 100 }),
              withTiming(1, { duration: 200 }),
            );
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