import React, { useEffect, useState } from "react";
import { GoogleMap, DirectionsRenderer, useJsApiLoader } from "@react-google-maps/api";
import secrets from "../../secrets";

const containerStyle = {
  width: '70%',
  height: '200px'
};

const mapOptions = {
  streetViewControl: false,  
  mapTypeControl: false,     
  fullscreenControl: false, 
  zoomControl: true,         
  styles: [{                 
    featureType: "poi",      
    elementType: "labels",   
    stylers: [{ visibility: "off" }],
  }, {
    featureType: "transit",  
    elementType: "labels.icon",
    stylers: [{ visibility: "off" }],
  }]
};

const RentMap = ({ startLat, startLng, endLat, endLng }) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: secrets.API_KEY 
  });

  const [directions, setDirections] = useState(null);

  const coordinatesAreSame = startLat === endLat && startLng === endLng;

  useEffect(() => {
    if (!isLoaded || coordinatesAreSame) return; 

    const directionsService = new google.maps.DirectionsService();
    const origin = { lat: parseFloat(startLat), lng: parseFloat(startLng) };
    const destination = { lat: parseFloat(endLat), lng: parseFloat(endLng) };

    directionsService.route({
      origin,
      destination,
      travelMode: google.maps.TravelMode.BICYCLING, 
    }, (result, status) => {
      if (status === google.maps.DirectionsStatus.OK) {
        setDirections(result);
      } else {
        console.error(`Error fetching directions ${result}`);
      }
    });
  }, [startLat, startLng, endLat, endLng, isLoaded]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading Maps...</div>;
  if (coordinatesAreSame) return <div>No route to display as start and end locations are the same.</div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={directions ? directions.routes[0].bounds.getCenter() : { lat: 0, lng: 0 }}
      zoom={10}
      options={mapOptions}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default RentMap;
