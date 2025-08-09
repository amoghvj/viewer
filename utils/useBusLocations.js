import { useEffect, useState } from 'react';
import { fetchBusLocation } from './fetchBusLocation';
import { fetchBusIds } from './fetchBusIds';

export function useBusLocations(server_url, initial_bus_ids) {
    // bus_ids = await (bus_ids || fetchBusIds(server_url));

    const [busIds, setBusIds] = useState(initial_bus_ids || []);

    const [busData, setBusData] = useState(() =>
        busIds.map((id) => ({ bus_id: id, bus_location: null, error_msg: null }))
    );

    useEffect(() => {
        if (!initial_bus_ids || initial_bus_ids.length === 0) {
            fetchBusIds(server_url)
                .then(ids => setBusIds(ids))
                .catch(err => console.error("Error fetching bus IDs:", err));
        }
    }, [server_url, initial_bus_ids]);

    useEffect(() => {
        const fetchAllLocations = async () => {
            const updatedData = await Promise.all(
                busIds.map((bus_id) => fetchBusLocation(server_url, bus_id))
            );

            setBusData(updatedData);
        };

        fetchAllLocations()
        const interval = setInterval(fetchAllLocations, 5000);

        return () => clearInterval(interval);

    }, [server_url, busIds]);

    return busData;
}