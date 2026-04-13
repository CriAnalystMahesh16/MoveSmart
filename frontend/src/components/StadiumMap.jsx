import React, { useState, useEffect } from 'react';
import { useJsApiLoader, GoogleMap, Circle, InfoWindow } from '@react-google-maps/api';
import SectionCard from './SectionCard';
import { MapPin } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const mapContainerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '24px'
};

const center = { lat: 51.5387, lng: -0.0166 };

const defaultZones = [
  { id: 'zone-a', name: 'Pavilion North', level: 'Low', center: { lat: 51.540, lng: -0.0166 }, radius: 70 },
  { id: 'zone-b', name: 'Grand Stand South', level: 'High', center: { lat: 51.5370, lng: -0.0166 }, radius: 80 },
  { id: 'zone-c', name: 'East Boundary Stand', level: 'Medium', center: { lat: 51.5385, lng: -0.0140 }, radius: 75 }
];

const getColorForLevel = (level) => {
  switch(level?.toLowerCase()) {
    case 'low': return '#10b981';
    case 'medium': return '#f59e0b';
    case 'high': return '#ef4444';
    default: return '#94a3b8';
  }
};

const StadiumMap = () => {
  const { isLoaded } = useJsApiLoader({ id: 'google-map-script', googleMapsApiKey: 'YOUR_API_KEY_PLACEHOLDER' });
  const [activeZone, setActiveZone] = useState(null);
  const [zones, setZones] = useState(defaultZones);

  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(collection(db, 'crowd_zones'), (snapshot) => {
        if (!snapshot.empty) {
          const dbZones = {};
          snapshot.forEach(doc => { dbZones[doc.id] = doc.data(); });
          setZones(prev => prev.map(z => ({
            ...z,
            level: dbZones[z.id]?.level || z.level,
            timestamp: dbZones[z.id]?.timestamp
          })));
        }
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn("Firestore listener failed");
    }
  }, []);

  if (!isLoaded) return <SectionCard title="Live Field View" icon={MapPin}><p>Preparing Pitch...</p></SectionCard>;

  return (
    <SectionCard title="Live Stadium Pitch View" icon={MapPin}>
      <div style={{ position: 'relative' }}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={16}
          options={{
            disableDefaultUI: true, zoomControl: true,
            styles: [
              { featureType: "all", elementType: "geometry", stylers: [{ color: "#065f46" }] }, // Turf Green Base
              { featureType: "water", stylers: [{ visibility: "off" }] },
              { featureType: "poi", stylers: [{ visibility: "off" }] }
            ]
          }}
        >
          {zones.map((zone) => {
            const zoneColor = getColorForLevel(zone.level);
            return (
              <Circle
                key={zone.id}
                center={zone.center}
                radius={zone.radius}
                options={{
                  fillColor: zoneColor, fillOpacity: 0.6,
                  strokeColor: '#ffffff', strokeOpacity: 0.9,
                  strokeWeight: 3, clickable: true, zIndex: 1
                }}
                onClick={() => setActiveZone({ ...zone, color: zoneColor })}
              />
            );
          })}

          {activeZone && (
            <InfoWindow position={activeZone.center} onCloseClick={() => setActiveZone(null)}>
              <div style={{ padding: '8px', color: '#0f172a', fontFamily: 'var(--font-score)' }}>
                <strong style={{ display: 'block', fontSize: '1rem', borderBottom: '2px solid var(--pitch-clay)', paddingBottom: '4px', marginBottom: '8px' }}>
                  {activeZone.name}
                </strong>
                <div style={{ textTransform: 'uppercase', fontSize: '0.8rem' }}>
                  Load: <span style={{ color: activeZone.color, fontWeight: 800 }}>{activeZone.level}</span>
                </div>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </SectionCard>
  );
};

export default React.memo(StadiumMap);
