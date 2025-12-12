import { useMemo } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useJsApiLoader,
} from "@react-google-maps/api";
import type { Coordinates } from "@/store/useRideStore";
import type { Rider } from "@/data/riders";
import { useState } from "react";
import { Loader } from "lucide-react";

type Props = {
  userLocation: Coordinates | null;
  riders: Rider[];
  pickup: Coordinates | null;
  dropoff: Coordinates | null;
  onRiderClick?: (id: number) => void;
};

const containerStyle: React.CSSProperties = {
  width: "100%",
  height: "100%",
};

const defaultCenter = { lat: 6.5244, lng: 3.3792 };

export const GoogleMapView = ({
  userLocation,
  riders,
  pickup,
  dropoff,
  onRiderClick,
}: Props) => {
  const [activeRiderId, setActiveRiderId] = useState<number | null>(null);

  const center = useMemo(
    () => userLocation || pickup || dropoff || defaultCenter,
    [userLocation, pickup, dropoff]
  );

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries: ["places"],
  });

  if (!isLoaded) {
    return (
      <div className="relative inset-0 flex items-center justify-center w-full h-full rounded-3xl bg-muted border border-border text-xs text-muted-foreground">
        <Loader className="animate-spin text-red-600" size={28} />
      </div>
    );
  }

  return (
    <div className="w-full  h-full border border-border bg-muted">
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={13}
        options={{
          disableDefaultUI: true,
          streetViewControl: true,
          mapTypeControl: false,
          fullscreenControl: false,
          rotateControl: true,
          zoomControl: true,
          styles: [],
        }}
      >
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              path: google.maps.SymbolPath.CIRCLE,
              fillColor: "#000000",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
              scale: 6,
            }}
          />
        )}

        {pickup && (
          <Marker
            position={pickup}
            label={{
              text: "Pickup",
              color: "#ffffff",
              className: "text-[10px]",
            }}
          />
        )}

        {dropoff && (
          <Marker
            position={dropoff}
            label={{
              text: "Drop-off",
              color: "#ffffff",
              className: "text-[10px]",
            }}
          />
        )}

        {riders.map((rider) => (
          <Marker
            key={rider.id}
            position={rider.location}
            onClick={() => setActiveRiderId(rider.id)}
          />
        ))}

        {activeRiderId != null && (
          <InfoWindow
            position={
              riders.find((r) => r.id === activeRiderId)?.location ?? center
            }
            onCloseClick={() => setActiveRiderId(null)}
          >
            <div className="text-xs space-y-2 min-w-[160px]">
              {(() => {
                const rider = riders.find((r) => r.id === activeRiderId);
                if (!rider) return null;
                return (
                  <>
                    <div className="flex items-center gap-2">
                      <img
                        src={rider.profileImage}
                        alt={rider.name}
                        className="w-8 h-8 rounded-full object-cover"
                      />
                      <div>
                        <p className="font-semibold text-foreground text-sm">
                          {rider.name}
                        </p>
                        <p className="text-[11px] text-muted-foreground">
                          {rider.rating.toFixed(1)} ★
                        </p>
                      </div>
                    </div>
                    {onRiderClick && (
                      <button
                        type="button"
                        onClick={() => onRiderClick(rider.id)}
                        className="text-[11px] px-2 py-1 rounded-md bg-primary text-primary-foreground w-full"
                      >
                        View profile
                      </button>
                    )}
                  </>
                );
              })()}
            </div>
          </InfoWindow>
        )}
      </GoogleMap>
    </div>
  );
};

export default GoogleMapView;
