import { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native'
import { supabase } from '../api';
import notifee, { IntervalTrigger, RepeatFrequency, TimeUnit, TimestampTrigger, TriggerType } from '@notifee/react-native';
export default function DrugDetailScreen({ navigation, route }: any) {
    const { id } = route.params;
    const [drug, setDrug] = useState<any>({})
    useEffect(() => {
        if (!id) return;
        (async () => {
            const resp = await supabase.from('Drug').select("*").eq('id', id);
            if (resp && resp.data && resp.data.length === 1) {
                setDrug(resp.data[0])
            }
        })();
    }, [id])
    const goBack = () => {
        navigation.goBack();
    }
    async function onDisplayNotification() {
        // Request permissions (required for iOS)
        await notifee.requestPermission()

        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
        });

        const date = new Date();
        date.setMinutes(date.getMinutes() + 1);

        const trigger: IntervalTrigger = {
            type: TriggerType.INTERVAL,
            interval: 8,
            timeUnit: TimeUnit.HOURS
        }

        const trigger2: TimestampTrigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: date.getDate()
        }


        // Display a notification
        const id = await notifee.createTriggerNotification({
            title: 'یاد آوری دارو',
            body: drug.drugGenericFaName,
            android: {
                channelId,
                // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
                // pressAction is needed if you want the notification to open the app when pressed
                pressAction: {
                    id: 'default',
                },
            },
        }, trigger2);
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>ID: {id} </Text>
            <Text>DrugDetailScreen {drug && drug.drugGenericFaName} </Text>
            <Button onPress={goBack} title='Back'></Button>
            <Button onPress={onDisplayNotification} title='یاد آوری'></Button>

        </View>
    )
}