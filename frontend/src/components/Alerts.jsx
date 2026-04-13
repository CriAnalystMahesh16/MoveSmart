import React, { useState, useEffect } from 'react';
import SectionCard from './SectionCard';
import { Bell, AlertTriangle, ArrowRight } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(collection(db, 'crowd_zones'), (snapshot) => {
        const newAlerts = [];
        const zones = [];
        snapshot.forEach(doc => zones.push({ id: doc.id, ...doc.data() }));

        // Find best alternative (Lowest level)
        const lowZone = zones.find(z => z.level === 'Low');
        
        zones.forEach(zone => {
          if (zone.level === 'High') {
            newAlerts.push({
              id: `alert-${zone.id}`,
              type: 'danger',
              title: 'Heavy Congestion Detected',
              message: `${zone.id.toUpperCase().replace('-', ' ')} is currently at capacity.`,
              suggestion: lowZone ? `Consider moving to ${lowZone.id.toUpperCase().replace('-', ' ')} (Low Crowd).` : null,
              time: 'Just now'
            });
          }
        });

        // Add a default info alert if no high crowds
        if (newAlerts.length === 0) {
          newAlerts.push({
            id: 'default-info',
            type: 'info',
            title: 'Welcome to MoveFast',
            message: 'All zones are currently within safe capacity. Enjoy the event!',
            time: 'Live'
          });
        }

        setAlerts(newAlerts);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn("Alerts listener failed");
    }
  }, []);

  return (
    <SectionCard title="Live Alerts" icon={Bell}>
      <div className="alerts-list">
        {alerts.map(alert => (
          <div key={alert.id} className={`alert-item ${alert.type === 'info' ? 'info' : ''}`} style={{ flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <AlertTriangle size={20} color={alert.type === 'info' ? 'var(--secondary-color)' : 'var(--danger)'} />
              <div className="alert-content">
                <p style={{ fontWeight: 700, color: 'var(--primary-color)' }}>{alert.title}</p>
                <p>{alert.message}</p>
                <span className="alert-time">{alert.time}</span>
              </div>
            </div>
            {alert.suggestion && (
              <div style={{ background: 'white', padding: '8px 12px', borderRadius: '8px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', border: '1px solid #fee2e2' }}>
                <ArrowRight size={14} color="var(--success)" />
                <span style={{ fontWeight: 500 }}>{alert.suggestion}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default Alerts;
