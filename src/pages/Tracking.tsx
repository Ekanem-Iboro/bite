import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GoogleMapView from "@/components/GoogleMapView";
import { useRideStore } from "@/store/useRideStore";
import { estimateEtaMinutes, estimateFare, haversineDistanceKm } from "@/utils/geo";
import AppFooter from "@/components/layout/AppFooter";

const MOVE_INTERVAL_MS = 3000;

const Tracking = () => {
    const navigate = useNavigate();
    const { riderId } = useParams<{ riderId: string }>();
    const { userLocation, pickup, dropoff, riders, selectedRider } = useRideStore();

    const rider = useMemo(() => {
        const idNum = Number(riderId);
        return riders.find((r) => r.id === idNum) ?? selectedRider ?? riders[0];
    }, [riderId, riders, selectedRider]);

    const [simulatedCoords, setSimulatedCoords] = useState(
        rider ? { lat: rider.lat, lng: rider.lng } : userLocation ?? { lat: 6.5244, lng: 3.3792 },
    );
    const [elapsedSeconds, setElapsedSeconds] = useState(0);

    const target = pickup?.coords ?? userLocation ?? { lat: 6.5244, lng: 3.3792 };

    useEffect(() => {
        if (!rider) return;
        setSimulatedCoords({ lat: rider.lat, lng: rider.lng });
        setElapsedSeconds(0);
    }, [rider]);

    useEffect(() => {
        const interval = setInterval(() => {
            setElapsedSeconds((prev) => prev + MOVE_INTERVAL_MS / 1000);
            setSimulatedCoords((prev) => {
                const factor = 0.2;
                const lat = prev.lat + (target.lat - prev.lat) * factor;
                const lng = prev.lng + (target.lng - prev.lng) * factor;
                return { lat, lng };
            });
        }, MOVE_INTERVAL_MS);

        return () => clearInterval(interval);
    }, [target.lat, target.lng]);

    const tripInfo = useMemo(() => {
        if (!pickup || !dropoff) return null;
        const distanceKm = haversineDistanceKm(pickup.coords, dropoff.coords);
        const fare = estimateFare(distanceKm);
        const eta = estimateEtaMinutes(distanceKm);
        return { distanceKm, fare, eta };
    }, [pickup, dropoff]);

    const distanceToUserKm = useMemo(() => {
        if (!userLocation) return null;
        return haversineDistanceKm(simulatedCoords, userLocation);
    }, [simulatedCoords, userLocation]);

    const remainingEta = useMemo(() => {
        if (!distanceToUserKm) return null;
        return estimateEtaMinutes(distanceToUserKm);
    }, [distanceToUserKm]);

    if (!rider) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-background">
                <div className="text-center space-y-3">
                    <p className="text-sm text-muted-foreground">
                        No rider selected. Please go back to the dashboard and choose a rider.
                    </p>
                    <Button variant="hero" onClick={() => navigate("/dashboard")}>
                        Back to dashboard
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background flex flex-col">
            <header className="border-b border-border/60">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <Link to="/dashboard" className="text-xs text-muted-foreground hover:text-primary">
                            ← Back to dashboard
                        </Link>
                        <div>
                            <p className="font-heading text-sm font-semibold text-foreground">
                                Tracking {rider.name}
                            </p>
                            <p className="text-[11px] text-muted-foreground">
                                Vehicle: {rider.vehicle} · Rating: {rider.rating.toFixed(1)} ⭐
                            </p>
                        </div>
                    </div>
                    <div className="text-right text-[11px] text-muted-foreground">
                        <p>Simulated movement every 3 seconds</p>
                        <p>Elapsed: {elapsedSeconds}s</p>
                    </div>
                </div>
            </header>

            <main className="flex-1 container mx-auto px-4 py-6 grid lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] gap-6">
                <section className="flex flex-col gap-4 min-h-[320px]">
                    <GoogleMapView
                        userLocation={userLocation ?? target}
                        riders={[
                            {
                                ...rider,
                                lat: simulatedCoords.lat,
                                lng: simulatedCoords.lng,
                            },
                        ]}
                        pickup={pickup?.coords ?? null}
                        dropoff={dropoff?.coords ?? null}
                        onRiderClick={(id) => navigate(`/riders/${id}`)}
                    />
                </section>

                <aside className="flex flex-col gap-4">
                    <div className="rounded-3xl border border-border bg-card card-elevated p-4 sm:p-5 space-y-3">
                        <h2 className="font-heading text-base font-semibold">Live trip details</h2>
                        {tripInfo && (
                            <div className="text-xs space-y-1">
                                <p>
                                    Distance pickup → drop-off:{" "}
                                    <span className="font-semibold text-foreground">
                                        {tripInfo.distanceKm.toFixed(2)} km
                                    </span>
                                </p>
                                <p>
                                    Estimated fare:{" "}
                                    <span className="font-semibold text-foreground">
                                        ₦{tripInfo.fare.toLocaleString()}
                                    </span>
                                </p>
                                <p>
                                    Initial ETA:{" "}
                                    <span className="font-semibold text-foreground">{tripInfo.eta} mins</span>
                                </p>
                            </div>
                        )}

                        <div className="mt-3 rounded-2xl bg-accent/60 border border-accent px-3 py-2 text-xs space-y-1">
                            <p className="font-semibold text-foreground">Rider → you</p>
                            {distanceToUserKm != null && (
                                <p>
                                    Current distance:{" "}
                                    <span className="font-semibold text-foreground">
                                        {distanceToUserKm.toFixed(2)} km
                                    </span>
                                </p>
                            )}
                            {remainingEta != null && (
                                <p>
                                    Updated ETA:{" "}
                                    <span className="font-semibold text-foreground">{remainingEta} mins</span>
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-dashed border-border/70 bg-muted/40 p-4 text-[11px] text-muted-foreground space-y-1">
                        <p className="font-semibold text-foreground mb-1">How tracking works</p>
                        <p>
                            Every {MOVE_INTERVAL_MS / 1000} seconds we move the rider position slightly closer to
                            your pickup location using simple interpolation. This updates the marker on the
                            map-like view and recalculates the ETA.
                        </p>
                    </div>
                </aside>
            </main>
            <AppFooter />
        </div>
    );
};

export default Tracking;


