import axios from 'axios';

export async function fetchBusStopLocation(server_url, bus_stop_id) {
    try {
        const res = (await axios.get(`${server_url}/api/bus_stop/${bus_stop_id}`)).data;
        const { latitude, longitude } = res;

        return { bus_stop_id, bus_stop_location: { latitude, longitude }, error_msg: null };

    } catch (err) {
        console.error('Error fetching bus stop location:', err.message);

        return { bus_stop_id, bus_stop_location: null, error_msg: 'Failed to fetch bus stop location' };
    }
}