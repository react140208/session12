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
import messaging from '@react-native-firebase/messaging'
import { ThemeProvider, createTheme } from '@rneui/themed';
import { PermissionsAndroid } from 'react-native';



// messaging().setBackgroundMessageHandler(async remoteMessage => {
//   console.log('Message handled in the background!', remoteMessage);
// });


const theme = createTheme({
  lightColors: {
    primary: 'red',
  },
  darkColors: {
    primary: 'blue',
  },
  components: {
    Button: {
      raised: true,
    },
  },
});


enablePromise(true);


const Tab = createBottomTabNavigator();

I18nManager.allowRTL(true);
I18nManager.forceRTL(true);

// addEventListener(state => {
//   console.log("Connection type", state.type);
//   console.log("Is connected?", state.isConnected);
// });


const config = {
  screens: {
    HomeTab: {
      screens: {
        DrugDetail: 'Home/:id',
      },
    },
  },
};

const linking: any = {
  prefixes: ['drug://'],
  config,
};

function App(): React.JSX.Element {
  const [db, setDb] = useState<SQLiteDatabase>();
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log(remoteMessage)
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    fetch().then(state => {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
    });
    createTable();
  }, [])

  const createTable = async () => {
    const x = PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);

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
    <ThemeProvider theme={theme}>
      <NavigationContainer linking={linking}>
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
    </ThemeProvider>
  );
}


export default App;
