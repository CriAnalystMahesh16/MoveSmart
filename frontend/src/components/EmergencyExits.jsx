// EmergencyExits.jsx
import React from 'react';
import SectionCard from './SectionCard';
import { ShieldAlert, MapPin, ChevronRight } from 'lucide-react';

const EmergencyExits = () => {
  return (
    <SectionCard title="Emergency Routes" icon={ShieldAlert}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '12px', padding: '12px', background: '#fef2f2', border: '1px solid #fee2e2', borderRadius: '8px' }}>
          <MapPin size={18} color="#dc2626" />
          <div>
            <div style={{ fontWeight: 700, fontSize: '0.8125rem', color: '#991b1b' }}>Safe Evacuation Path</div>
            <div style={{ fontSize: '0.75rem', color: '#b91c1c' }}>Route via Sector North remains clear.</div>
          </div>
        </div>
        
        <button style={{ 
          width: '100%', 
          background: 'white', 
          border: '1px solid #e2e8f0', 
          borderRadius: '8px', 
          padding: '10px', 
          fontSize: '0.75rem', 
          fontWeight: 700, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '8px', 
          cursor: 'pointer' 
        }}>
          View Full Safety Map <ChevronRight size={14} />
        </button>
      </div>
    </SectionCard>
  );
};

export default EmergencyExits;
