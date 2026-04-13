import React, { useState, useEffect } from 'react';
import SectionCard from './SectionCard';
import { Users } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const defaultZones = [
  { id: 'zone-a', name: 'Zone A (North Gate)', level: 'Low' },
  { id: 'zone-b', name: 'Zone B (South Entrance)', level: 'High' },
  { id: 'zone-c', name: 'Zone C (East Concourse)', level: 'Medium' },
];

const CrowdStatus = () => {
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
      }, (error) => {
        console.warn("Firestore Listener Error:", error);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn("Could not attach listener");
    }
  }, []);

  return (
    <SectionCard title="Crowd Status" icon={Users}>
      <div className="crowd-list">
        {zones.map(zone => (
          <div key={zone.id} className="crowd-item">
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span className="crowd-zone">{zone.name}</span>
              {zone.timestamp && <span style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>Last updated: {new Date(zone.timestamp).toLocaleTimeString()}</span>}
            </div>
            <span className={`density-badge density-${zone.level.toLowerCase()}`}>
              {zone.level}
            </span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default CrowdStatus;
