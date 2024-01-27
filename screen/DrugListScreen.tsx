import { useEffect, useState } from 'react';
import { View, Text, Button, SafeAreaView, FlatList, StyleSheet, RefreshControl } from 'react-native'
import { supabase } from '../api';
export default function DrugListScreen({ navigation }: any) {
    const [drugList, setDrugList] = useState<any[]>([]);
    const [page, setPage] = useState(0)
    const [refreshing, setRefreshing] = useState(false);

    const goBack = () => {
        navigation.goBack();
    }

    useEffect(() => {
        (async () => {
            setRefreshing(true);
            const resp = await supabase.from('Drug').select("*")
                .range(page * 10, ((page + 1) * 10) - 1);
            if (resp.data) {
                if (page === 0)
                    setDrugList(resp.data)
                else
                    setDrugList([...drugList, ...resp.data])
            }
            setRefreshing(false);
        })();
    }, [page])

    const loadNextPage = () => {
        setPage(page + 1);
        console.log(page)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <FlatList data={drugList} renderItem={({ item }) => <Text style={styles.item}>
                    {item.drugGenericFaName}
                </Text>}
                    onEndReached={loadNextPage}
                    keyExtractor={(item) => item.id}
                    refreshing={refreshing}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => setPage(0)}
                        >
                        </RefreshControl>
                    }
                >

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