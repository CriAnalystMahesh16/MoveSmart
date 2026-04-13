import React from 'react';
import SectionCard from './SectionCard';
import { Map, Navigation } from 'lucide-react';

const NavigationAssistant = () => {
  return (
    <SectionCard title="Navigation Assistant" icon={Map}>
      <div className="nav-path">
        <div className="nav-route">
          <Navigation size={18} className="text-secondary-color" />
          <span>Current Location to Block B</span>
        </div>
        <div className="nav-time">
          <span>Est. Time: 5 mins (Low Traffic)</span>
        </div>
      </div>
      <div className="nav-path" style={{ opacity: 0.7 }}>
        <div className="nav-route">
          <Navigation size={18} className="text-secondary-color" />
          <span>Block B to Concession Stand 3</span>
        </div>
        <div className="nav-time text-warning">
          <span style={{color: 'var(--warning)'}}>Est. Time: 12 mins (Moderate Traffic)</span>
        </div>
      </div>
    </SectionCard>
  );
};

export default NavigationAssistant;
