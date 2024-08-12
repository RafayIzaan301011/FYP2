import React, { useState, useCallback, FC } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";

interface Props {
  apiKey: string;
}

const containerStyle = {
  width: "400px",
  height: "400px",
};

const center = {
  //lat: -3.745,
  lat: 37.7699298,
  lng: -122.4469157,
  //lng: -38.523,
};

const Test = ({ apiKey }: Props) => {
  const iconBase =
    "https://developers.google.com/maps/documentation/javascript/examples/full/images/";
  const icons = {
    parking: {
      icon: iconBase + "parking_lot_maps.png",
    },
    library: {
      icon: iconBase + "library_maps.png",
    },
    info: {
      icon: iconBase + "info-i_maps.png",
    },
  };
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  //setMap(google.maps.Map);
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult>();
  // check krlena bhai
  const onLoad = useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  async function calculateRoute() {
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: new google.maps.LatLng(37.7699298, -122.4469157),
      destination: new google.maps.LatLng(
        37.7683909618184,
        -122.51089453697205
      ),
      travelMode: google.maps.TravelMode.DRIVING,
    });

    setDirectionsResponse(results);
    // setDistance(results.routes[0].legs[0].distance.text);
    // setDuration(results.routes[0].legs[0].duration.text);
  }
  return (
    <>
      <div id="map">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker position={center} icon={icons.parking.icon} />
            {directionsResponse && (
              <DirectionsRenderer
                directions={directionsResponse}
                options={{
                  polylineOptions: { strokeColor: "#fff", strokeWeight: 5 },
                }}
              />
            )}
            {/* Child components, such as markers, info windows, etc. */}
          </GoogleMap>
        ) : (
          <p> error .... map could not be loaded</p>
        )}
      </div>
      ;
      <button className="btn btn-primary" onClick={calculateRoute}>
        fk yeahhh!!!
      </button>
    </>
  );
};

export default Test;
