import { NavigationContainer, } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  useColorScheme,
  I18nManager
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ScanScreen from './screen/ScanScreen';
import HomeTab from './screen/HomeTab';
import { fetch, addEventListener } from "@react-native-community/netinfo";
import { SQLiteDatabase, enablePromise, openDatabase } from 'react-native-sqlite-storage'
enablePromise(true);


const Tab = createBottomTabNavigator();

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

// addEventListener(state => {
//   console.log("Connection type", state.type);
//   console.log("Is connected?", state.isConnected);
// });


function App(): React.JSX.Element {
  const [db, setDb] = useState<SQLiteDatabase>();
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });
    createTable();
  }, [])

  const createTable = async () => {
    var db = await openDatabase({ name: "test.db" });
    setDb(db);
    const query_create = `CREATE TABLE IF NOT EXISTS users(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        mobileNo TEXT NOT NULL UNIQUE, 
        password TEXT NOT NULL
    );`;
    try {
      await db.executeSql(query_create);
      // insertData();
      selectData();
    } catch (err) {
      console.log({ err });
    }
  };

  const insertData = async () => {
    if (!db) return;
    const query_insert = 'INSERT INTO users (name, mobileNo ,password) VALUES (?, ?, ?)';
    const params = ['Xyz', '1234567890', '123'];

    try {
      await db.executeSql(query_insert, params);
      console.log('ok?')
    } catch (err) {
      console.log('err', err);
    }
  };


  const selectData = async () => {
    if (!db) return;
    const select = 'Select * from users';

    console.log('-->')
    try {
      const results = await db.executeSql(select);
      results.forEach(result => {
        var temp = [];
        for (let i = 0; i < result.rows.length; ++i) {
          temp.push(result.rows.item(i));
        }
        console.log(temp)
      });
    } catch (err) {
      console.log('err', err);
    }
  };

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
