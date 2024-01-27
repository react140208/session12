import { View, Text, Button } from 'react-native'
export default function DrugListScreen({ navigation }: any) {
    const goBack = () => {
        navigation.goBack();
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>DrugList</Text>
            <Button onPress={goBack} title='Back'></Button>
        </View>
    )
}