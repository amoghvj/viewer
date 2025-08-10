import { memo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, LatLng } from "react-native-maps";

type BusStopMarkerProps = {
  bus_stop_id: string;
  bus_stop_location: LatLng;
};

// BusMarker.tsx (top-level, outside the component)
const BUS_ICON_STYLE = {
  width: 30,
  height: 30,
};

const ANCHOR = { x: 0.5, y: 0.5 };

const BusStopMarker = ({
  bus_stop_id,
  bus_stop_location,
}: BusStopMarkerProps) => {
  console.log(`BusStopMarker ${bus_stop_id} rendering at`, bus_stop_location);
  return (
    <Marker
      coordinate={bus_stop_location}
      title="Bus Stop"
      //   description={`Tracking Bus-${bus_stop_id}`}
      anchor={ANCHOR}
      image={require("../assets/images/bus-stop-icon.png")}
    >
      {/* <Image
        source={require("../assets/images/bus-icon.png")}
        style={BUS_ICON_STYLE}
        resizeMode="contain"
      /> */}
    </Marker>
  );
};

function propsAreEqual(
  prevProps: BusStopMarkerProps,
  nextProps: BusStopMarkerProps
) {
  return (
    prevProps.bus_stop_location?.latitude ===
      nextProps.bus_stop_location?.latitude &&
    prevProps.bus_stop_location?.longitude ===
      nextProps.bus_stop_location?.longitude
  );
}

export default memo(BusStopMarker, propsAreEqual);
