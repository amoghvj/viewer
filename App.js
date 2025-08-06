//App.js
import axios from 'axios';
import Constants from 'expo-constants';
import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

//Environment Variables (from .env)
const SERVER_URL = Constants.expoConfig?.extra?.SERVER_URL;
const BUS_ID = Constants.expoConfig?.extra?.BUS_ID;

export default function App() {
    const [busLocation, setBusLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);

    const fetchBusLocation = async () => {
        try {
            const res = (await axios.get(`${SERVER_URL}/api/location/${BUS_ID}`)).data;
            const { latitude, longitude } = res;
            setBusLocation({ latitude, longitude });
        } catch (err) {
            console.error('Error fetching bus location:', err.message);
            setErrorMsg('Failed to fetch bus location');
        }
    };

    useEffect(() => {
        fetchBusLocation();
        const interval = setInterval(fetchBusLocation, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            {busLocation ? (
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: busLocation.latitude,
                        longitude: busLocation.longitude,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    <Marker
                        coordinate={busLocation}
                        title="College Bus"
                        description={`Tracking Bus-${BUS_ID}`}
                        anchor={{ x: 0.5, y: 0.5 }}
                    >
                        <Image
                            source={require('./assets/images/bus-icon.png')}
                            style={{ width: 30, height: 30 }}
                            resizeMode="contain"
                        />
                    </Marker>
                </MapView>
            ) : (
                <Text style={styles.errorText}>{errorMsg || 'Loading map...'}</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    errorText: {
        flex: 1,
        textAlign: 'center',
        textAlignVertical: 'center',
        fontSize: 18,
        color: 'gray'
    }
});