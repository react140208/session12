import { NavigationContainer, } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {
  useColorScheme,
  I18nManager
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScanScreen from './screen/ScanScreen';
import HomeTab from './screen/HomeTab';
import { fetch, addEventListener } from "@react-native-community/netinfo";

const Tab = createBottomTabNavigator();

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

addEventListener(state => {
  console.log("Connection type", state.type);
  console.log("Is connected?", state.isConnected);
});

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });
  }, [])

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="HomeTab" component={HomeTab} options={{
          headerShown: false, tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }} />
        <Tab.Screen name="Scan" component={ScanScreen} options={{
          headerShown: false, tabBarLabel: 'Scan',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="data-matrix-scan" color={color} size={size} />
          ),
        }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


export default App;
