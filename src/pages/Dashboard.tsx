import { useEffect, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleMapView from "@/components/GoogleMapView";
import RiderCard from "@/components/RiderCard";
import { useAuthStore } from "@/store/useAuthStore";
import { useRideStore } from "@/store/useRideStore";
import {
  estimateEtaMinutes,
  estimateFare,
  haversineDistanceKm,
  sortRidersByDistance,
} from "@/utils/geo";
import dashboardImage from "@/assets/ios-app-icon-mockup-iphone-16-pro-mockups-v1-front-vew.jpg";
import logoImage from "@/assets/logo.png";
import AdCarousel from "@/components/AdCarousel";
import AppFooter from "@/components/layout/AppFooter";

const presetLocations = [
  { label: "Victoria Island", lat: 6.4281, lng: 3.4219 },
  { label: "Lekki Phase 1", lat: 6.4433, lng: 3.4723 },
  { label: "Yaba", lat: 6.5174, lng: 3.3869 },
  { label: "Ikeja", lat: 6.6018, lng: 3.3515 },
];

type TripForm = {
  pickup: string;
  dropoff: string;
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { currentUser, signOut } = useAuthStore();
  const {
    userLocation,
    pickup,
    dropoff,
    riders,
    setPickup,
    setDropoff,
    setSelectedRider,
    selectedRider,
  } = useRideStore();

  const { register, handleSubmit, setValue, watch } = useForm<TripForm>({
    defaultValues: {
      pickup: pickup?.label ?? "",
      dropoff: dropoff?.label ?? "",
    },
  });

  const pickupText = watch("pickup");
  const dropoffText = watch("dropoff");

  useEffect(() => {
    if (!pickup && userLocation) {
      setPickup({ label: "Current location", coords: userLocation });
      setValue("pickup", "Current location");
    }
  }, [pickup, setPickup, userLocation, setValue]);

  const handleApplyLocations = (data: TripForm) => {
    if (userLocation && !pickupText.trim()) {
      setPickup({ label: "Current location", coords: userLocation });
      setValue("pickup", "Current location");
    } else if (data.pickup.trim() && userLocation) {
      setPickup({ label: data.pickup.trim(), coords: userLocation });
    }

    const fallbackDrop = data.dropoff.trim() || "Destination";
    const coords =
      userLocation && !dropoff
        ? { lat: userLocation.lat + 0.01, lng: userLocation.lng + 0.01 }
        : dropoff?.coords ?? { lat: 6.527, lng: 3.3732 };

    setDropoff({ label: fallbackDrop, coords });
  };

  const nearestRiders = useMemo(() => {
    if (!userLocation) return [];
    return sortRidersByDistance(userLocation, riders);
  }, [userLocation, riders]);

  const tripInfo = useMemo(() => {
    if (!pickup || !dropoff) return null;
    const distanceKm = haversineDistanceKm(pickup.coords, dropoff.coords);
    const fare = estimateFare(distanceKm);
    const eta = estimateEtaMinutes(distanceKm);
    return { distanceKm, fare, eta };
  }, [pickup, dropoff]);

  const handleSelectPreset = (label: string) => {
    const found = presetLocations.find((l) => l.label === label);
    if (!found) return;
    setDropoff({
      label: found.label,
      coords: { lat: found.lat, lng: found.lng },
    });
    setValue("dropoff", found.label);
  };

  const handleStartTracking = () => {
    if (!selectedRider) return;
    navigate(`/tracking/${selectedRider.id}`);
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/60">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <img src={logoImage} alt="Logo" className="h-14 w-auto" />
            <div>
              <p className="font-heading font-semibold text-base leading-tight text-foreground">
                Dashboard
              </p>
              <p className="text-sm text-muted-foreground leading-tight">
                Signed in as{" "}
                <span className="font-medium text-foreground">
                  {currentUser?.name}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                signOut();
                navigate("/signin", { replace: true });
              }}
            >
              Sign out
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-6 grid lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] gap-6">
        <section className="flex flex-col gap-4">
          <div className="rounded-3xl border border-border bg-card card-elevated p-4 sm:p-5 flex flex-col gap-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="font-heading text-lg font-semibold">
                  Plan your trip
                </h2>
                <p className="text-xs text-muted-foreground">
                  Enter pickup and drop-off details. We&apos;ll calculate
                  distance, fare, and ETA.
                </p>
              </div>
              <img
                src={dashboardImage}
                alt="Mobile preview"
                className="hidden sm:block w-16 h-16 rounded-2xl object-cover border border-border"
              />
            </div>

            <form
              onSubmit={handleSubmit(handleApplyLocations)}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label
                    className="text-[11px] font-medium text-muted-foreground"
                    htmlFor="pickup"
                  >
                    Pickup
                  </label>
                  <Input
                    id="pickup"
                    placeholder="E.g. Yaba, Lagos"
                    {...register("pickup")}
                  />
                </div>
                <div className="space-y-1">
                  <label
                    className="text-[11px] font-medium text-muted-foreground"
                    htmlFor="dropoff"
                  >
                    Drop-off
                  </label>
                  <Input
                    id="dropoff"
                    placeholder="E.g. Lekki Phase 1"
                    {...register("dropoff")}
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {presetLocations.map((loc) => (
                  <button
                    key={loc.label}
                    type="button"
                    onClick={() => handleSelectPreset(loc.label)}
                    className="text-[11px] px-2.5 py-1 rounded-full bg-accent text-accent-foreground border border-border hover:bg-accent/80"
                  >
                    {loc.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-muted-foreground">
                  <p>Fare = 300 + (distance × 100)</p>
                </div>
                <Button size="sm" variant="hero" type="submit">
                  Apply locations
                </Button>
              </div>
            </form>

            {tripInfo && (
              <div className="mt-2 rounded-2xl bg-accent/60 border border-accent/60 px-3 py-2 text-xs flex flex-wrap gap-4">
                <span>
                  Distance:{" "}
                  <span className="font-semibold text-foreground">
                    {tripInfo.distanceKm.toFixed(2)} km
                  </span>
                </span>
                <span>
                  Estimated fare:{" "}
                  <span className="font-semibold text-foreground">
                    ₦{tripInfo.fare.toLocaleString()}
                  </span>
                </span>
                <span>
                  ETA:{" "}
                  <span className="font-semibold text-foreground">
                    {tripInfo.eta} mins
                  </span>
                </span>
              </div>
            )}
          </div>
          <div className="mt-4">
            <AdCarousel title="Sponsored" />
          </div>

          <div className="flex-1 min-h-[280px]">
            <GoogleMapView
              userLocation={userLocation}
              riders={riders}
              pickup={pickup?.coords ?? null}
              dropoff={dropoff?.coords ?? null}
              onRiderClick={(id) => navigate(`/riders/${id}`)}
            />
          </div>
        </section>

        <aside className="flex flex-col gap-4">
          <div className="rounded-3xl border border-border bg-card card-elevated p-4 sm:p-5 flex flex-col gap-4 max-h-[520px]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-heading text-base font-semibold">
                  Nearby riders
                </h3>
                <p className="text-xs text-muted-foreground">
                  Sorted by shortest distance from your current location.
                </p>
              </div>
              <span className="inline-flex items-center justify-center text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                {riders.length} available
              </span>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar space-y-3 pr-1">
              {userLocation ? (
                nearestRiders.map(({ rider, distanceKm }) => {
                  const eta = estimateEtaMinutes(distanceKm);
                  return (
                    <RiderCard
                      key={rider.id}
                      rider={rider}
                      distanceKm={distanceKm}
                      etaMinutes={eta}
                      onSelect={() => setSelectedRider(rider)}
                      selected={selectedRider?.id === rider.id}
                    />
                  );
                })
              ) : (
                <p className="text-xs text-muted-foreground">
                  Waiting for user location. Using a fixed Lagos point.
                </p>
              )}
            </div>

            <Button
              size="sm"
              variant="hero"
              className="w-full mt-1"
              disabled={!selectedRider}
              onClick={handleStartTracking}
            >
              {selectedRider
                ? `Start tracking ${selectedRider.name}`
                : "Select a rider to start tracking"}
            </Button>
          </div>

          <div className="rounded-3xl border border-dashed border-border/70 bg-muted/40 p-4 text-[11px] text-muted-foreground">
            <p className="font-semibold text-foreground mb-1">About this app</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Authentication and rider data are stored in your browser.</li>
              <li>Rider locations are around Lagos for demonstration.</li>
              <li>Use the profile page to see more stats and leave ratings.</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-border bg-card p-4 text-sm">
            <h4 className="font-heading text-base font-semibold mb-2">
              Contact Us
            </h4>
            <p className="text-sm text-muted-foreground mb-3">
              Questions or feedback? Our team is happy to help. Reach out to us
              anytime.
            </p>
            <div className="flex gap-2">
              <Button asChild>
                <Link to="/contact">Contact page</Link>
              </Button>
              <Button variant="outline" asChild>
                <a href="mailto:support@officefeasthub.com">Email us</a>
              </Button>
            </div>
          </div>
        </aside>
      </main>
      <AppFooter />
    </div>
  );
};

export default Dashboard;
