import { useState, useEffect, useCallback, useRef } from "react";
import { buses as initialBuses, routes as routeData } from "@/data/mockData";
import type { Bus } from "@/data/mockData";

interface RealtimeBusState {
  buses: Bus[];
  activeBuses: Set<string>;
}

// Global state for real-time bus tracking
let realtimeBusState: RealtimeBusState = {
  buses: [...initialBuses],
  activeBuses: new Set(),
};

// Listeners for bus updates
const updateListeners = new Set<(buses: Bus[]) => void>();

export const notifyBusUpdate = (buses: Bus[]) => {
  updateListeners.forEach((listener) => listener(buses));
};

export const subscribeToBusUpdates = (listener: (buses: Bus[]) => void) => {
  updateListeners.add(listener);
  return () => {
    updateListeners.delete(listener);
  };
};

export const startBusRoute = (driverId: string, busId: string, routeId: string) => {
  const bus = realtimeBusState.buses.find((b) => b.id === busId);
  if (bus) {
    bus.status = "active";
    realtimeBusState.activeBuses.add(busId);
    notifyBusUpdate([...realtimeBusState.buses]);
    
    // Start simulating GPS updates
    simulateGPSTracking(busId, routeId);
  }
};

export const stopBusRoute = (busId: string) => {
  const bus = realtimeBusState.buses.find((b) => b.id === busId);
  if (bus) {
    bus.status = "idle";
    realtimeBusState.activeBuses.delete(busId);
    notifyBusUpdate([...realtimeBusState.buses]);
  }
};

interface GPSSimulation {
  stopIndex: number;
  progress: number;
  intervalId: NodeJS.Timeout | null;
}

const gpsSimulations = new Map<string, GPSSimulation>();

const calculateHeading = (from: [number, number], to: [number, number]) => {
  const lat1 = (from[0] * Math.PI) / 180;
  const lat2 = (to[0] * Math.PI) / 180;
  const dLng = ((to[1] - from[1]) * Math.PI) / 180;

  const y = Math.sin(dLng) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLng);
  const heading = (Math.atan2(y, x) * 180) / Math.PI;

  return (heading + 360) % 360;
};

const interpolatePosition = (
  from: [number, number],
  to: [number, number],
  progress: number
): [number, number] => {
  return [
    from[0] + (to[0] - from[0]) * progress,
    from[1] + (to[1] - from[1]) * progress,
  ];
};

const simulateGPSTracking = (busId: string, routeId: string) => {
  const route = routeData.find((r) => r.id === routeId);
  if (!route) return;

  // Stop any existing simulation
  const existing = gpsSimulations.get(busId);
  if (existing?.intervalId) {
    clearInterval(existing.intervalId);
  }

  const simulation: GPSSimulation = {
    stopIndex: 0,
    progress: 0,
    intervalId: null,
  };

  const updatePosition = () => {
    const bus = realtimeBusState.buses.find((b) => b.id === busId);
    if (!bus || !realtimeBusState.activeBuses.has(busId)) {
      if (simulation.intervalId) clearInterval(simulation.intervalId);
      gpsSimulations.delete(busId);
      return;
    }

    const stops = route.stops;
    if (simulation.stopIndex >= stops.length - 1) {
      // Route complete
      stopBusRoute(busId);
      if (simulation.intervalId) clearInterval(simulation.intervalId);
      gpsSimulations.delete(busId);
      return;
    }

    const currentStop = stops[simulation.stopIndex];
    const nextStop = stops[simulation.stopIndex + 1];

    // Simulate movement between stops (takes about 30 seconds per segment in simulation)
    simulation.progress += 0.05; // This completes a segment in ~20 updates (2 seconds)

    if (simulation.progress >= 1) {
      // Move to next stop
      simulation.stopIndex++;
      simulation.progress = 0;

      if (simulation.stopIndex >= stops.length - 1) {
        // Route complete
        const finalStop = stops[stops.length - 1];
        bus.lat = finalStop.lat;
        bus.lng = finalStop.lng;
        stopBusRoute(busId);
        if (simulation.intervalId) clearInterval(simulation.intervalId);
        gpsSimulations.delete(busId);
        notifyBusUpdate([...realtimeBusState.buses]);
        return;
      }

      const nextNextStop = stops[simulation.stopIndex + 1];
      const heading = calculateHeading(
        [stops[simulation.stopIndex].lat, stops[simulation.stopIndex].lng],
        [nextNextStop.lat, nextNextStop.lng]
      );
      bus.heading = heading;
    } else {
      // Interpolate position between stops
      const [interpLat, interpLng] = interpolatePosition(
        [currentStop.lat, currentStop.lng],
        [nextStop.lat, nextStop.lng],
        simulation.progress
      );
      bus.lat = interpLat;
      bus.lng = interpLng;

      // Update heading
      const heading = calculateHeading(
        [currentStop.lat, currentStop.lng],
        [nextStop.lat, nextStop.lng]
      );
      bus.heading = heading;
    }

    notifyBusUpdate([...realtimeBusState.buses]);
  };

  // Update position every 100ms (10 updates per second)
  simulation.intervalId = setInterval(updatePosition, 100);
  gpsSimulations.set(busId, simulation);
};

export const useRealtimeBus = () => {
  const [buses, setBuses] = useState<Bus[]>([...realtimeBusState.buses]);
  const unsubscribeRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    // Subscribe to bus updates
    unsubscribeRef.current = subscribeToBusUpdates((updatedBuses) => {
      setBuses([...updatedBuses]);
    });

    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  return {
    buses,
    activeBuses: realtimeBusState.activeBuses,
    startRoute: startBusRoute,
    stopRoute: stopBusRoute,
  };
};
