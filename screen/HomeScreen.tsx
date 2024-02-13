import { View, Text, Linking } from 'react-native'
import notifee from '@notifee/react-native';
import { Button } from '@rneui/themed';


export default function HomeScreen(props: any) {
    const gotoDrugList = () => {
        props.navigation.push('DrugList')
    }
    const gotoDrugStore = () => {
        props.navigation.push('DrugStore')
    }
    async function onDisplayNotification() {
        // Request permissions (required for iOS)
        await notifee.requestPermission()

        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        // Display a notification
        await notifee.displayNotification({
            title: 'Notification Title',
            body: 'Main body content of the notification',
            android: {
                channelId,
                // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
                // pressAction is needed if you want the notification to open the app when pressed
                pressAction: {
                    id: 'default',
                },
            },
        });
    }

    function onBuy() {
        Linking.openURL(`http://192.168.1.2:2132/pay`);
    }

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home</Text>
            <Button onPress={gotoDrugList} title='Drug List'></Button>
            <Button onPress={gotoDrugStore} title='Drug Store'></Button>
            <Button onPress={onDisplayNotification} type="outline" title='Show Notification'></Button>
            <Button onPress={onBuy} type="outline" title='Buy'></Button>
        </View>
    )
}