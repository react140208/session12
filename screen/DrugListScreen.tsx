import { useEffect, useState } from 'react';
import { View, Text, Button, SafeAreaView, FlatList, StyleSheet } from 'react-native'
import { supabase } from '../api';
export default function DrugListScreen({ navigation }: any) {
    const [drugList, setDrugList] = useState<any[]>([]);
    const goBack = () => {
        navigation.goBack();
    }
    useEffect(() => {
        (async () => {
            const resp = await supabase.from('Drug').select("*").limit(10);
            if (resp.data)
                setDrugList(resp.data)
        })();
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FlatList data={drugList} renderItem={({ item }) => <Text style={styles.item}>
                    {item.drugGenericFaName}
                </Text>} keyExtractor={(item) => item.id}>

                </FlatList>
                <Text>DrugList</Text>
                <Button onPress={goBack} title='Back'></Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10
    },
    item: {
        backgroundColor: 'silver',
        padding: 20,
        marginVertical: 10,
        fontSize: 24
    }
});