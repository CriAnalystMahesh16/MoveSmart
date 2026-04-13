// Alerts.jsx
import React, { useState, useEffect } from 'react';
import SectionCard from './SectionCard';
import { Bell, AlertTriangle, ShieldCheck } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(collection(db, 'crowd_zones'), (snapshot) => {
        const newAlerts = [];
        snapshot.forEach(doc => {
          const zone = doc.data();
          if (zone.level === 'High') {
            newAlerts.push({
              id: `alert-${doc.id}`,
              title: 'Heavy Traffic',
              message: `${doc.id.toUpperCase()} is approaching full capacity.`,
              type: 'warning'
            });
          }
        });
        setAlerts(newAlerts);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn("Alerts listener failed");
    }
  }, []);

  return (
    <SectionCard title="System Alerts" icon={Bell}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {alerts.length === 0 ? (
          <div style={{ display: 'flex', gap: '12px', padding: '12px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #dcfce7' }}>
            <ShieldCheck size={18} color="#16a34a" />
            <div style={{ fontSize: '0.8125rem', color: '#166534', fontWeight: 500 }}>All systems operational. No active alerts.</div>
          </div>
        ) : (
          alerts.map(alert => (
            <div key={alert.id} style={{ 
              display: 'flex', 
              gap: '12px', 
              padding: '12px', 
              background: '#fffbeb', 
              borderRadius: '8px', 
              border: '1px solid #fef3c7' 
            }}>
              <AlertTriangle size={18} color="#d97706" />
              <div>
                <div style={{ fontWeight: 700, fontSize: '0.8125rem', color: '#92400e' }}>{alert.title}</div>
                <div style={{ fontSize: '0.75rem', color: '#b45309' }}>{alert.message}</div>
              </div>
            </div>
          ))
        )}
      </div>
    </SectionCard>
  );
};

export default Alerts;
