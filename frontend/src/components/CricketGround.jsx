import React, { useState, useEffect } from 'react';
import SectionCard from './SectionCard';
import { Target } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const CricketGround = () => {
  const [zones, setZones] = useState({
    'zone-a': { name: 'Pavilion North', level: 'Low' },
    'zone-b': { name: 'Grand Stand South', level: 'High' },
    'zone-c': { name: 'East Boundary', level: 'Medium' },
    'zone-d': { name: 'West Boundary', level: 'Low' } // Placeholder
  });

  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(collection(db, 'crowd_zones'), (snapshot) => {
        if (!snapshot.empty) {
          const newData = { ...zones };
          snapshot.forEach(doc => {
            newData[doc.id] = { ...newData[doc.id], ...doc.data() };
          });
          setZones(newData);
        }
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn("CricketGround listener failed");
    }
  }, []);

  const getColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#94a3b8';
    }
  };

  return (
    <SectionCard title="Live Field Attendance" icon={Target}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <svg width="350" height="350" viewBox="0 0 200 200">
          {/* Main Field (Turf) */}
          <circle cx="100" cy="100" r="95" fill="var(--grass-green)" stroke="#ffffff" strokeWidth="1" />
          
          {/* Stadium Stands (4 Quadrants) */}
          {/* Zone A (North) */}
          <path 
            d="M 100 10 A 90 90 0 0 1 190 100 L 100 100 Z" 
            fill={getColor(zones['zone-a'].level)} 
            className={zones['zone-a'].level === 'High' ? 'pulse-zone' : ''} 
            style={{ opacity: 0.6, transition: 'fill 0.5s ease', cursor: 'help' }}
          >
            <title>{zones['zone-a'].name}: {zones['zone-a'].level}</title>
          </path>
          
          {/* Zone C (East) - mapping for symmetry */}
          <path 
            d="M 190 100 A 90 90 0 0 1 100 190 L 100 100 Z" 
            fill={getColor(zones['zone-c'].level)} 
            className={zones['zone-c'].level === 'High' ? 'pulse-zone' : ''}
            style={{ opacity: 0.6, transition: 'fill 0.5s ease', cursor: 'help' }}
          >
            <title>{zones['zone-c'].name}: {zones['zone-c'].level}</title>
          </path>

          {/* Zone B (South) */}
          <path 
            d="M 100 190 A 90 90 0 0 1 10 100 L 100 100 Z" 
            fill={getColor(zones['zone-b'].level)} 
            className={zones['zone-b'].level === 'High' ? 'pulse-zone' : ''}
            style={{ opacity: 0.6, transition: 'fill 0.5s ease', cursor: 'help' }}
          >
            <title>{zones['zone-b'].name}: {zones['zone-b'].level}</title>
          </path>

          {/* Zone D (West) - placeholder */}
          <path 
            d="M 10 100 A 90 90 0 0 1 100 10 L 100 100 Z" 
            fill={getColor(zones['zone-d'].level)} 
            className={zones['zone-d'].level === 'High' ? 'pulse-zone' : ''}
            style={{ opacity: 0.6, transition: 'fill 0.5s ease', cursor: 'help' }}
          >
            <title>{zones['zone-d'].name}: {zones['zone-d'].level}</title>
          </path>

          {/* Inner Outfield Border */}
          <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="4" />

          {/* The Pitch */}
          <rect x="95" y="85" width="10" height="30" fill="var(--pitch-clay)" rx="2" />
        </svg>

        {/* Legend / Info Overlay */}
        <div style={{ marginTop: '20px', display: 'flex', gap: '15px', fontSize: '0.85rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '12px', height: '12px', background: '#10b981', borderRadius: '3px' }}></div>
            <span>Low</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '12px', height: '12px', background: '#f59e0b', borderRadius: '3px' }}></div>
            <span>Med</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <div style={{ width: '12px', height: '12px', background: '#ef4444', borderRadius: '3px' }}></div>
            <span>High</span>
          </div>
        </div>
      </div>
      
    </SectionCard>
  );
};

export default CricketGround;
