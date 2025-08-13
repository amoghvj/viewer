import { Image, StyleSheet, Text, View } from "react-native";
import MapView, {
  PROVIDER_GOOGLE,
  LatLng,
  PROVIDER_DEFAULT,
} from "react-native-maps";
import BusMarker from "./BusMarker";
import { useMemo } from "react";
import BusStopMarker from "./BusStopMarker";
import BusRoute from "./BusRoute";

type BusDataItem = {
  bus_id: string;
  bus_location: LatLng | null;
  error_msg: string | null;
};

type BusStopDataItem = {
  bus_stop_id: string;
  bus_stop_location: LatLng | null;
  error_msg: string | null;
};

type RouteDataItem = {
  route_id: string;
  bus_stops: [string];
  coordinates: LatLng[];
};

type Props = {
  busData: Record<string, BusDataItem>;
  busStopData: Record<string, BusStopDataItem>;
  location_focus: LatLng;
  busIds: Set<string>;
  routeIds: Set<string>;
  busStopIds: Set<string>;
  routeData: Record<string, RouteDataItem>;
};

export default function Map({
  busData,
  location_focus,
  busIds,
  busStopIds,
  routeIds,
  busStopData,
  routeData,
}: Props) {
  console.log(`Map rendering `);
  const visibleBusData = useMemo(() => {
    return Object.entries(busData).filter(([id]) => busIds.has(id));
  }, [busData, busIds]);
  //   console.log("Stops", busStopData, busStopIds);
  const visibleBusStopData = useMemo(() => {
    return Object.entries(busStopData).filter(([id]) => busStopIds.has(id));
  }, [busStopData, busStopIds]);
  const visibleRouteData = useMemo(() => {
    return Object.entries(routeData).filter(([id]) => routeIds.has(id));
  }, [routeData, routeIds]);
  return (
    <MapView
      style={styles.map}
      initialRegion={{
        latitude: location_focus.latitude,
        longitude: location_focus.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      }}
      provider={PROVIDER_DEFAULT}
    >
      {visibleBusData.map(([bus_id, bus]) =>
        bus.bus_location ? (
          <BusMarker
            key={bus_id}
            bus_id={bus_id}
            bus_location={bus.bus_location}
          />
        ) : null
      )}
      {visibleBusStopData.map(([bus_stop_id, bus_stop]) =>
        bus_stop.bus_stop_location ? (
          <BusStopMarker
            key={bus_stop_id}
            bus_stop_id={bus_stop_id}
            bus_stop_location={bus_stop.bus_stop_location}
          />
        ) : null
      )}
      {visibleRouteData.map(([route_id, route]) =>
        route.coordinates && route.coordinates.length != 0 ? (
          <BusRoute
            key={route_id}
            route_id={route_id}
            coordinates={route.coordinates}
          />
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
