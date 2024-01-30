import { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native'
import { supabase } from '../api';
export default function DrugStoreDetailScreen({ navigation, route }: any) {
    const { id } = route.params;
    const [store, setStore] = useState<any>({})
    useEffect(() => {
        if (!id) return;
        (async () => {
            const resp = await supabase.from('DrugStore').select("*").eq('id', id);
            if (resp && resp.data && resp.data.length === 1) {
                setStore(resp.data[0])
            }
        })();
    }, [id])
    const goBack = () => {
        navigation.goBack();
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>DrugStoreDetailScreen {store && store.name}</Text>
            <Button onPress={goBack} title='Back'></Button>
        </View>
    )
}