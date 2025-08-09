import axios from 'axios';

export async function fetchBusLocation(server_url, bus_id) {
    try {
        const res = (await axios.get(`${server_url}/api/location/${bus_id}`)).data;
        const { latitude, longitude } = res;

        return { bus_id, bus_location: { latitude, longitude }, error_msg: null };

    } catch (err) {
        console.error('Error fetching bus location:', err.message);

        return { bus_id, bus_location: null, error_msg: 'Failed to fetch bus location' };
    }
}