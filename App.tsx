import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import type { PropsWithChildren } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './screen/HomeScreen';
import DrugListScreen from './screen/DrugListScreen';
import DrugDetailScreen from './screen/DrugDetailScreen';


const Stack = createNativeStackNavigator();


function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="DrugList" component={DrugListScreen} options={{ header: () => <Text>لیست داروها</Text> }} />
        <Stack.Screen name="DrugDetail" component={DrugDetailScreen} options={{ header: () => <Text>لیست داروها</Text> }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


export default App;
