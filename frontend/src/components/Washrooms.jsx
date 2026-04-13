import React from 'react';
import SectionCard from './SectionCard';
import { Droplet, Info } from 'lucide-react';

const facilities = [
  { name: 'North Pavilion Restroom', status: 'Good', queue: 'No Queue' },
  { name: 'South Stand Restroom', status: 'Busy', queue: '5 min' },
  { name: 'East Concourse Facility', status: 'Cleaning', queue: 'Closed' },
];

const Washrooms = () => {
  return (
    <SectionCard title="Washrooms & Sanitation" icon={Droplet}>
      <div className="services-list">
        {facilities.map((f, i) => (
          <div key={i} className="facility-item" style={{ 
            background: 'rgba(0,0,0,0.15)', 
            padding: '12px', 
            borderRadius: '12px', 
            marginBottom: '8px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            fontSize: '0.9rem'
          }}>
            <div>
              <div style={{ fontWeight: 600 }}>{f.name}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Status: {f.status}</div>
            </div>
            <div style={{ 
              background: f.status === 'Good' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
              color: f.status === 'Good' ? '#4ade80' : '#f87171',
              padding: '4px 8px',
              borderRadius: '6px',
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase'
            }}>
              {f.queue}
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default Washrooms;
