//App.js
// import axios from 'axios';
import React from "react";
import Constants from "expo-constants";
import { useState } from 'react';
// import { Button, Image, StyleSheet, Text, View } from "react-native";
import {
    View,
    StyleSheet,
    SafeAreaView,
    StatusBar,
    Platform,
    TouchableOpacity,
    Text,
    TextInput
} from "react-native";
import { useBusLocations } from "./hooks/useBusLocations";
import Map from "./components/Map";
import TestMap from "./components/TestMap"
import { useBusStopLocations } from "./hooks/useBusStopLocations";
import { useBusRoutes } from "./hooks/useBusRoutes";

//Environment Variables (from .env)
const SERVER_URL = Constants.expoConfig?.extra?.SERVER_URL;
const BUS_ID = Constants.expoConfig?.extra?.BUS_ID;

// export default function App() {
//     return <TestMap />;
// }

export default function App() {
    const [busId, setBusId] = useState(null);
    const location_focus = { latitude: 0, longitude: 0 };
    const { busData, busIds, routeIds, setBusIds, initialBusIds } = useBusLocations(
        SERVER_URL,
        busId ? [busId] : null
    );
    const { routeData, busStopIds } = useBusRoutes(SERVER_URL, routeIds);
    const { busStopData } = useBusStopLocations(SERVER_URL, [...busStopIds]);
    function trackBus() {
        if (initialBusIds.has(busId)) {
            setBusIds(new Set([busId]))
        }
    }
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
        <View style={styles.container} pointerEvents="box-none">
            {/* MAP fills the full screen (underneath the overlay) */}
            <Map
                location_focus={location_focus}
                busData={busData}
                routeData={routeData}
                busStopData={busStopData}
                busIds={busIds}
                busStopIds={busStopIds}
                routeIds={routeIds}
            />

            {/* Controls overlayed on top of the map */}
            <SafeAreaView style={styles.topOverlay}>
                <View style={styles.controlsCol}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setBusIds(initialBusIds)}
                    >
                        <Text style={styles.buttonText}>VIEW ALL BUSES</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => setBusIds(new Set(['1']))}
                    >
                        <Text style={styles.buttonText}>SELECT BUS 1</Text>
                    </TouchableOpacity>
                    <TextInput
                        style={[styles.button, styles.searchBar]}
                        placeholder="Enter Bus ID"
                        value={busId}
                        onChangeText={setBusId}
                        onSubmitEditing={trackBus} // Call when user presses enter
                        returnKeyType="search"
                    />
                </View>
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1 },

    map: { flex: 1 },

    // absolute overlay pinned to top, only takes as much height as its children
    topOverlay: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        // on Android, SafeAreaView doesn't add top padding — add StatusBar height
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        zIndex: 999,
        elevation: 999, // Android z-index
        alignItems: "center",
    },

    controlsRow: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 8,
        backgroundColor: "rgba(0, 122, 255, 0.95)", // semi-opaque header
    },

    controlsCol: {
        width: "100%",
        flexDirection: "col",
        justifyContent: "space-around",
        paddingVertical: 8,
        backgroundColor: "rgba(0, 122, 255, 0.95)", // semi-opaque header
    },

    button: {
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 6,
        backgroundColor: "transparent", // already have background on container
    },

    searchBar: {
        flex: 1,
        height: 40,
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: "#fff",
    },

    buttonText: {
        color: "white",
        fontWeight: "600",
    },
});
/*
    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container}>
                <Button title="View all Buses" onPress={() => setBusIds(initialBusIds)} />
                <Button title="Select Bus 1" onPress={() => setBusIds(new Set(["1"]))} />
            </SafeAreaView>
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
*/