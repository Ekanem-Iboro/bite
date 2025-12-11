import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  MessageCircle,
  Phone,
  Star,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import GoogleMapView from "@/components/GoogleMapView";
import { useRideStore } from "@/store/useRideStore";
import { estimateEtaMinutes, haversineDistanceKm } from "@/utils/geo";
import { Progress } from "@/components/ui/progress";

const MOVE_INTERVAL_MS = 2000; // Update every 2 seconds for smoother animation

const Tracking = () => {
  const { riderId } = useParams<{ riderId: string }>();
  const { userLocation, pickup, dropoff, riders, selectedRider } =
    useRideStore();

  const handleWhatsApp = () => {
    // Format phone number for WhatsApp (remove spaces, dashes, etc.)
    const phoneNumber = "1234567890"; // Replace with actual rider phone
    window.open(`https://wa.me/${phoneNumber}`, "_blank");
  };

  const handleCall = () => {
    window.location.href = "tel:+1234567890";
  };
  //
  const rider = useMemo(() => {
    const idNum = Number(riderId);
    return riders.find((r) => r.id === idNum) ?? selectedRider;
  }, [riderId, riders, selectedRider]);

  const [simulatedCoords, setSimulatedCoords] = useState(
    rider ? rider.location : null
  );
  const [panelOpen, setPanelOpen] = useState(true);

  const pickupTarget = pickup?.coords ?? userLocation;

  const navigate = useNavigate();
  useEffect(() => {
    if (!rider || !pickupTarget) return;

    let traveled = 0;

    const interval = setInterval(() => {
      setSimulatedCoords((prev) => {
        if (!prev) return null;
        // Move rider towards pickup location
        const remainingDistance = haversineDistanceKm(prev, pickupTarget);
        if (remainingDistance < 0.01) {
          clearInterval(interval);
          return prev;
        }

        const step = Math.min(0.1, remainingDistance * 0.1); // Move 10% of remaining dist or 100m
        traveled += step;
        const bearing = Math.atan2(
          pickupTarget.lng - prev.lng,
          pickupTarget.lat - prev.lat
        );
        const lat = prev.lat + (step / 111.32) * Math.cos(bearing);
        const lng =
          prev.lng +
          (step / (111.32 * Math.cos((prev.lat * Math.PI) / 180))) *
            Math.sin(bearing);

        return { lat, lng };
      });
    }, MOVE_INTERVAL_MS);

    return () => clearInterval(interval);
  }, [rider, pickupTarget]);

  const remainingDistance = useMemo(() => {
    if (!simulatedCoords || !pickupTarget) return null;
    return haversineDistanceKm(simulatedCoords, pickupTarget);
  }, [simulatedCoords, pickupTarget]);

  const remainingEta = useMemo(() => {
    if (remainingDistance === null) return null;
    return estimateEtaMinutes(remainingDistance);
  }, [remainingDistance]);

  const initialDistance = useMemo(() => {
    if (!rider || !pickupTarget) return null;
    return haversineDistanceKm(rider.location, pickupTarget);
  }, [rider, pickupTarget]);

  const progressValue = useMemo(() => {
    if (initialDistance === null || remainingDistance === null) return 0;
    if (initialDistance === 0) return 100;
    return Math.max(0, 100 - (remainingDistance / initialDistance) * 100);
  }, [initialDistance, remainingDistance]);

  if (!rider || !pickupTarget) {
    // Navigate back or show error if essential data is missing
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading trip details...</p>
      </div>
    );
  }
  const handleRiderMarkerClick = (riderId: number) => {
    const rider = riders.find((r) => r.id === riderId);
    if (rider) {
      // For now, we just log it. The user wants to go to the rider profile page.
      // We will implement this later.
      console.log("Rider clicked:", rider);
      navigate(`/rider/${rider.id}`);
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <div className="absolute top-0 left-0 w-full h-full">
        <GoogleMapView
          userLocation={userLocation}
          riders={
            simulatedCoords ? [{ ...rider, location: simulatedCoords }] : []
          }
          pickup={pickup?.coords}
          dropoff={dropoff?.coords}
          onRiderClick={handleRiderMarkerClick}
        />
      </div>

      <div
        className={`absolute bottom-[80px] left-0 right-0 mx-auto bg-white shadow-2xl p-6 transition-transform duration-300 z-10 md:w-[50%] "
        }`}
      >
        <div className="flex justify-between items-center cursor-pointer">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ChevronLeft />
          </Button>
          <h2 className="text-2xl font-bold">
            {remainingEta !== null
              ? `Arriving in ${remainingEta} min`
              : "En route"}
          </h2>
        </div>

        <div className="mt-4">
          <Progress value={progressValue} className="w-full" />
          <p className="text-sm text-gray-500 mt-2">
            {remainingDistance !== null
              ? `${remainingDistance.toFixed(2)} km to pickup`
              : "Calculating..."}
          </p>
        </div>

        <div className="border-t border-gray-200 mt-6 pt-6">
          <div className="flex items-center">
            <img
              src={rider.profileImage}
              alt={rider.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="ml-4 flex-1">
              <h3 className="text-xl font-bold">{rider.name}</h3>
              <div className="flex items-center mt-1">
                <Star className="text-yellow-400 fill-yellow-400" size={20} />
                <span className="ml-1 font-bold">
                  {rider.rating.toFixed(1)}
                </span>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button size="icon" variant="outline" onClick={handleCall}>
                <Phone />
              </Button>
              <Button size="icon" variant="outline" onClick={handleWhatsApp}>
                <MessageCircle />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
