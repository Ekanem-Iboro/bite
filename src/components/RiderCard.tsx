import { Star, Navigation, Clock } from "lucide-react";
import { Rider } from "@/data/riders";
import { Button } from "./ui/button";
import { estimateEtaMinutes } from "@/utils/geo";

interface RiderCardProps {
  rider: Rider;
  distance: number;
  onSelect: () => void;
}

const RiderCard: React.FC<RiderCardProps> = ({ rider, distance, onSelect }) => {
  const eta = estimateEtaMinutes(distance);
  return (
    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 flex items-center justify-between">
      <div className="flex items-center">
        <img
          src={rider.profileImage}
          alt={rider.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="ml-4">
          <h4 className="font-bold text-lg">{rider.name}</h4>
          <div className="flex items-center text-sm text-gray-600">
            <Star className="w-4 h-4 mr-1 text-yellow-400 fill-yellow-400" />
            <span>{rider.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600 mt-1">
            <Navigation className="w-4 h-4 mr-1" />
            <span>{distance.toFixed(2)} km away</span>
            <span className="mx-2">|</span>
            <Clock className="w-4 h-4 mr-1" />
            <span>{eta} min ETA</span>
          </div>
        </div>
      </div>
      <Button onClick={onSelect}>Select</Button>
    </div>
  );
};

export default RiderCard;