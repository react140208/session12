import { NavigationContainer, } from '@react-navigation/native';
import React from 'react';
import {
  useColorScheme,
  I18nManager
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScanScreen from './screen/ScanScreen';
import HomeTab from './screen/HomeTab';

const Tab = createBottomTabNavigator();

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';


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
