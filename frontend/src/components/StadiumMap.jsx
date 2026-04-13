import React, { useState, useEffect } from 'react';
import { useJsApiLoader, GoogleMap, Circle, InfoWindow } from '@react-google-maps/api';
import SectionCard from './SectionCard';
import { MapPin } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase'; // Import Firestore database

const mapContainerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '16px'
};

const center = { lat: 51.5387, lng: -0.0166 };

// Fallback initial zones
const defaultZones = [
  { id: 'zone-a', name: 'Zone A (North Gate)', level: 'Low', center: { lat: 51.540, lng: -0.0166 }, radius: 70 },
  { id: 'zone-b', name: 'Zone B (South Entrance)', level: 'High', center: { lat: 51.5370, lng: -0.0166 }, radius: 80 },
  { id: 'zone-c', name: 'Zone C (East Concourse)', level: 'Medium', center: { lat: 51.5385, lng: -0.0140 }, radius: 75 }
];

const getColorForLevel = (level) => {
  switch(level?.toLowerCase()) {
    case 'low': return '#10b981'; // green
    case 'medium': return '#f59e0b'; // yellow
    case 'high': return '#ef4444'; // red
    default: return '#94a3b8'; // grey unknown
  }
};

const StadiumMap = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'YOUR_API_KEY_PLACEHOLDER'
  });

  const [activeZone, setActiveZone] = useState(null);
  const [zones, setZones] = useState(defaultZones);

  useEffect(() => {
    // Attempt to listen to Firestore
    try {
      const unsubscribe = onSnapshot(collection(db, 'crowd_zones'), (snapshot) => {
        if (!snapshot.empty) {
          const dbZones = {};
          snapshot.forEach(doc => { dbZones[doc.id] = doc.data(); });
          
          // Merge Firebase data with hardcoded coordinates
          setZones(prev => prev.map(z => ({
            ...z,
            level: dbZones[z.id]?.level || z.level,
            timestamp: dbZones[z.id]?.timestamp
          })));
        }
      }, (error) => {
        console.warn("Firestore listener failed (likely due to missing config):", error);
      });

      return () => unsubscribe();
    } catch (e) {
      console.warn("Could not attach Firestore listener.");
    }
  }, []);

  if (!isLoaded) return <SectionCard title="Live Stadium Map" icon={MapPin}><p>Loading Map...</p></SectionCard>;

  return (
    <SectionCard title="Live Stadium Map" icon={MapPin}>
      <div style={{ position: 'relative' }}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={16}
          options={{
            disableDefaultUI: true, zoomControl: true,
            styles: [
              { featureType: "poi.business", stylers: [{ visibility: "off" }] },
              { featureType: "transit", elementType: "labels.icon", stylers: [{ visibility: "off" }] }
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
                  fillColor: zoneColor, fillOpacity: 0.5,
                  strokeColor: zoneColor, strokeOpacity: 0.8,
                  strokeWeight: 2, clickable: true, zIndex: 1
                }}
                onClick={() => setActiveZone({ ...zone, color: zoneColor })}
              />
            );
          })}

          {activeZone && (
            <InfoWindow position={activeZone.center} onCloseClick={() => setActiveZone(null)}>
              <div style={{ padding: '4px', color: '#0f172a' }}>
                <strong style={{ display: 'block', fontSize: '1.1rem', marginBottom: '4px' }}>{activeZone.name}</strong>
                <span>Crowd Level: <strong style={{ color: activeZone.color }}>{activeZone.level}</strong></span>
                {activeZone.timestamp && <div style={{ fontSize: '0.8rem', color: '#64748b', marginTop: '4px' }}>Updated: {new Date(activeZone.timestamp).toLocaleTimeString()}</div>}
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </div>
    </SectionCard>
  );
};

export default React.memo(StadiumMap);
