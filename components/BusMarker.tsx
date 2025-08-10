import { memo } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import MapView, { Marker, LatLng } from "react-native-maps";

type BusMarkerProps = {
  bus_id: string;
  bus_location: LatLng;
};

// BusMarker.tsx (top-level, outside the component)
const BUS_ICON_STYLE = {
  width: 30,
  height: 30,
};

const ANCHOR = { x: 0.5, y: 0.5 };

const BusMarker = ({ bus_id, bus_location }: BusMarkerProps) => {
  console.log(`BusMarker ${bus_id} rendering at`, bus_location);
  return (
    <Marker
      coordinate={bus_location}
      title="Bus"
      description={`Tracking Bus-${bus_id}`}
      anchor={ANCHOR}
      image={require("../assets/images/bus-icon.png")}
    >
      {/* <Image
        source={require("../assets/images/bus-icon.png")}
        style={BUS_ICON_STYLE}
        resizeMode="contain"
      /> */}
    </Marker>
  );
};

function propsAreEqual(prevProps: BusMarkerProps, nextProps: BusMarkerProps) {
  return (
    prevProps.bus_location?.latitude === nextProps.bus_location?.latitude &&
    prevProps.bus_location?.longitude === nextProps.bus_location?.longitude
  );
}

export default memo(BusMarker, propsAreEqual);
