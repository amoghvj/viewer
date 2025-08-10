import axios from 'axios';

export async function fetchBusLocation(server_url, bus_id) {
    try {
        const res = (await axios.get(`${server_url}/api/bus/${bus_id}`)).data;
        // console.log("\nfetched bus", res)
        const { latitude, longitude, timestamp, route_id } = res;

        return { bus_id, bus_location: { latitude, longitude }, error_msg: null, timestamp, route_id };

    } catch (err) {
        console.error('Error fetching bus location:', err.message);

        return { bus_id, bus_location: null, error_msg: 'Failed to fetch bus location' };
    }
}