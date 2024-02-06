import { useEffect, useRef } from 'react';
import { View, Text, Button } from 'react-native'
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from 'react-native-vision-camera'
export default function ScanScreen(props: any) {

    const { hasPermission, requestPermission } = useCameraPermission();
    useEffect(() => {
        (async () => {
            const result = await requestPermission();
        })();
    }, [])
    const device = useCameraDevice('back')
    const camera = useRef<Camera>(null)
    if (device == null) return <Text>No Camera</Text>

    const gotoBack = () => {
        props.navigation.goBack()
    }
    const capture = async () => {
        if (!camera || !camera.current) return;
        try {
            const photo = await camera.current.takePhoto({
                flash: 'on' // 'auto' | 'off'
            });
            console.log(photo)
        } catch (e) {
            console.log('error', e)
        }
    }
    const codeScanner = useCodeScanner({
        codeTypes: ['data-matrix'],
        onCodeScanned: (codes) => {
            console.log(`Scanned ${codes.length} codes!`, codes)
        }
    })
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Camera
                codeScanner={codeScanner}
                photo
                ref={camera}
                style={{ flex: 1, height: '100%', width: '100%' }}
                device={device}
                isActive={true}
            />
            <Button onPress={capture} title='Capture'></Button>
            <Button onPress={gotoBack} title='Go Back'></Button>
        </View>
    )
}