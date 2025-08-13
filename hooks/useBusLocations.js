import { useEffect, useState, useRef } from 'react';
import { fetchBusLocation } from '../utils/fetchBusLocation';
import { fetchBusIds } from '../utils/fetchBusIds';

export function useBusLocations(server_url, initial_bus_ids) {
    // bus_ids = await (bus_ids || fetchBusIds(server_url));

    const [busIds, setBusIds] = useState(initial_bus_ids || new Set());

    const [initialBusIds, setInitialBusIds] = useState(initial_bus_ids || new Set())

    const didSetInitialBusIds = useRef(false);

    const [routeIds, setRouteIds] = useState(new Set());

    const [busData, setBusData] = useState({});

    useEffect(() => {
        if (!initial_bus_ids || initial_bus_ids.length === 0) {
            fetchBusIds(server_url)
                .then(ids => {
                    setBusIds(new Set(ids));
                })
                .catch(err => console.error("Error fetching bus IDs:", err));
        }
    }, [server_url, initial_bus_ids]);

    useEffect(() => {
        if ((!initial_bus_ids || initial_bus_ids.length === 0) && !didSetInitialBusIds.current) {
            fetchBusIds(server_url)
                .then(ids => {
                    setInitialBusIds(new Set(ids));
                    didSetInitialBusIds.current = true;
                })
                .catch(err => console.error("Error fetching bus IDs:", err));
        }
    }, []);


    useEffect(() => {
        if (busIds.length === 0) return;

        const fetchLocation = async (server_url, bus_id) => {
            const data = await fetchBusLocation(server_url, bus_id);
            // console.log('\nfetched data', data)

            setBusData(prev => {
                const prevData = prev[bus_id];

                if (prevData && prevData.timestamp === data.timestamp) return prev;

                return {
                    ...prev,
                    [bus_id]: { ...prevData, ...data }
                }
            });
        };

        const intervals = [...busIds].map((bus_id) => {
            fetchLocation(server_url, bus_id); // initial

            return setInterval(() => fetchLocation(server_url, bus_id), 5000);
        })

        return () => intervals.forEach(clearInterval);

    }, [server_url, busIds]);

    useEffect(() => {
        if (!busData) return;

        const newSet = new Set();

        // console.log(busIds)
        // console.log(busData)
        // console.log("\nCurrent busData:", busData);

        Object.values(busData).forEach(data => {
            // console.log(busIds.includes(data.bus_id) && data.route_id, data)
            if (busIds.has(data.bus_id) && data.route_id) {
                newSet.add(data.route_id);
            }
        });

        // Only update state if the set changed (compare sizes and contents)
        setRouteIds(prevRouteIds => {
            // Compare prevBusStopIds and newSet here
            if (
                prevRouteIds.size !== newSet.size ||
                [...prevRouteIds].some(stop => !newSet.has(stop))
            ) {
                return newSet;
            }
            return prevRouteIds;
        });
    }, [busIds, busData]);

    return { busData, busIds, routeIds, setBusIds, initialBusIds };
}