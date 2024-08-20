"use client";
import { Map } from "react-map-gl";
import mapboxgl from "mapbox-gl";
import { useEffect, useRef, useState } from "react";

mapboxgl.accessToken =
  "pk.eyJ1IjoicWlyYWxsNzkiLCJhIjoiY20wMmlncmlkMDFrZzJtcXhweDZkcWgxdyJ9.1M4Azuu3IoRflZ9h0pZGcQ";

export const MapExplore = () => {
  const mapContainer = useRef(null);
  const map: any = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(9);

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [lng, lat],
      zoom: zoom,
    });

    let x = map.current.getCenter().lng;
    let y = map.current.getCenter().lat;

    let lnglat = new mapboxgl.LngLat(x, y);

    let m = new mapboxgl.Marker().setLngLat(lnglat).addTo(map.current);

    map.current.on("click", async (e: any) => {
      map.current._markers.forEach((m) => m.remove());

      x = e.lngLat.wrap().lng;
      y = e.lngLat.wrap().lat;

      new mapboxgl.Marker().setLngLat([x, y]).addTo(map.current);
    });
  });

  return (
    <div>
      <div className="sidebar">
        Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
      </div>
      <div ref={mapContainer} className="map-container h-[400px]" />
    </div>
  );
};
