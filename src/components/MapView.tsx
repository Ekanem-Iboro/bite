import type { Coordinates, Rider } from "@/store/useRideStore";

type Marker = {
  id: string;
  type: "user" | "rider" | "pickup" | "dropoff";
  coords: Coordinates;
  label?: string;
};

type Props = {
  userLocation: Coordinates | null;
  riders: Rider[];
  pickup: Coordinates | null;
  dropoff: Coordinates | null;
  selectedRiderId?: number | null;
};

// Simple Lagos-ish bounds for mapping lat/lng to a 2D area
const LAT_MIN = 6.52;
const LAT_MAX = 6.53;
const LNG_MIN = 3.37;
const LNG_MAX = 3.39;

const projectToPercent = (coords: Coordinates) => {
  const y = ((coords.lat - LAT_MIN) / (LAT_MAX - LAT_MIN)) * 100;
  const x = ((coords.lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * 100;
  return {
    top: `${100 - Math.min(100, Math.max(0, y))}%`,
    left: `${Math.min(100, Math.max(0, x))}%`,
  };
};

export const MapView = ({ userLocation, riders, pickup, dropoff, selectedRiderId }: Props) => {
  const markers: Marker[] = [];

  if (userLocation) {
    markers.push({ id: "user", type: "user", coords: userLocation, label: "You" });
  }

  riders.forEach((r) => {
    markers.push({
      id: `rider-${r.id}`,
      type: "rider",
      coords: { lat: r.lat, lng: r.lng },
      label: r.name,
    });
  });

  if (pickup) {
    markers.push({ id: "pickup", type: "pickup", coords: pickup, label: "Pickup" });
  }
  if (dropoff) {
    markers.push({ id: "dropoff", type: "dropoff", coords: dropoff, label: "Drop-off" });
  }

  return (
    <div className="w-full h-80 md:h-full rounded-3xl bg-muted relative overflow-hidden border border-border">
      <div className="absolute inset-0 bg-gradient-to-br from-accent/40 via-background to-muted" />
      <div className="absolute inset-4 rounded-2xl border border-border/60 bg-background/80 backdrop-blur-sm">
        <div className="absolute top-3 left-4 text-xs font-medium text-muted-foreground">
          Lagos · Simulated Map
        </div>
        {markers.map((marker) => {
          const pos = projectToPercent(marker.coords);
          const isSelectedRider =
            marker.type === "rider" && selectedRiderId && marker.id === `rider-${selectedRiderId}`;

          const baseColor =
            marker.type === "user"
              ? "bg-secondary text-secondary-foreground"
              : marker.type === "pickup"
              ? "bg-success text-success-foreground"
              : marker.type === "dropoff"
              ? "bg-destructive text-destructive-foreground"
              : isSelectedRider
              ? "bg-primary text-primary-foreground"
              : "bg-primary/70 text-primary-foreground";

          return (
            <div
              key={marker.id}
              style={pos}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shadow-card border border-background ${baseColor}`}
              >
                {marker.type === "user" && "U"}
                {marker.type === "rider" && "R"}
                {marker.type === "pickup" && "P"}
                {marker.type === "dropoff" && "D"}
              </div>
              {marker.label && (
                <span className="px-2 py-0.5 rounded-full bg-background/90 text-[10px] text-muted-foreground border border-border whitespace-nowrap">
                  {marker.label}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MapView;


