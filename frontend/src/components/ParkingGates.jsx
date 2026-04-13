import React from 'react';
import SectionCard from './SectionCard';
import { Car, ArrowUpRight } from 'lucide-react';

const gates = [
  { name: 'Gate A (Premium)', load: 45, status: 'Fast' },
  { name: 'Gate B (General)', load: 85, status: 'Busy' },
  { name: 'Gate C (Media)', load: 20, status: 'Fast' },
];

const ParkingGates = () => {
  return (
    <SectionCard title="Parking & Entry" icon={Car}>
      <div className="services-list">
        {gates.map((gate, i) => (
          <div key={i} className="facility-item" style={{ background: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '12px', marginBottom: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem' }}>{gate.name}</span>
              <span style={{ color: gate.load > 70 ? 'var(--danger)' : 'var(--success)', fontWeight: 800, fontSize: '0.7rem' }}>
                {gate.status}
              </span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${gate.load}%`, background: gate.load > 70 ? 'var(--danger)' : 'var(--accent-blue)' }}></div>
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', marginTop: '4px', textAlign: 'right' }}>
              Capacity: {gate.load}%
            </div>
          </div>
        ))}

        <div style={{ marginTop: '10px', background: 'rgba(56, 189, 248, 0.1)', border: '1px dashed var(--accent-blue)', padding: '10px', borderRadius: '8px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowUpRight size={14} color="var(--accent-blue)" />
          <span><b>HINT:</b> Use Gate C for 10 min faster entry.</span>
        </div>
      </div>
    </SectionCard>
  );
};

export default ParkingGates;
