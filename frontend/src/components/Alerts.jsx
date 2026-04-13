import React, { useState, useEffect } from 'react';
import SectionCard from './SectionCard';
import { Bell, AlertTriangle, ArrowRight, Zap } from 'lucide-react';
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

        const lowZone = zones.find(z => z.level === 'Low');
        
        zones.forEach(zone => {
          if (zone.level === 'High') {
            newAlerts.push({
              id: `alert-${zone.id}`,
              type: 'danger',
              title: 'STAND OVERCROWDED',
              message: `${zone.name || zone.id} has reached maximum capacity.`,
              suggestion: lowZone ? `Redirect fans to ${lowZone.name || lowZone.id}.` : null,
              time: 'CRITICAL'
            });
          }
        });

        if (newAlerts.length === 0) {
          newAlerts.push({
            id: 'default-info',
            type: 'info',
            title: 'Match Day Security',
            message: 'All stands playing within safety bounds. Smooth flow.',
            time: 'NORMAL'
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
    <SectionCard title="Live Match Security" icon={Zap}>
      <div className="alerts-list" style={{ gap: '1rem' }}>
        {alerts.map(alert => (
          <div key={alert.id} className={`alert-item ${alert.type === 'info' ? 'info' : ''}`} style={{ 
            background: alert.type === 'info' ? '#f0fdf4' : '#fef2f2', 
            borderLeft: `5px solid ${alert.type === 'info' ? 'var(--success)' : 'var(--danger)'}`,
            padding: '1rem',
            borderRadius: '12px',
            animation: alert.type === 'danger' ? 'alert-pulse 2s infinite' : 'none'
          }}>
            <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <AlertTriangle size={20} color={alert.type === 'info' ? 'var(--success)' : 'var(--danger)'} style={{ marginTop: '2px' }}/>
              <div className="alert-content" style={{ flex: 1 }}>
                <p style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-main)', textTransform: 'uppercase', fontFamily: 'var(--font-score)' }}>{alert.title}</p>
                <p style={{ fontSize: '0.85rem', margin: '4px 0' }}>{alert.message}</p>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 700 }}>MATCH STATUS: {alert.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes alert-pulse {
          0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.4); }
          70% { box-shadow: 0 0 0 10px rgba(239, 68, 68, 0); }
          100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }
      `}</style>
    </SectionCard>
  );
};

export default Alerts;
