"use client";
import { Map } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";
import { LngLatLike, MapInstance, MapLib } from "react-map-gl/dist/esm/types";

mapboxgl.accessToken =
  "pk.eyJ1IjoicWlyYWxsNzkiLCJhIjoiY20wMmlncmlkMDFrZzJtcXhweDZkcWgxdyJ9.1M4Azuu3IoRflZ9h0pZGcQ";

const markers: any[] = [];

const barbers = [
  [-6.900450244093804, 32.882890885192296],
  [-6.897002155185191, 32.88079370994204],
  [-6.898802124559552, 32.87654615822997],
  [-6.909292048420525, 32.88646525454216],
  [-6.933808435056221, 32.89372243026345],
];

export const MapExplore = () => {
  const mapContainer = useRef(null);
  const map: any = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(4);

  useEffect(() => {
    let userLocation = [-6.9134, 32.8795];
    navigator.geolocation.getCurrentPosition((pos) => {
      userLocation = [pos.coords.longitude, pos.coords.latitude];
    });

    if (map.current) {
      return;
    }
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/navigation-night-v1",
      center: userLocation as LngLatLike | undefined,
      zoom: zoom,
    });
    let geolocate = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
      showUserHeading: true,
    });

    map.current.addControl(geolocate);

    map.current.on("load", () => {
      geolocate.trigger();
      map.current.flyTo({
        center: userLocation,
        essential: true,
        zoom: zoom * 4,
      });
      barbers.forEach((b: any) => {
        new mapboxgl.Marker()
          .setLngLat(b)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }) // add popups
              .setHTML(`<h3>this is a popup</h3><p>7ala9 sa3ada</p>`)
          )
          .addTo(map.current);
      });
    });

    map.current.on("move", () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on("idle", function () {
      map.current.resize();
    });
  });

  return (
    <div>
      <div ref={mapContainer} className="map-container h-[75vh] rounded-md" />
    </div>
  );
};
