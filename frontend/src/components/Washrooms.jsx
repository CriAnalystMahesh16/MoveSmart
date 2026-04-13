import React, { useMemo } from 'react';
import SectionCard from './SectionCard';
import { Droplet, Info } from 'lucide-react';

const facilities = [
  { name: 'North Stand A', status: 'Available', queue: 'None', cleanliness: 'Excellent', zone: 'zone-a' },
  { name: 'East Concourse', status: 'Moderate', queue: '4 min', cleanliness: 'Good', zone: 'zone-c' },
  { name: 'South VIP', status: 'Available', queue: 'None', cleanliness: 'Pristine', zone: 'zone-b' },
  { name: 'West Wing', status: 'Busy', queue: '12 min', cleanliness: 'Fair', zone: 'zone-d' },
];

const Washrooms = ({ selectedFacility, onSelect, selectedZone }) => {
  const filtered = useMemo(() => {
    return selectedZone ? facilities.filter(f => f.zone === selectedZone) : facilities;
  }, [selectedZone]);

  return (
    <SectionCard 
      title="Facilities" 
      icon={Droplet}
      className={selectedFacility ? 'active-selection' : ''}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filtered.length === 0 ? (
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center', padding: '1rem' }}>Sector restricted.</div>
        ) : (
          filtered.map((f, i) => {
            const isSelected = f.name === selectedFacility;

            return (
              <div 
                key={i} 
                onClick={() => onSelect(f.name)}
                className="clickable-row"
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: '8px',
                  padding: '12px', 
                  background: isSelected ? '#eff6ff' : '#f8fafc', 
                  borderRadius: '8px',
                  border: isSelected ? '1px solid var(--brand-blue)' : '1px solid #f1f5f9',
                  fontSize: '0.875rem',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 600 }}>{f.name}</span>
                  <span style={{ 
                    color: f.status === 'Available' ? 'var(--brand-success)' : 'var(--brand-warning)',
                    fontWeight: 700,
                    fontSize: '0.75rem'
                  }}>
                    {f.queue.toUpperCase()}
                  </span>
                </div>
                
                {isSelected && (
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px', borderTop: '1px solid rgba(0,0,0,0.05)', paddingTop: '8px' }}>
                    <Info size={12} />
                    <span>Cleanliness: <b>{f.cleanliness}</b> • Location: {f.zone.toUpperCase()}</span>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </SectionCard>
  );
};

export default Washrooms;
