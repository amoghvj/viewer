import { memo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, LatLng, Polyline } from "react-native-maps";

type BusRouteProps = {
  route_id: string;
  coordinates: LatLng[];
};

// BusMarker.tsx (top-level, outside the component)
const BUS_ICON_STYLE = {
  width: 30,
  height: 30,
};

const ANCHOR = { x: 0.5, y: 0.5 };

const BusRoute = ({ route_id, coordinates }: BusRouteProps) => {
  //   console.log(`BusStopMarker ${bus_stop_id} rendering at`, bus_stop_location);
  return (
    <Polyline coordinates={coordinates} strokeColor="#000" strokeWidth={4} />
  );
};

function propsAreEqual(prevProps: BusRouteProps, nextProps: BusRouteProps) {
  return (
    prevProps.route_id === nextProps.route_id &&
    prevProps.coordinates === nextProps.coordinates
  );
}

export default memo(BusRoute, propsAreEqual);
