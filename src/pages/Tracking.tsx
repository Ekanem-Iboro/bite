import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft, MessageCircle, Phone, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import GoogleMapView from "@/components/GoogleMapView";
import { useRideStore } from "@/store/useRideStore";
import { estimateEtaMinutes, haversineDistanceKm } from "@/utils/geo";
import { Progress } from "@/components/ui/progress";

const MOVE_INTERVAL_MS = 2000;

const Tracking = () => {
  const { riderId } = useParams<{ riderId: string }>();
  const { userLocation, pickup, dropoff, riders, selectedRider } =
    useRideStore();
  const navigate = useNavigate();

  const rider = useMemo(() => {
    const idNum = Number(riderId);
    return riders.find((r) => r.id === idNum) ?? selectedRider;
  }, [riderId, riders, selectedRider]);

  const [simulatedCoords, setSimulatedCoords] = useState(
    rider ? rider.location : null
  );

  const pickupTarget = pickup?.coords ?? userLocation;

  useEffect(() => {
    if (!rider || !pickupTarget) return;

    const interval = setInterval(() => {
      setSimulatedCoords((prev) => {
        if (!prev) return null;
        const remainingDistance = haversineDistanceKm(prev, pickupTarget);
        if (remainingDistance < 0.01) {
          clearInterval(interval);
          return prev;
        }

        const step = Math.min(0.1, remainingDistance * 0.1);
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

  const handleRiderMarkerClick = (riderId: number) => {
    const rider = riders.find((r) => r.id === riderId);
    if (rider) {
      navigate(`/rider/${rider.id}`);
    }
  };

  const handleSMS = () => {
    const phoneNumber = "1234567890";
    window.location.href = `sms:${phoneNumber}?body=Hi, I would like to inquire about my ride.`;
  };
  const handleCall = () => {
    window.location.href = "tel:+1234567890";
  };

  if (!rider || !pickupTarget) {
    return (
      <div className="flex items-center justify-center h-screen w-screen">
        <p>Loading trip details...</p>
      </div>
    );
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      {/* Map Section - Takes remaining space */}
      <div className="flex-1 relative">
        <GoogleMapView
          userLocation={userLocation}
          riders={
            simulatedCoords ? [{ ...rider, location: simulatedCoords }] : []
          }
          pickup={pickup?.coords}
          dropoff={dropoff?.coords}
          onRiderClick={handleRiderMarkerClick}
        />

        {/* Back Button Overlay */}
        <div className="absolute top-4 left-4 z-10">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => navigate(-1)}
            className="shadow-lg bg-white hover:bg-gray-100"
          >
            <ChevronLeft className="w-5 h-5 text-red-700" />
          </Button>
        </div>
      </div>

      {/* Bottom Info Panel - Fixed height */}
      <div className="bg-white border-t border-gray-200 shadow-2xl">
        {/* ETA Section */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900">
              {remainingEta !== null ? `${remainingEta} min` : "Calculating..."}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              {remainingDistance !== null
                ? `${remainingDistance.toFixed(2)} km away`
                : "Estimating arrival"}
            </p>
          </div>
          <Progress value={progressValue} className="w-full mt-3 h-2" />
        </div>

        {/* Driver Info Section */}
        <div className="px-4 py-4">
          <div className="flex items-center gap-3">
            <img
              src={rider.profileImage}
              alt={rider.name}
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-200"
            />
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-bold text-gray-900 truncate">
                {rider.name}
              </h3>
              <div className="flex items-center gap-1 mt-0.5">
                <Star className="text-yellow-400 fill-yellow-400 w-4 h-4" />
                <span className="text-sm font-semibold text-gray-700">
                  {rider.rating.toFixed(1)}
                </span>
                {/* <span className="text-sm text-gray-500 ml-1">
                  • {rider. || "Standard"}
                </span> */}
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                size="icon"
                variant="outline"
                onClick={handleCall}
                className="h-11 w-11 rounded-full"
              >
                <Phone className="w-5 h-5" />
              </Button>
              <Button
                size="icon"
                variant="outline"
                onClick={handleSMS}
                className="h-11 w-11 rounded-full"
              >
                <MessageCircle className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tracking;
