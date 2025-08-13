// import React, { useState, useEffect } from "react";
// import { View, Text, StyleSheet } from "react-native";
// import MapView, { PROVIDER_GOOGLE, Region } from "react-native-maps";

// export default function TestMap() {
//   const [mapReady, setMapReady] = useState(false);
//   const [mapLoaded, setMapLoaded] = useState(false);
//   const [mapError, setMapError] = useState(false);

//   useEffect(() => {
//     if (mapLoaded) {
//       console.log("[MAP TEST] Map loaded event triggered");

//       const timeout = setTimeout(() => {
//         // If mapReady is still false after load, it might be blank
//         if (!mapReady) {
//           console.warn("[MAP TEST] Possible tile loading issue detected");
//           setMapError(true);
//         }
//       }, 3000); // 3 sec check

//       return () => clearTimeout(timeout);
//     }
//   }, [mapLoaded]);

//   return (
//     <MapView
//       provider={PROVIDER_GOOGLE}
//       style={styles.map}
//       initialRegion={{
//         latitude: 37.78825,
//         longitude: -122.4324,
//         latitudeDelta: 0.0922,
//         longitudeDelta: 0.0421,
//       }}
//       onMapReady={() => {
//         console.log("[MAP TEST] onMapReady called");
//       }}
//       onMapLoaded={() => {
//         console.log("[MAP TEST] onMapLoaded called ✅ Tiles rendered");
//       }}
//       onRegionChange={(region) => {
//         console.log("[MAP TEST] onRegionChange:", region);
//       }}
//       onRegionChangeComplete={(region) => {
//         console.log("[MAP TEST] onRegionChangeComplete:", region);
//       }}
//       onPress={(e) => {
//         console.log("[MAP TEST] Map pressed:", e.nativeEvent.coordinate);
//       }}
//       onUserLocationChange={(e) => {
//         console.log(
//           "[MAP TEST] User location change:",
//           e.nativeEvent.coordinate
//         );
//       }}
//     />
//   );
//   // (
//   //     <View style={styles.container}>
//   //       <MapView
//   //         provider={PROVIDER_GOOGLE}
//   //         style={styles.map}
//   //         initialRegion={{
//   //           latitude: 37.78825,
//   //           longitude: -122.4324,
//   //           latitudeDelta: 0.0922,
//   //           longitudeDelta: 0.0421,
//   //         }}
//   //         onMapReady={() => {
//   //           console.log("[MAP TEST] onMapReady called");
//   //           setMapReady(true);
//   //         }}
//   //         onRegionChangeComplete={(region: Region) => {
//   //           console.log("[MAP TEST] Region changed:", region);
//   //           setMapReady(true); // user panned or zoomed — map likely functional
//   //         }}
//   //         onMapLoaded={() => {
//   //           console.log("[MAP TEST] onMapLoaded called");
//   //           setMapLoaded(true);
//   //         }}
//   //       />

//   //       {!mapLoaded && (
//   //         <View style={styles.overlay}>
//   //           <Text style={styles.text}>Loading map tiles...</Text>
//   //         </View>
//   //       )}

//   //       {mapError && (
//   //         <View
//   //           style={[styles.overlay, { backgroundColor: "rgba(255,0,0,0.5)" }]}
//   //         >
//   //           <Text style={styles.text}>
//   //             Map may have failed to load. Check internet or API key.
//   //           </Text>
//   //         </View>
//   //       )}
//   //     </View>
//   //   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#222",
//   },
//   map: {
//     flex: 1,
//   },
//   overlay: {
//     position: "absolute",
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     alignItems: "center",
//     justifyContent: "center",
//   },
//   text: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
// });

import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";

export default function TestMap() {
  const [mapReady, setMapReady] = useState(false);

  console.log("[MAP TEST] Component Rendered");

  return (
    <View
      style={styles.container}
      onLayout={(e) => {
        console.log("[MAP TEST] Container layout:", e.nativeEvent.layout);
      }}
    >
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onMapReady={() => {
          console.log("[MAP TEST] onMapReady called");
          setMapReady(true);
        }}
        onMapLoaded={() => {
          console.log("[MAP TEST] onMapLoaded fired — tiles should be visible");
        }}
        onRegionChangeComplete={(region) => {
          console.log("[MAP TEST] Region changed to:", region);
        }}
        onLayout={(e) => {
          console.log("[MAP TEST] Map layout:", e.nativeEvent.layout);
        }}
      />
      {!mapReady && (
        <View style={styles.overlay}>
          <Text style={{ color: "#fff" }}>Loading Map...</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222",
  },
  map: {
    flex: 1,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
  },
});
