import axios from 'axios';

export async function fetchBusRoute(server_url, route_id) {
    try {
        const res = (await axios.get(`${server_url}/api/route/${route_id}`)).data;
        const { bus_stops } = res;

        return { route_id, bus_stops, error_msg: null };

    } catch (err) {
        console.error('Error fetching bus location:', err.message);

        return { route_id, bus_stops, error_msg: 'Failed to fetch route' };
    }
}