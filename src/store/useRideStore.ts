import { create } from "zustand";
import { Rider, riders } from "@/data/riders";

export type Coordinates = {
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
  setUserLocation: (coords: Coordinates) => void;
  setPickup: (selection: LocationSelection) => void;
  setDropoff: (selection: LocationSelection) => void;
  setSelectedRider: (rider: Rider | null) => void;
};

export const useRideStore = create<RideState>((set) => ({
  userLocation: { lat: 40.758, lng: -73.9855 }, // Default to Times Square
  pickup: null,
  dropoff: null,
  riders: riders,
  selectedRider: null,
  setUserLocation: (coords) => set({ userLocation: coords }),
  setPickup: (selection) => set({ pickup: selection }),
  setDropoff: (selection) => set({ dropoff: selection }),
  setSelectedRider: (rider) => set({ selectedRider: rider }),
}));


