'use client'

import { LngLatLike } from 'mapbox-gl';
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken =
  'pk.eyJ1IjoicWlyYWxsNzkiLCJhIjoiY20wMmlncmlkMDFrZzJtcXhweDZkcWgxdyJ9.1M4Azuu3IoRflZ9h0pZGcQ';

const markers: any[] = [];

export const MapInput = ({ setPosition }: { setPosition: any }) => {
  const mapContainer = useRef(null);
  const map: any = useRef(null);
  const [lng, setLng] = useState(-70.9);
  const [lat, setLat] = useState(42.35);
  const [zoom, setZoom] = useState(4);

  useEffect(() => {
    let userLocation: LngLatLike = [-8.0631, 32.655];
    navigator.geolocation.getCurrentPosition((pos) => {
      userLocation = [pos.coords.longitude, pos.coords.latitude];
    });

    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: 'mapbox://styles/mapbox/navigation-night-v1',
      center: userLocation,
      zoom: zoom,
    });

    map.current.on('load', () => {
	const newMarker = new mapboxgl.Marker()
	.setLngLat(userLocation)
	.addTo(map.current);
	markers.push(newMarker);
	setPosition(userLocation);
      map.current.flyTo({
        center: userLocation,
        essential: true,
        zoom: zoom * 4,
      });
    });

    map.current.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true,
      })
    );

    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });

    map.current.on('click', async (e: any) => {
      markers.forEach((m: any) => m.remove());
      let x = e.lngLat.wrap().lng;
      let y = e.lngLat.wrap().lat;
      const newMarker = new mapboxgl.Marker()
        .setLngLat([x, y])
        .addTo(map.current);
      markers.push(newMarker);
	  setPosition([x, y]);
    });
  });

  return (
    <div>
      <div ref={mapContainer} className='map-container h-[560px] rounded-md' />
    </div>
  );
};
