import { useRef, useState } from "react";
import { Autocomplete } from "@react-google-maps/api";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";

type LocationAutocompleteProps = {
  placeholder: string;
  onPlaceSelect?: (place: google.maps.places.PlaceResult | null) => void;
  className?: string;
  isLoaded: boolean;
};

const LocationAutocomplete = ({
  placeholder,
  onPlaceSelect,
  className = "",
  isLoaded,
}: LocationAutocompleteProps) => {
  const [autocomplete, setAutocomplete] =
    useState<google.maps.places.Autocomplete | null>(null);

  const onLoad = (autocompleteInstance: google.maps.places.Autocomplete) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (onPlaceSelect) {
        onPlaceSelect(place);
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  return (
    <div className="relative">
      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none z-10" />
      {isLoaded && (
        <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
          <Input
            className={`pl-10 ${className}`}
            placeholder={placeholder}
            disabled={!isLoaded}
          />
        </Autocomplete>
      )}
    </div>
  );
};

export default LocationAutocomplete;
