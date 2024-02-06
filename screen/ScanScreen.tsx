import { View, Text, Button } from 'react-native'
export default function ScanScreen(props: any) {

    const gotoBack = () => {
        props.navigation.goBack()
    }
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text>Home</Text>
            <Button onPress={gotoBack} title='Go Back'></Button>
        </View>
    )
}