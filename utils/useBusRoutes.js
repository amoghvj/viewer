import { useEffect, useState } from 'react';
// import { fetchBusLocation } from './fetchBusLocation';
import { fetchBusRoute } from './fetchBusRoutes';
// import { fetchBusIds } from './fetchBusIds';

export function useBusRoutes(server_url, routeIds) {
    // bus_ids = await (bus_ids || fetchBusIds(server_url));

    const [busStopIds, setBusStopIds] = useState(new Set());

    const [routeData, setRouteData] = useState({});

    useEffect(() => {
        if (routeIds.length === 0) return;

        const fetchRoute = async (server_url, route_id) => {
            const data = await fetchBusRoute(server_url, route_id);

            setRouteData(prev => {
                const prevData = prev[route_id];

                if (prevData && prevData.timestamp === data.timestamp) return prev;

                return {
                    ...prev,
                    [route_id]: { ...prevData, ...data }
                }
            });
        };

        // console.log(routeIds);
        const intervals = [...routeIds].map((route_id) => {
            fetchRoute(server_url, route_id); // initial

            return setInterval(() => fetchRoute(server_url, route_id), 5000);
        })

        return () => intervals.forEach(clearInterval);

    }, [server_url, routeIds]);

    useEffect(() => {
        if (!routeData) return;

        const newSet = new Set();

        Object.values(routeData).forEach(data => {
            if (routeIds.has(data.route_id) && data.bus_stops && Array.isArray(data.bus_stops)) {
                data.bus_stops.forEach(stopId => newSet.add(stopId));
            }
        });

        // Only update state if the set changed (compare sizes and contents)
        setBusStopIds(prevBusStopIds => {
            // Compare prevBusStopIds and newSet here
            if (
                prevBusStopIds.size !== newSet.size ||
                [...prevBusStopIds].some(stop => !newSet.has(stop))
            ) {
                return newSet;
            }
            return prevBusStopIds;
        });
    }, [routeData, routeIds]);

    return { routeData, busStopIds };
}