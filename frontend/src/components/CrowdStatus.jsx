import React, { useState, useEffect } from 'react';
import SectionCard from './SectionCard';
import { Users } from 'lucide-react';

const CrowdStatus = () => {
  const [zones, setZones] = useState([
    { id: 'Z1', name: 'North Gate', density: 'High', capacity: 85 },
    { id: 'Z2', name: 'East Concourse', density: 'Moderate', capacity: 55 },
    { id: 'Z3', name: 'Food Court A', density: 'Low', capacity: 20 },
  ]);

  return (
    <SectionCard title="Crowd Status" icon={Users}>
      <div className="crowd-list">
        {zones.map(zone => (
          <div key={zone.id} className="crowd-item">
            <span className="crowd-zone">{zone.name}</span>
            <span className={`density-badge density-${zone.density.toLowerCase()}`}>
              {zone.density}
            </span>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default CrowdStatus;
