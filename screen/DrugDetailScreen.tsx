import { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native'
import { supabase } from '../api';
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
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>DrugDetailScreen {drug && drug.drugGenericFaName}</Text>
            <Button onPress={goBack} title='Back'></Button>
        </View>
    )
}