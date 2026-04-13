import React from 'react';
import SectionCard from './SectionCard';
import { Bell, AlertTriangle, Info } from 'lucide-react';

const Alerts = () => {
  return (
    <SectionCard title="Live Alerts" icon={Bell}>
      <div className="alerts-list">
        <div className="alert-item">
          <AlertTriangle size={20} color="var(--danger)" />
          <div className="alert-content">
            <p>Gate 4 is temporarily closed due to congestion.</p>
            <span className="alert-time">2 mins ago</span>
          </div>
        </div>
        <div className="alert-item info">
          <Info size={20} color="var(--secondary-color)" />
          <div className="alert-content">
            <p>Half-time show preparations started. Please clear the lower aisles.</p>
            <span className="alert-time">15 mins ago</span>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default Alerts;
