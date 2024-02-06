import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Text } from 'react-native';
import React from 'react';


import HomeScreen from './HomeScreen';
import DrugListScreen from './DrugListScreen';
import DrugDetailScreen from './DrugDetailScreen';
import DrugStoreScreen from './DrugStoreScreen'
import DrugStoreDetailScreen from './DrugStoreDetailScreen';

const Stack = createNativeStackNavigator();

function HomeTab(): React.JSX.Element {

    return (
        <Stack.Navigator>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="DrugList" component={DrugListScreen} options={{ header: () => <Text>لیست داروها</Text> }} />
            <Stack.Screen name="DrugDetail" component={DrugDetailScreen} options={{ header: () => <Text>لیست داروها</Text> }} />
            <Stack.Screen name="DrugStore" component={DrugStoreScreen} />
            <Stack.Screen name="DrugStoreDetail" component={DrugStoreDetailScreen} />
        </Stack.Navigator>
    );
}


export default HomeTab;
