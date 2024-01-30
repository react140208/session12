import { View, Text, Button } from 'react-native'
import { WebView } from 'react-native-webview';
import Geolocation, { GeolocationResponse } from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import { supabase } from '../api';



export default function DrugStoreScreen(props: any) {
    const [location, setLocation] = useState<GeolocationResponse>();
    const [drugStores, setDrugStores] = useState<any[]>([]);
    useEffect(() => {
        //"coords": {"accuracy": 5, "altitude": 5, "heading": 0, "latitude": 37.421998333333335, "longitude": -122.084, "speed": 0}, "extras": {"maxCn0": 0, "meanCn0": 0, "satellites": 0}, "mocked": false, "timestamp": 1706627879951}
        Geolocation.getCurrentPosition(info => setLocation(info), error => console.log(error), { enableHighAccuracy: true });
    }, []);
    useEffect(() => {
        if (!location) return;
        (async () => {
            const resp = await supabase.rpc('nearby_drugstores', {
                lat: location.coords.latitude,
                long: location.coords.longitude
            }).limit(20)
            setDrugStores(resp.data)
        })();
    }, [location])
    return (
        <WebView source={{
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Simple Leaflet Map</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
          <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        </head>
        <body>
          <div id="mapid" style="height: 98vh; width: 100%;"></div>
          <script>                
            var map = L.map('mapid').setView([${location?.coords.latitude}, ${location?.coords.longitude}], 13);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
              maxZoom: 19,
            }).addTo(map);

            function pointToLatLang(point){
                // POINT(27.60154467784672 62.71286435490563) -> 27.60154467784672 62.71286435490563
                const parts = point.replace('POINT(', '').replace(')', '').split(' ');
                return {lat: +parts[0], lang: +parts[1]}
            }
            function addDrugStores(data){
                let stores = JSON.parse(data);
                for(let i=0; i<stores.length; i++){
                    let store = stores[i];
                    //alert(store.id)
                    L.marker([pointToLatLang(store.location).lat, pointToLatLang(store.location).lang]).addTo(map).bindPopup(store.name).openPopup();
                    
                }
            }
          </script>
        </body>
        </html> 
        ` }} style={{ flex: 1 }}
            // injectedJavaScript={`L.marker([35.716691, 51.391983]).addTo(map).bindPopup('A pretty CSS popup.<br> Easily customizable.').openPopup();`}
            injectedJavaScript={`addDrugStores('${JSON.stringify(drugStores)}')`}
        />
    )
}