import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // You can switch to MaterialIcons or another set
import { useRoute, useNavigation } from '@react-navigation/native'; // For detecting the current route
import Bottomnav from './Bottomnav';

const HomeScreen = () => {
  // State to manage the status of devices (unchanged)
  const [frontDoorLocked, setFrontDoorLocked] = useState(false);
  const [sconcesOn, setSconcesOn] = useState(true);
  const [overheadOn, setOverheadOn] = useState(false);
  const [ceilingLightsOn, setCeilingLightsOn] = useState(true);
  const [ceilingLightsBrightness, setCeilingLightsBrightness] = useState(90);
  const [accentLightsOn, setAccentLightsOn] = useState(false);
  const [smartFanOn, setSmartFanOn] = useState(false);
  const [tableLightsOn, setTableLightsOn] = useState(true);
  const [sideDoorClosed, setSideDoorClosed] = useState(true);

  // Thermostat states (unchanged)
  const [livingRoomTemp, setLivingRoomTemp] = useState(68);
  const [livingRoomTarget, setLivingRoomTarget] = useState(70);
  const [kitchenTemp, setKitchenTemp] = useState(72);
  const [kitchenTarget, setKitchenTarget] = useState(70);

  // Get the current route and navigation
  const route = useRoute();
  const navigation = useNavigation();

  const toggleDoor = (setter) => setter(!frontDoorLocked);
  const toggleLight = (setter) => setter((prev) => !prev);
  const toggleFan = () => setSmartFanOn((prev) => !prev);
  const toggleSideDoor = () => setSideDoorClosed((prev) => !prev);

  return (
    <SafeAreaView style={styles.container}>
      {/* Main Content */}
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerText}>My Home</Text>
          <View style={styles.headerIcons}>
            <Icon name="volume-up" size={20} color="#000" />
            <Icon name="plus" size={20} color="#000" style={styles.iconMargin} />
            <Icon name="ellipsis-v" size={20} color="#000" />
          </View>
        </View>

        {/* Entry Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Entry</Text>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.control}
              onPress={() => toggleDoor(setFrontDoorLocked)}>
              <Icon
                name={frontDoorLocked ? 'lock' : 'unlock'}
                size={30}
                color={frontDoorLocked ? '#34C759' : '#FF2D55'}
              />
              <Text style={styles.controlText}>
                Front Door {frontDoorLocked ? 'Locked' : 'Unlocked'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.control}
              onPress={() => toggleLight(setSconcesOn)}>
              <Icon name="lightbulb-o" size={30} color={sconcesOn ? '#FFD60A' : '#8E8E93'} />
              <Text style={styles.controlText}>Sconces {sconcesOn ? 'On' : 'Off'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.control}
              onPress={() => toggleLight(setOverheadOn)}>
              <Icon name="lightbulb-o" size={30} color={overheadOn ? '#FFD60A' : '#8E8E93'} />
              <Text style={styles.controlText}>Overhead {overheadOn ? 'On' : 'Off'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Living Room Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Living Room</Text>
          <View style={styles.row}>
            <View style={styles.control}>
              <Text style={styles.tempText}>{livingRoomTemp}°</Text>
              <Text style={styles.controlText}>
                Thermostat Heating to {livingRoomTarget}°
              </Text>
            </View>
            <TouchableOpacity
              style={styles.control}
              onPress={() => toggleLight(setCeilingLightsOn)}>
              <Icon name="lightbulb-o" size={30} color={ceilingLightsOn ? '#FFD60A' : '#8E8E93'} />
              <Text style={styles.controlText}>
                Ceiling Lights {ceilingLightsOn ? `${ceilingLightsBrightness}%` : 'Off'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.control}
              onPress={() => toggleLight(setAccentLightsOn)}>
              <Icon name="lightbulb-o" size={30} color={accentLightsOn ? '#FFD60A' : '#8E8E93'} />
              <Text style={styles.controlText}>Accent Lights {accentLightsOn ? 'On' : 'Off'}</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.control}
            onPress={toggleFan}>
            <Icon name="fan" size={30} color={smartFanOn ? '#34C759' : '#8E8E93'} />
            <Text style={styles.controlText}>Smart Fan {smartFanOn ? 'On' : 'Off'}</Text>
          </TouchableOpacity>
        </View>

        {/* Kitchen Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Kitchen</Text>
          <View style={styles.row}>
            <View style={styles.control}>
              <Text style={styles.tempText}>{kitchenTemp}°</Text>
              <Text style={styles.controlText}>
                Thermostat Cooling to {kitchenTarget}°
              </Text>
            </View>
            <TouchableOpacity
              style={styles.control}
              onPress={() => toggleLight(setTableLightsOn)}>
              <Icon name="lightbulb-o" size={30} color={tableLightsOn ? '#FFD60A' : '#8E8E93'} />
              <Text style={styles.controlText}>Table Lights {tableLightsOn ? 'On' : 'Off'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.control}
              onPress={toggleSideDoor}>
              <Icon name={sideDoorClosed ? 'door-closed' : 'door-open'} size={30} color={sideDoorClosed ? '#34C759' : '#FF2D55'} />
              <Text style={styles.controlText}>Side Door {sideDoorClosed ? 'Closed' : 'Open'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Bottom Navigation (Fixed at Bottom) */}
      <Bottomnav />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  content: {
    flex: 1, // Takes up remaining space above bottom nav
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#E5E5EA',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerIcons: {
    flexDirection: 'row',
  },
  iconMargin: {
    marginHorizontal: 10,
  },
  section: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  control: {
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 10,
    width: '30%',
    alignItems: 'center',
    marginVertical: 10,
  },
  controlText: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  tempText: {
    fontSize: 24,
    color: '#FF9500',
    fontWeight: 'bold',
  },
});

export default HomeScreen;