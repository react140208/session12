import { View, Text, Button } from 'react-native'
export default function HomeScreen(props: any) {
    const gotoDrugList = () => {
        props.navigation.push('DrugList')
    }
    const gotoDrugStore = () => {
        props.navigation.push('DrugStore')
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home</Text>
            <Button onPress={gotoDrugList} title='Drug List'></Button>
            <Button onPress={gotoDrugStore} title='Drug Store'></Button>
        </View>
    )
}