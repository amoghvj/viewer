import { useEffect, useState } from 'react';
// import { fetchBusLocation } from './fetchBusLocation';
// import { fetchBusIds } from './fetchBusIds';
import { fetchBusStopLocation } from '../utils/fetchBusStopLocation';

export function useBusStopLocations(server_url, busStopIds) {
    // bus_ids = await (bus_ids || fetchBusIds(server_url));

    // const [busIds, setBusIds] = useState(busIds || []);

    const [busStopData, setBusStopData] = useState({});

    /*
    useEffect(() => {
        if (!busIds || busIds.length === 0) {
            fetchBusIds(server_url)
                .then(ids => setBusIds(ids))
                .catch(err => console.error("Error fetching bus IDs:", err));
        }
    }, [server_url, busIds]);
*/
    useEffect(() => {
        if (busStopIds.length === 0) return;

        const fetchLocation = async (server_url, bus_id) => {
            const data = await fetchBusStopLocation(server_url, bus_id);

            setBusStopData(prev => {
                const prevData = prev[bus_id];

                if (prevData && prevData.timestamp === data.timestamp) return prev;

                return {
                    ...prev,
                    [bus_id]: { ...prevData, ...data }
                }
            });
        };

        const intervals = busStopIds.map((bus_id) => {
            fetchLocation(server_url, bus_id); // initial

            return setInterval(() => fetchLocation(server_url, bus_id), 5000);
        })

        return () => intervals.forEach(clearInterval);

    }, [server_url, busStopIds]);


    return { busStopData };
}