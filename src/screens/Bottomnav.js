import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can switch to MaterialIcons or another set
import { useRoute, useNavigation } from '@react-navigation/native'; // For detecting the current route

const Bottomnav = () => {
  const route = useRoute(); // Call hook inside the component
  const navigation = useNavigation(); // Call hook inside the component

  return (
    <View style={styles.bottomNav}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Icon
          name="home"
          size={20}
          color={route.name === 'Home' ? '#34C759' : '#8E8E93'}
        />
        <Text
          style={[
            styles.navText,
            { color: route.name === 'Home' ? '#34C759' : '#8E8E93' },
          ]}>
          Home
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Leaderboard')}>
        <Icon
          name="star"
          size={20}
          color={route.name === 'Leaderboard' ? '#34C759' : '#8E8E93'}
        />
        <Text
          style={[
            styles.navText,
            { color: route.name === 'Leaderboard' ? '#34C759' : '#8E8E93' },
          ]}>
          Leaderboard
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
        <Icon
          name="cog"
          size={20}
          color={route.name === 'Settings' ? '#34C759' : '#8E8E93'}
        />
        <Text
          style={[
            styles.navText,
            { color: route.name === 'Settings' ? '#34C759' : '#8E8E93' },
          ]}>
          Settings
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 25,
    borderTopWidth: 1,
    borderTopColor: '#E5E5EA',
    backgroundColor: '#FFF',
    position: 'absolute', // Fix position at bottom
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 0,
  },
  navText: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
  },
});

export default Bottomnav;