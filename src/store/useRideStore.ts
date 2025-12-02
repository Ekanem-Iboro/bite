import { create } from "zustand";

export type Coordinates = {
  lat: number;
  lng: number;
};

export type Rider = {
  id: number;
  name: string;
  rating: number;
  ratingCount: number;
  vehicle: string;
  image: string;
  totalTrips: number;
  totalKm: number;
  lat: number;
  lng: number;
};

export type LocationSelection = {
  label: string;
  coords: Coordinates;
};

type RideState = {
  userLocation: Coordinates | null;
  pickup: LocationSelection | null;
  dropoff: LocationSelection | null;
  riders: Rider[];
  selectedRider: Rider | null;
  updateRiderRating: (id: number, newRating: number) => void;
  setUserLocation: (coords: Coordinates) => void;
  setPickup: (selection: LocationSelection) => void;
  setDropoff: (selection: LocationSelection) => void;
  setSelectedRider: (rider: Rider | null) => void;
};

const dummyRiders: Rider[] = [
  {
    id: 1,
    name: "Rider John",
    rating: 4.7,
    ratingCount: 120,
    vehicle: "Bike",
    image: "/src/assets/3@300x-100.jpg",
    totalTrips: 320,
    totalKm: 1840,
    lat: 6.5244,
    lng: 3.3792,
  },
  {
    id: 2,
    name: "Rider Mary",
    rating: 4.2,
    ratingCount: 98,
    vehicle: "Keke",
    image: "/src/assets/4@300x-100.jpg",
    totalTrips: 250,
    totalKm: 1320,
    lat: 6.527,
    lng: 3.3732,
  },
];

export const useRideStore = create<RideState>((set) => ({
  userLocation: { lat: 6.5244, lng: 3.3792 },
  pickup: null,
  dropoff: null,
  riders: dummyRiders,
  selectedRider: null,
  updateRiderRating: (id, newRating) =>
    set((state) => {
      const riders = state.riders.map((r) => {
        if (r.id !== id) return r;
        const totalScore = r.rating * r.ratingCount + newRating;
        const newCount = r.ratingCount + 1;
        return {
          ...r,
          ratingCount: newCount,
          rating: parseFloat((totalScore / newCount).toFixed(1)),
        };
      });
      const selectedRider =
        state.selectedRider && state.selectedRider.id === id
          ? riders.find((r) => r.id === id) ?? state.selectedRider
          : state.selectedRider;
      return { riders, selectedRider };
    }),
  setUserLocation: (coords) => set({ userLocation: coords }),
  setPickup: (selection) => set({ pickup: selection }),
  setDropoff: (selection) => set({ dropoff: selection }),
  setSelectedRider: (rider) => set({ selectedRider: rider }),
}));


