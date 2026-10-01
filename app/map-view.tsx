"use client";

import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { divIcon } from "leaflet";
import type { LatLngBoundsExpression } from "leaflet";
import { useEffect, useRef, useState } from "react";
import type { Report } from "./page";
import "leaflet/dist/leaflet.css";

const bounds: LatLngBoundsExpression = [
  [-23.39, -51.25],
  [-23.24, -51.08],
];

const categoryStyles: Record<Report["category"], { color: string; symbol: string; label: string }> = {
  "Ponto de ônibus": { color: "blue", symbol: "▣", label: "ponto de ônibus" },
  Iluminação: { color: "amber", symbol: "✦", label: "iluminação" },
  "Terreno baldio": { color: "red", symbol: "△", label: "terreno baldio" },
  "Viela / beco": { color: "violet", symbol: "⌁", label: "viela ou beco" },
  Vegetação: { color: "green", symbol: "✤", label: "vegetação" },
};

function markerIcon(report: Report, active: boolean) {
  const style = categoryStyles[report.category];
  return divIcon({
    className: "report-marker-icon",
    iconSize: [38, 46],
    iconAnchor: [19, 42],
    popupAnchor: [0, -38],
    html: `<span class="report-marker marker-${style.color}${active ? " is-active" : ""}" title="${style.label}"><b>${style.symbol}</b></span>`,
  });
}

function Recenter({ activeReport, initialFocusUser }: { activeReport?: Report; initialFocusUser: boolean }) {
  const map = useMap();
  const initialFocusApplied = useRef(false);
  useEffect(() => {
    if (initialFocusUser && !initialFocusApplied.current) {
      initialFocusApplied.current = true;
      map.setView(fallbackLocation, 15, { animate: false });
      return;
    }
    if (activeReport) map.setView([activeReport.lat, activeReport.lng], Math.max(map.getZoom(), 14), { animate: true });
  }, [activeReport?.id, initialFocusUser, map]);
  return null;
}

const fallbackLocation: [number, number] = [-23.3109, -51.1681];

const userIcon = divIcon({
  className: "user-location-icon",
  iconSize: [76, 70],
  iconAnchor: [38, 62],
  popupAnchor: [0, -82],
  html: '<span class="user-location-marker"><em>Você</em><i></i><b><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="3.2"></circle><path d="M5.5 19.5c.6-3.4 2.8-5.2 6.5-5.2s5.9 1.8 6.5 5.2"></path></svg></b></span>',
});

async function streetForPoint(lat: number, lng: number): Promise<string> {
  try {
    const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`);
    if (!response.ok) throw new Error("reverse geocode failed");
    const result = await response.json() as { address?: { road?: string; pedestrian?: string; neighbourhood?: string; suburb?: string } };
    return result.address?.road ?? result.address?.pedestrian ?? result.address?.neighbourhood ?? result.address?.suburb ?? "Localização selecionada";
  } catch {
    return "Localização selecionada";
  }
}

function LocationTracker({ onLocationChange, onStreetChange, onUserPinClick }: { onLocationChange: (location: [number, number]) => void; onStreetChange: (street: string) => void; onUserPinClick: () => void }) {
  const map = useMap();
  const [location, setLocation] = useState<[number, number]>(fallbackLocation);

  useEffect(() => {
    let cancelled = false;
    const updateStreet = async (point: [number, number]) => {
      onStreetChange("Localizando rua...");
      const street = await streetForPoint(point[0], point[1]);
      if (!cancelled) onStreetChange(street);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          const point: [number, number] = [coords.latitude, coords.longitude];
          if (cancelled) return;
          setLocation(point);
          onLocationChange(point);
          map.setView(point, 15, { animate: true });
          void updateStreet(point);
        },
        () => {
          map.setView(fallbackLocation, 15, { animate: false });
          void updateStreet(fallbackLocation);
        },
        { enableHighAccuracy: true, timeout: 7000 },
      );
    } else {
      void updateStreet(fallbackLocation);
    }

    return () => { cancelled = true; };
  }, [map, onLocationChange, onStreetChange]);

  useMapEvents({
    moveend: () => {
      const center = map.getCenter();
      void streetForPoint(center.lat, center.lng).then(onStreetChange);
    },
  });

  function handleDragEnd(event: { target: { getLatLng: () => { lat: number; lng: number } } }) {
    const point = event.target.getLatLng();
    const nextLocation: [number, number] = [point.lat, point.lng];
    setLocation(nextLocation);
    onLocationChange(nextLocation);
    onStreetChange("Localizando rua...");
    void streetForPoint(point.lat, point.lng).then(onStreetChange);
  }

  return <Marker position={location} icon={userIcon} zIndexOffset={1000} draggable eventHandlers={{ click: onUserPinClick, dragend: handleDragEnd }} />;
}

export default function RealMap({ reports, activeId, onSelect, onUserPinClick, onLocationChange, onStreetChange, initialFocusUser = false }: { reports: Report[]; activeId: number; onSelect: (id: number) => void; onUserPinClick: () => void; onLocationChange: (location: [number, number]) => void; onStreetChange: (street: string) => void; initialFocusUser?: boolean }) {
  const activeReport = reports.find((report) => report.id === activeId);

  return (
    <MapContainer className="real-map" bounds={bounds} maxBounds={bounds} minZoom={12} maxZoom={17} scrollWheelZoom>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Recenter activeReport={activeReport} initialFocusUser={initialFocusUser} />
      <LocationTracker onLocationChange={onLocationChange} onStreetChange={onStreetChange} onUserPinClick={onUserPinClick} />
      {reports.map((report) => {
        const isActive = report.id === activeId;
        return (
          <Marker
            key={report.id}
            position={[report.lat, report.lng]}
            icon={markerIcon(report, isActive)}
            title={report.title}
            eventHandlers={{ click: () => onSelect(report.id) }}
          >
            <Popup>
              <div className="map-popup">
                <span>{report.priority} prioridade</span>
                <strong>{report.title}</strong>
                <small>{report.location}</small>
                <button onClick={() => onSelect(report.id)}>Ver detalhes →</button>
              </div>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
