import { NavigationContainer, } from '@react-navigation/native';
import React from 'react';
import {
  useColorScheme,
  I18nManager
} from 'react-native';


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
        <Tab.Screen name="HomeTab" component={HomeTab} options={{ headerShown: false }} />
        <Tab.Screen name="Scan" component={ScanScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


export default App;
