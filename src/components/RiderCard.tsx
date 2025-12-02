import { Star } from "lucide-react";
import type { Rider } from "@/store/useRideStore";

type Props = {
  rider: Rider;
  distanceKm: number;
  etaMinutes: number;
  trips?: number;
  onSelect?: () => void;
  selected?: boolean;
};

export const RiderCard = ({ rider, distanceKm, etaMinutes, trips = 120, onSelect, selected }: Props) => {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`w-full text-left rounded-2xl border px-4 py-3 flex items-center justify-between gap-3 transition-all card-elevated ${
        selected ? "border-primary ring-2 ring-primary/40 bg-accent/40" : "border-border bg-card"
      }`}
    >
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-sm text-foreground">{rider.name}</span>
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            {rider.rating.toFixed(1)}
            <span className="text-[10px] text-muted-foreground/70">({trips} trips)</span>
          </span>
        </div>
        <p className="text-xs text-muted-foreground">{rider.vehicle}</p>
        <div className="flex gap-3 mt-1 text-[11px] text-muted-foreground">
          <span>{distanceKm.toFixed(2)} km away</span>
          <span>·</span>
          <span>ETA {etaMinutes} mins</span>
        </div>
      </div>
      <div className="px-3 py-1 rounded-full bg-primary/10 text-primary text-[11px] font-medium">
        Select
      </div>
    </button>
  );
};

export default RiderCard;


