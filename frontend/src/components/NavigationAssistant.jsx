import React from 'react';
import SectionCard from './SectionCard';
import { Map, Navigation, Compass } from 'lucide-react';

const NavigationAssistant = () => {
  return (
    <SectionCard title="Match Day Exit Strategy" icon={Compass}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div className="nav-path" style={{ 
          background: 'white', 
          border: '1px solid #e2e8f0', 
          padding: '1.25rem', 
          borderRadius: '16px',
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)'
        }}>
          <div className="nav-route" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800, color: 'var(--grass-green)', textTransform: 'uppercase', marginBottom: '8px' }}>
            <Navigation size={18} />
            <span>Pavilion -> Gate 1 (Fast Track)</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Status: <span style={{ color: 'var(--success)', fontWeight: 700 }}>CLEAR</span> • EST: 4 MINS
          </div>
        </div>

        <div className="nav-path" style={{ 
          background: '#f8fafc', 
          border: '1px solid #e2e8f0', 
          padding: '1.25rem', 
          borderRadius: '16px',
          opacity: 0.8
        }}>
          <div className="nav-route" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontWeight: 800, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px' }}>
            <Navigation size={18} />
            <span>Grand Stand -> South Exit</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            Status: <span style={{ color: 'var(--warning)', fontWeight: 700 }}>BUSY</span> • EST: 14 MINS
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default NavigationAssistant;
