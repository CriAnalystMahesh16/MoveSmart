import React from 'react';
import SectionCard from './SectionCard';
import { ShieldAlert, Map as MapIcon, ChevronRight } from 'lucide-react';

const EmergencyExits = () => {
  return (
    <SectionCard title="Emergency Response" icon={ShieldAlert} glow={true} className="emergency-mode">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '12px', borderRadius: '12px' }}>
          <div style={{ color: '#f87171', fontWeight: 800, fontSize: '0.85rem', marginBottom: '4px' }}>CRITICAL ALERT</div>
          <p style={{ fontSize: '0.8rem', opacity: 0.9 }}>Main Exit 2 is moderately congested. Follow the neon floor markers for the fastest exit route.</p>
        </div>

        <div className="facility-item" style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <MapIcon size={16} color="var(--accent-blue)" />
            <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>Sector 4 Escape Path</span>
          </div>
          <span style={{ color: 'var(--success)', fontWeight: 700, fontSize: '0.7rem' }}>CLEAR</span>
        </div>

        <button style={{ 
          background: 'var(--danger)', 
          color: 'white', 
          border: 'none', 
          borderRadius: '8px', 
          padding: '10px', 
          fontWeight: 700, 
          fontSize: '0.8rem',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}>
          VIEW FULL EVACUATION MAP <ChevronRight size={14} />
        </button>
      </div>
    </SectionCard>
  );
};

export default EmergencyExits;
