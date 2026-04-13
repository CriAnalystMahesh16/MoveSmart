import React, { useState, useEffect } from 'react';
import SectionCard from './SectionCard';
import { Target } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const defaultZones = [
  { id: 'zone-a', name: 'Pavilion North', level: 'Low' },
  { id: 'zone-b', name: 'Grand Stand South', level: 'High' },
  { id: 'zone-c', name: 'East Boundary Stand', level: 'Medium' },
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
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn("CrowdStatus listener failed");
    }
  }, []);

  return (
    <SectionCard title="Live Stand Attendance" icon={Target}>
      <div className="crowd-list" style={{ gap: '1rem' }}>
        {zones.map(zone => (
          <div key={zone.id} className="crowd-item" style={{ 
            background: 'white', 
            border: '1px solid #e2e8f0', 
            borderRadius: '12px', 
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--grass-green)', textTransform: 'uppercase' }}>{zone.name}</span>
                {zone.timestamp && <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Updated: {new Date(zone.timestamp).toLocaleTimeString()}</span>}
              </div>
              <span className={`density-badge density-${zone.level.toLowerCase()}`}>
                {zone.level}
              </span>
            </div>
            
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              background: '#f8fafc', 
              padding: '0.5rem 0.75rem', 
              borderRadius: '8px',
              fontSize: '0.8rem',
              fontFamily: 'var(--font-score)'
            }}>
              <span style={{ color: 'var(--text-muted)' }}>Trend: <b style={{ color: zone.trend === 'Rising' ? 'var(--danger)' : 'var(--success)' }}>{zone.trend}</b></span>
              <span style={{ color: 'var(--text-muted)' }}>PRED (30m): <b className={`density-${(zone.predictedLevel || zone.level).toLowerCase()}`}>{zone.predictedLevel || zone.level}</b></span>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default CrowdStatus;
