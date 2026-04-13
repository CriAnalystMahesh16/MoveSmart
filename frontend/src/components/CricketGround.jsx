import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const CricketGround = ({ selectedZone, onZoneClick, isRouteActive }) => {
  const [zones, setZones] = useState({
    'zone-a': { name: 'North Stand', level: 'Low' },
    'zone-b': { name: 'South Stand', level: 'High' },
    'zone-c': { name: 'East Stand', level: 'Medium' },
    'zone-d': { name: 'West Stand', level: 'Low' }
  });

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'crowd_zones'), (snapshot) => {
      const newData = { ...zones };
      snapshot.forEach(doc => { newData[doc.id] = { ...newData[doc.id], ...doc.data() }; });
      setZones(newData);
    });
    return () => unsub();
  }, []);

  const getColor = (lvl) => {
    switch (lvl?.toLowerCase()) {
      case 'low': return '#10b981';
      case 'medium': return '#f59e0b';
      case 'high': return '#ef4444';
      default: return '#94a3b8';
    }
  };

  return (
    <div className={`stadium-view-card saas-card ${selectedZone ? 'active-selection' : ''}`}>
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Interative Tactical Ground</span>
        <span style={{ fontSize: '1.125rem', fontWeight: 800 }}>Selection: {selectedZone ? zones[selectedZone].name : 'Full Ground'}</span>
      </div>

      <svg viewBox="0 0 400 400" style={{ width: '80%', height: '80%' }}>
        {/* Outer Boundary */}
        <circle cx="200" cy="200" r="180" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
        
        {/* Turf Area */}
        <circle cx="200" cy="200" r="170" fill="#ecfdf5" stroke="#d1fae5" strokeWidth="1" />

        {/* Dynamic Route Path (Animated) */}
        {isRouteActive && (
          <path 
            d="M 200 80 Q 250 150 200 330" 
            fill="none" 
            stroke="var(--brand-blue)" 
            strokeWidth="3" 
            strokeDasharray="5,5"
            strokeOpacity="0.8"
            className="path-animation"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
          </path>
        )}

        {/* Quadrants */}
        {/* North */}
        <path d="M 200 30 A 170 170 0 0 1 370 200 L 200 200 Z" 
          onClick={() => onZoneClick('zone-a')}
          style={{ cursor: 'pointer', transition: 'all 0.3s' }}
          fill={getColor(zones['zone-a'].level)} 
          fillOpacity={selectedZone === 'zone-a' ? 0.35 : 0.15} 
          stroke={getColor(zones['zone-a'].level)} 
          strokeWidth={selectedZone === 'zone-a' ? 4 : 2} />
        
        {/* East */}
        <path d="M 370 200 A 170 170 0 0 1 200 370 L 200 200 Z" 
          onClick={() => onZoneClick('zone-c')}
          style={{ cursor: 'pointer', transition: 'all 0.3s' }}
          fill={getColor(zones['zone-c'].level)} 
          fillOpacity={selectedZone === 'zone-c' ? 0.35 : 0.15} 
          stroke={getColor(zones['zone-c'].level)} 
          strokeWidth={selectedZone === 'zone-c' ? 4 : 2} />

        {/* South */}
        <path d="M 200 370 A 170 170 0 0 1 30 200 L 200 200 Z" 
          onClick={() => onZoneClick('zone-b')}
          style={{ cursor: 'pointer', transition: 'all 0.3s' }}
          fill={getColor(zones['zone-b'].level)} 
          fillOpacity={selectedZone === 'zone-b' ? 0.35 : 0.15} 
          stroke={getColor(zones['zone-b'].level)} 
          strokeWidth={selectedZone === 'zone-b' ? 4 : 2} />

        {/* West */}
        <path d="M 30 200 A 170 170 0 0 1 200 30 L 200 200 Z" 
          onClick={() => onZoneClick('zone-d')}
          style={{ cursor: 'pointer', transition: 'all 0.3s' }}
          fill={getColor(zones['zone-d'].level)} 
          fillOpacity={selectedZone === 'zone-d' ? 0.35 : 0.15} 
          stroke={getColor(zones['zone-d'].level)} 
          strokeWidth={selectedZone === 'zone-d' ? 4 : 2} />

        {/* Pitch */}
        <rect x="192" y="175" width="16" height="50" fill="#fef3c7" stroke="#fbbf24" strokeWidth="1" rx="2" />
      </svg>
      
      <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', display: 'flex', gap: '1rem' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}></div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Optimal</span>
         </div>
         <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', background: '#f59e0b', borderRadius: '50%' }}></div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Active</span>
         </div>
         <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }}></div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Critical</span>
         </div>
      </div>
    </div>
  );
};

export default CricketGround;
