import { Image, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, LatLng } from "react-native-maps";

type BusDataItem = {
  bus_id: string;
  bus_location: LatLng | null;
  error_msg: string | null;
};

type Props = {
  busData: BusDataItem[];
  location_focus: LatLng;
};

export default function Map({ busData, location_focus }: Props) {
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location_focus.latitude,
        longitude: location_focus.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
    >
      {busData.map((bus) =>
        bus.bus_location ? (
          <Marker
            key={bus.bus_id}
            coordinate={bus.bus_location}
            title="Bus"
            description={`Tracking Bus-${bus.bus_id}`}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <Image
              source={require("../assets/images/bus-icon.png")}
              style={{ width: 30, height: 30 }}
              resizeMode="contain"
            />
          </Marker>
        ) : null
      )}
    </MapView>
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
