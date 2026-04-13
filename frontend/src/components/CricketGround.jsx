import React, { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const CricketGround = ({ selectedZone, onZoneClick, isRouteActive }) => {
  const [zones, setZones] = useState({
    'North': { name: 'North Stand', level: 'Low' },
    'South': { name: 'South Stand', level: 'High' },
    'East': { name: 'East Stand', level: 'Medium' },
    'West': { name: 'West Stand', level: 'Low' }
  });

  useEffect(() => {
    // Listen to crowdData collection in real-time
    const unsub = onSnapshot(collection(db, 'crowdData'), (snapshot) => {
      const newData = { ...zones };
      snapshot.forEach(doc => { 
        const data = doc.data();
        const docId = doc.id; // Case-sensitive: North, South, East, West
        if (newData[docId]) {
          newData[docId] = { 
            ...newData[docId], 
            level: data.crowdLevel || 'Low' // Use crowdLevel field
          }; 
        }
      });
      setZones(newData);
    });
    return () => unsub();
  }, []);

  const getColor = (lvl) => {
    const level = lvl?.toLowerCase();
    switch (level) {
      case 'low': return '#10b981';    // Green
      case 'medium': return '#f59e0b'; // Yellow
      case 'high': return '#ef4444';   // Red
      default: return '#94a3b8';       // Grey (fallback)
    }
  };

  return (
    <div className={`stadium-view-card saas-card ${selectedZone ? 'active-selection' : ''}`}>
      <div style={{ position: 'absolute', top: '1.5rem', left: '1.5rem', display: 'flex', flexDirection: 'column' }}>
        <span style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Interactive Ground View</span>
        <span style={{ fontSize: '1.125rem', fontWeight: 800 }}>
          {selectedZone ? `Stand: ${zones[selectedZone].name}` : 'Live Arena Health'}
        </span>
      </div>

      <svg viewBox="0 0 400 400" style={{ width: '80%', height: '80%' }}>
        {/* Outer Boundary */}
        <circle cx="200" cy="200" r="180" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="2" />
        
        {/* Turf Area */}
        <circle cx="200" cy="200" r="170" fill="#ecfdf5" stroke="#d1fae5" strokeWidth="1" />

        {/* Route Path Overlay */}
        {isRouteActive && (
          <path 
            d="M 200 80 Q 250 150 200 330" 
            fill="none" 
            stroke="var(--brand-blue)" 
            strokeWidth="3" 
            strokeDasharray="5,5"
            strokeOpacity="0.8"
          >
            <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1s" repeatCount="indefinite" />
          </path>
        )}

        {/* Quadrants - North */}
        <path d="M 200 30 A 170 170 0 0 1 370 200 L 200 200 Z" 
          onClick={() => onZoneClick('North')}
          style={{ cursor: 'pointer', transition: 'all 0.3s' }}
          fill={getColor(zones['North'].level)} 
          fillOpacity={selectedZone === 'North' ? 0.35 : 0.15} 
          stroke={getColor(zones['North'].level)} 
          strokeWidth={selectedZone === 'North' ? 4 : 2} />
        
        {/* East */}
        <path d="M 370 200 A 170 170 0 0 1 200 370 L 200 200 Z" 
          onClick={() => onZoneClick('East')}
          style={{ cursor: 'pointer', transition: 'all 0.3s' }}
          fill={getColor(zones['East'].level)} 
          fillOpacity={selectedZone === 'East' ? 0.35 : 0.15} 
          stroke={getColor(zones['East'].level)} 
          strokeWidth={selectedZone === 'East' ? 4 : 2} />

        {/* South */}
        <path d="M 200 370 A 170 170 0 0 1 30 200 L 200 200 Z" 
          onClick={() => onZoneClick('South')}
          style={{ cursor: 'pointer', transition: 'all 0.3s' }}
          fill={getColor(zones['South'].level)} 
          fillOpacity={selectedZone === 'South' ? 0.35 : 0.15} 
          stroke={getColor(zones['South'].level)} 
          strokeWidth={selectedZone === 'South' ? 4 : 2} />

        {/* West */}
        <path d="M 30 200 A 170 170 0 0 1 200 30 L 200 200 Z" 
          onClick={() => onZoneClick('West')}
          style={{ cursor: 'pointer', transition: 'all 0.3s' }}
          fill={getColor(zones['West'].level)} 
          fillOpacity={selectedZone === 'West' ? 0.35 : 0.15} 
          stroke={getColor(zones['West'].level)} 
          strokeWidth={selectedZone === 'West' ? 4 : 2} />

        {/* Pitch */}
        <rect x="192" y="175" width="16" height="50" fill="#fef3c7" stroke="#fbbf24" strokeWidth="1" rx="2" />
      </svg>
      
      <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', display: 'flex', gap: '1rem' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', background: '#10b981', borderRadius: '50%' }}></div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Low</span>
         </div>
         <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', background: '#f59e0b', borderRadius: '50%' }}></div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Medium</span>
         </div>
         <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }}></div>
            <span style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', fontWeight: 600 }}>High</span>
         </div>
      </div>
    </div>
  );
};

export default CricketGround;
