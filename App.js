//App.js
// import axios from 'axios';
import Constants from "expo-constants";
// import { useEffect, useState } from 'react';
import { Button, Image, StyleSheet, Text, View } from "react-native";
// import MapView, { Marker } from 'react-native-maps';
import { useBusLocations } from "./utils/useBusLocations";
import Map from "./components/Map";
import { useBusStopLocations } from "./utils/useBusStopLocations";
import { useBusRoutes } from "./utils/useBusRoutes";

//Environment Variables (from .env)
const SERVER_URL = Constants.expoConfig?.extra?.SERVER_URL;
const BUS_ID = Constants.expoConfig?.extra?.BUS_ID;

export default function App() {
    let bus_id = null;
    const location_focus = { latitude: 0, longitude: 0 };
    const { busData, busIds, routeIds, setBusIds, initialBusIds } = useBusLocations(
        SERVER_URL,
        bus_id ? [bus_id] : null
    );
    const { routeData, busStopIds } = useBusRoutes(SERVER_URL, routeIds);
    const { busStopData } = useBusStopLocations(SERVER_URL, [...busStopIds]);
    // console.log(initialBusIds, busIds, routeIds, busStopIds);
    // function handleSelectBus(ids) {
    //     setBusIds(ids); // Set to whatever bus ID you want to track
    // }
    // setBusIds(['2']);
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
            <Button title="View all Buses" onPress={() => setBusIds(initialBusIds)} />
            <Button title="View all Buses" onPress={() => setBusIds(initialBusIds)} />
            <Button title="Select Bus 1" onPress={() => setBusIds(new Set(["1"]))} />
            <Map
                location_focus={location_focus}
                busData={busData}
                routeData={routeData}
                busStopData={busStopData}
                busIds={busIds}
                busStopIds={busStopIds}
                routeIds={routeIds}
            />
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
