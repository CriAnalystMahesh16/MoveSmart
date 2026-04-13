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
            predictedLevel: dbZones[z.id]?.predictedLevel || z.level,
            trend: dbZones[z.id]?.trend || 'Stable',
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
          <div key={zone.id} className="crowd-item" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span className="crowd-zone">{zone.name}</span>
                {zone.timestamp && <span style={{fontSize: '0.75rem', color: 'var(--text-muted)'}}>Last updated: {new Date(zone.timestamp).toLocaleTimeString()}</span>}
              </div>
              <span className={`density-badge density-${zone.level.toLowerCase()}`}>
                {zone.level}
              </span>
            </div>
            
            <div style={{ display: 'flex', gap: '12px', fontSize: '0.85rem', width: '100%', borderTop: '1px solid #f1f5f9', paddingTop: '8px' }}>
              <div style={{ color: 'var(--text-muted)' }}>
                Trend: <span style={{ color: zone.trend === 'Rising' ? 'var(--danger)' : zone.trend === 'Falling' ? 'var(--success)' : 'var(--text-main)', fontWeight: 600 }}>{zone.trend}</span>
              </div>
              <div style={{ color: 'var(--text-muted)' }}>
                Predicted (30m): <span className={`density-${(zone.predictedLevel || zone.level).toLowerCase()}`} style={{ fontWeight: 700 }}>{zone.predictedLevel || zone.level}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default CrowdStatus;
