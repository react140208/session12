import { useEffect } from 'react';
import { View, Text, Button } from 'react-native'
import { supabase } from '../api';
export default function DrugListScreen({ navigation }: any) {
    const goBack = () => {
        navigation.goBack();
    }
    useEffect(() => {
        (async () => {
            const resp = await supabase.from('Drug').select("*").limit(10);
            console.log(resp)
        })();
    }, [])
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>DrugList</Text>
            <Button onPress={goBack} title='Back'></Button>
        </View>
    )
}