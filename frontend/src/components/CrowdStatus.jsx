// CrowdStatus.jsx
import React, { useState, useEffect } from 'react';
import SectionCard from './SectionCard';
import { Users } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const defaultZones = [
  { id: 'zone-a', name: 'North Stand', level: 'Low' },
  { id: 'zone-b', name: 'South Stand', level: 'High' },
  { id: 'zone-c', name: 'East Stand', level: 'Medium' },
  { id: 'zone-d', name: 'West Stand', level: 'Low' },
];

const levelConfig = {
  Low:    { label: 'Optimal',  bg: '#ecfdf5', text: '#065f46', bar: '#10b981', pct: 28 },
  Medium: { label: 'Active',   bg: '#fffbeb', text: '#92400e', bar: '#f59e0b', pct: 62 },
  High:   { label: 'Critical', bg: '#fef2f2', text: '#991b1b', bar: '#ef4444', pct: 94 },
};

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
          })));
        }
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn('CrowdStatus listener failed');
    }
  }, []);

  return (
    <SectionCard title="Crowd Overview" icon={Users}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {zones.map(zone => {
          const cfg = levelConfig[zone.level] || levelConfig.Low;
          return (
            <div key={zone.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <span style={{ fontSize: '0.8125rem', fontWeight: 600 }}>{zone.name}</span>
                <span style={{ fontSize: '0.7rem', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', background: cfg.bg, color: cfg.text }}>
                  {cfg.label}
                </span>
              </div>
              <div className="intensity-bar">
                <div style={{ width: `${cfg.pct}%`, height: '100%', background: cfg.bar, borderRadius: '99px', transition: 'width 0.6s ease' }}></div>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
};

export default CrowdStatus;
