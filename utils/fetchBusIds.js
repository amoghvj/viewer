import axios from 'axios';

export async function fetchBusIds(server_url) {
    try {
        const res = (await axios.get(`${server_url}/api/location/ids`)).data;

        return res;

    } catch (err) {
        console.error('Error fetching bus ids:', err.message);

        return [];
    }
}