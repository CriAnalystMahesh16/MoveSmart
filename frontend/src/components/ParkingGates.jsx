import React, { useMemo } from 'react';
import SectionCard from './SectionCard';
import { Car, CheckCircle2 } from 'lucide-react';

const gates = [
  { name: 'Gate Alpha', occupancy: '42%', pct: 42, status: 'Fast', zone: 'North' },
  { name: 'Gate Beta', occupancy: '88%', pct: 88, status: 'Busy', zone: 'South' },
  { name: 'Gate Gamma', occupancy: '15%', pct: 15, status: 'Empty', zone: 'West' },
];

const ParkingGates = ({ selectedGate, onSelect, selectedZone }) => {
  const filtered = useMemo(() => {
    return selectedZone ? gates.filter(g => g.zone === selectedZone) : gates;
  }, [selectedZone]);

  // Proactive: Auto-detect best entry (lowest occupancy)
  const bestGate = useMemo(() => {
    return [...filtered].sort((a, b) => a.pct - b.pct)[0];
  }, [filtered]);

  return (
    <SectionCard 
      title="Entry Control" 
      icon={Car}
      className={selectedGate ? 'active-selection' : ''}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {filtered.length === 0 ? (
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center', padding: '1rem' }}>Gate inactive for this sector.</div>
        ) : (
          filtered.map((gate, i) => {
            const isBest = gate.name === bestGate?.name;
            const isSelected = gate.name === selectedGate;

            return (
              <div 
                key={i} 
                onClick={() => onSelect(gate.name)}
                className="clickable-row"
                style={{ 
                  padding: '12px', 
                  background: isSelected ? '#eff6ff' : '#f8fafc', 
                  borderRadius: '8px', 
                  border: isSelected ? '1px solid var(--brand-blue)' : '1px solid #f1f5f9',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.8125rem', fontWeight: 700 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span>{gate.name}</span>
                    {isBest && (
                      <span className="best-badge">
                        <CheckCircle2 size={10} style={{ marginRight: '4px' }} /> OPTIMAL
                      </span>
                    )}
                  </div>
                  <span style={{ color: gate.pct > 70 ? 'var(--brand-danger)' : 'var(--text-secondary)' }}>{gate.occupancy}</span>
                </div>
                <div className="intensity-bar">
                   <div style={{ 
                     width: gate.occupancy, 
                     height: '100%', 
                     background: gate.pct > 70 ? 'var(--brand-danger)' : 'var(--brand-blue)',
                     transition: 'width 0.6s ease'
                   }}></div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </SectionCard>
  );
};

export default ParkingGates;
