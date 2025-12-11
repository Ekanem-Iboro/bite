import { useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { ScrollArea } from "@/components/ui/scroll-area";
import GoogleMapView from "@/components/GoogleMapView";
import { useRideStore } from "@/store/useRideStore";
import { sortRidersByDistance } from "@/utils/geo";
import RiderCard from "@/components/RiderCard";
import { Loader, MapPin, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import HeaderNew from "@/components/layout/HeaderNew";
import { Footer } from "@/components/layout/Footer";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

const Dashboard = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const { userLocation, pickup, dropoff, riders, setSelectedRider } =
    useRideStore();
  const navigate = useNavigate();

  const nearestRiders = useMemo(() => {
    if (!userLocation) return [];
    return sortRidersByDistance(userLocation, riders);
  }, [userLocation, riders]);

  const handleSelectRider = (rider: (typeof riders)[0]) => {
    setSelectedRider(rider);
    navigate(`/tracking/${rider.id}`);
  };

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
    <div>
      <HeaderNew />
      <ResizablePanelGroup direction="horizontal" className="h-full">
        <ResizablePanel defaultSize={30}>
          <div className="flex flex-col h-full">
            <Card className="m-4">
              <CardHeader>
                <CardTitle>Plan Your Ride</CardTitle>
                <CardDescription>
                  Enter your pickup and drop-off locations to see the fare
                  estimate.
                </CardDescription>
              </CardHeader>
              {!isLoaded ? (
                <div className="relative inset-0 flex items-center justify-center w-full h-full rounded-3xl bg-muted border border-border text-xs text-muted-foreground">
                  <Loader className="animate-spin text-red-600" size={28} />
                </div>
              ) : (
                <CardContent className=" flex justify-center items-center gap-5">
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Autocomplete>
                      <Input
                        className="pl-10"
                          placeholder="Add a pickup location"
                          name="pickoff"
                      />
                    </Autocomplete>
                  </div>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Autocomplete>
                      <Input
                        className="pl-10"
                          placeholder="Enter your destination"
                          name="dropoff"
                      />
                    </Autocomplete>
                  </div>
                </CardContent>
              )}

              <CardFooter>
                <Button className="w-full">
                  <Search className="mr-2 w-5 h-5" />
                  Search
                </Button>
              </CardFooter>
            </Card>
            <div className="flex-1 flex flex-col min-h-0">
              <h2 className="text-xl font-bold px-4 pt-4">Available Riders</h2>
              <ScrollArea className="flex-1">
                <div className="space-y-4 p-4">
                  {nearestRiders.length > 0 ? (
                    nearestRiders.map(({ rider, distanceKm }) => (
                      <RiderCard
                        key={rider.id}
                        rider={rider}
                        distance={distanceKm}
                        onSelect={() => handleSelectRider(rider)}
                      />
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">
                      No riders available right now.
                    </p>
                  )}
                </div>
              </ScrollArea>
            </div>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={70}>
          <div className="h-full p-4">
            <GoogleMapView
              userLocation={userLocation}
              riders={riders}
              pickup={pickup?.coords || null}
              dropoff={dropoff?.coords || null}
              onRiderClick={handleRiderMarkerClick}
            />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
      <Footer />
    </div>
  );
};

export default Dashboard;
