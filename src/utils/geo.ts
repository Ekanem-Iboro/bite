import type { Coordinates, Rider } from "@/store/useRideStore";

const toRad = (value: number) => (value * Math.PI) / 180;

export const haversineDistanceKm = (a: Coordinates, b: Coordinates): number => {
  const R = 6371;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const sinDLat = Math.sin(dLat / 2);
  const sinDLng = Math.sin(dLng / 2);

  const h = sinDLat * sinDLat + Math.cos(lat1) * Math.cos(lat2) * sinDLng * sinDLng;
  const c = 2 * Math.atan2(Math.sqrt(h), Math.sqrt(1 - h));
  return R * c;
};

export const estimateFare = (distanceKm: number): number => {
  const baseFare = 300;
  const perKm = 100;
  return Math.round(baseFare + distanceKm * perKm);
};

export const sortRidersByDistance = (origin: Coordinates, riders: Rider[]) => {
  return [...riders]
    .map((rider) => {
      const distanceKm = haversineDistanceKm(origin, { lat: rider.lat, lng: rider.lng });
      return { rider, distanceKm };
    })
    .sort((a, b) => a.distanceKm - b.distanceKm);
};

export const estimateEtaMinutes = (distanceKm: number, speedKmh = 25): number => {
  if (speedKmh <= 0) return 0;
  const hours = distanceKm / speedKmh;
  return Math.max(1, Math.round(hours * 60));
};


