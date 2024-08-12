import React, { useState, FC, useMemo, useRef } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  Marker,
  DirectionsService,
  DirectionsRenderer,
} from "@react-google-maps/api";
//import { Box } from "@chakra-ui/react";
type MapOptions = google.maps.MapOptions;
import Box from "./Box/Box";

interface Props {
  apiKey: string;
}

const containerStyle = {
  width: "1050px",
  height: "730px",
};

const center = {
  //lat: -3.745,
  lat: 31.428263,
  lng: 74.267817,
  //lng: -38.523,
};

const Test = ({ apiKey }: Props) => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
  });

  let center = {
    //lat: -3.745,
    lat: 37.77,
    lng: -122.4469157,
    //lng: -38.523,
  };

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsResponse, setDirectionsResponse] =
    useState<google.maps.DirectionsResult | null>();
  const [distance, setDistance] = useState<string | undefined>("");
  const [duration, setDuration] = useState<string | undefined>("");
  const originRef = useRef<HTMLInputElement | null>(null);

  interface LatLngWithId {
    id: number;
    latLng: { lat: number; lng: number };
  }

  const coordinatesArray: LatLngWithId[] = [
    { id: 1, latLng: { lat: 37.77, lng: -122.4469157 } },
    { id: 2, latLng: { lat: 38.0, lng: -122.0 } },
    // Add more objects here
  ];

  const [selectedLatLng, setSelectedLatLng] =
    useState<google.maps.LatLng | null>(null);

  const handleInputChange = () => {
    const inputId = originRef.current?.value; // Get the input value

    // Find the matching object in the coordinatesArray
    const selectedId = 1; // Example: You can get this value from your input field
    const selectedCoords = coordinatesArray.find(
      (coord) => coord.id === selectedId
    );

    if (selectedCoords) {
      const { lat, lng } = selectedCoords.latLng;
      center.lat = lat;
      center.lng = lng;
      const googleLatLng = new google.maps.LatLng(lat, lng);
      setSelectedLatLng(googleLatLng);
      console.log(googleLatLng); // This is a google.maps.LatLng object
    } else {
      setSelectedLatLng(new google.maps.LatLng(37.77, -122.4469157));
    }
  };
  // check krlena bhai
  const onLoad = React.useCallback(function callback(map: google.maps.Map) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const options = useMemo<MapOptions>(
    () => ({
      mapId: "6427bd0664cced21",
      disableDefaultUI: true,
      clickableIcons: true,
    }),
    []
  );

  const onUnmount = React.useCallback(function callback(map: google.maps.Map) {
    setMap(null);
  }, []);

  async function calculateRoute() {
    // eslint-disable-next-line no-undef
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: new google.maps.LatLng(31.428263, 74.267817),
      destination: new google.maps.LatLng(31.45, 74.267817),
      // eslint-disable-next-line no-undef
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results?.routes[0]?.legs[0]?.distance?.text);
    setDuration(results?.routes[0]?.legs[0]?.duration?.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    //originRef.current.value = "";
    //destiantionRef.current.value = "";
  }
  return (
    <>
      {" "}
      <div className="container text-center" id="top-div">
        <div className="row">
          <div className="col-4">
            {/* {container for input} */}
            <div className="card round-3 shadow-lg p-3 mb-5 bg-body-tertiary rounded p-2 mb-2 border-opacity-25">
              <h2>
                {" "}
                <span className="Poll">Poll- </span>{" "}
                <span className="Ease"> Ease</span>{" "}
              </h2>
              <div className="card-body">
                <h5 className="card-title">Directions to your Polling Booth</h5>

                <form>
                  <div className="field mb-4">
                    <label htmlFor="cnic" className="form-label"></label>
                    <input
                      id="cnic"
                      type="number"
                      className="form"
                      placeholder="    Enter CNIC #  "
                      // ref={originRef.current?.value}
                      ref={originRef}
                      // onSubmit={handleInputChange}`
                    />

                    <div className="line"></div>
                  </div>
                  <button
                    className="btn btn-secondary"
                    onClick={calculateRoute}
                    id="dir-btn"
                  >
                    {" "}
                    Get Directions
                  </button>
                </form>
                <div id="dis-dur-div">
                  <span className="p-dis">
                    {"Distance:      "}
                    {distance}
                  </span>
                  <p></p>
                  <span className="p-dis">
                    {"Duration:      "}
                    {duration}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="col-8">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={10}
                onLoad={onLoad}
                onUnmount={onUnmount}
                options={options}
              >
                <Marker position={center} />
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
        </div>
      </div>
    </>
  );
};

export default Test;
