//App.js
// import axios from 'axios';
import Constants from "expo-constants";
// import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, View } from "react-native";
// import MapView, { Marker } from 'react-native-maps';
import { useBusLocations } from "./utils/useBusLocations";
import Map from "./components/Map";

//Environment Variables (from .env)
const SERVER_URL = Constants.expoConfig?.extra?.SERVER_URL;
const BUS_ID = Constants.expoConfig?.extra?.BUS_ID;

export default function App() {
    let bus_id
    const location_focus = { latitude: 0, longitude: 0 };
    const busData = useBusLocations(SERVER_URL, bus_id ? [bus_id] : null);
    // const [busLocation, setBusLocation] = useState(null);
    // const [errorMsg, setErrorMsg] = useState(null);

    // const fetchBusLocation = async () => {
    //     try {
    //         const res = (await axios.get(`${SERVER_URL}/api/location/${BUS_ID}`)).data;
    //         const { latitude, longitude } = res;
    //         setBusLocation({ latitude, longitude });
    //     } catch (err) {
    //         console.error('Error fetching bus location:', err.message);
    //         setErrorMsg('Failed to fetch bus location');
    //     }
    // };

    // useEffect(() => {
    //     fetchBusLocation();
    //     const interval = setInterval(fetchBusLocation, 5000);
    //     return () => clearInterval(interval);
    // }, []);

    return (
        <View style={styles.container}>
            <Map location_focus={location_focus} busData={busData} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    errorText: {
        flex: 1,
        textAlign: "center",
        textAlignVertical: "center",
        fontSize: 18,
        color: "gray",
    },
});
