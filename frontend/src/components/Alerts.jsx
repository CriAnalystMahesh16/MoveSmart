// Alerts.jsx
import React, { useState, useEffect } from 'react';
import SectionCard from './SectionCard';
import { Bell, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    try {
      const unsubscribe = onSnapshot(collection(db, 'crowdData'), (snapshot) => {
        const zones = [];
        snapshot.forEach(doc => {
          const data = doc.data();
          zones.push({ id: doc.id, level: data.crowdLevel || 'Low' });
        });

        // 1. Identify High Intensity Zones
        const highZones = zones.filter(z => z.level === 'High');
        
        // 2. Identify the Absolute Best Alternative (Lowest Traffic)
        const weight = { 'Low': 1, 'Medium': 2, 'High': 3 };
        const optimalZone = [...zones].sort((a, b) => weight[a.level] - weight[b.level])[0];

        const newAlerts = highZones.map(hz => ({
          id: `alert-${hz.id}`,
          title: 'Critical Congestion',
          message: `${hz.id} is at peak capacity.`,
          suggestion: `Redirect traffic to ${optimalZone.id} (${optimalZone.level} flow).`,
          type: 'error'
        }));

        setAlerts(newAlerts);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn("Alerts listener failed");
    }
  }, []);

  return (
    <SectionCard title="Live Alerts" icon={Bell}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {alerts.length === 0 ? (
          <div style={{ display: 'flex', gap: '12px', padding: '12px', background: '#f0fdf4', borderRadius: '8px', border: '1px solid #dcfce7' }}>
            <ShieldCheck size={18} color="#16a34a" />
            <div style={{ fontSize: '0.8125rem', color: '#166534', fontWeight: 500 }}>Operational Status: Optimal</div>
          </div>
        ) : (
          alerts.map(alert => (
            <div key={alert.id} className="pulse-alert" style={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: '8px', 
              padding: '14px', 
              background: '#fff1f2', 
              borderRadius: '8px', 
              border: '1px solid #fecaca' 
            }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <AlertTriangle size={18} color="var(--brand-danger)" />
                <div style={{ fontWeight: 800, fontSize: '0.8125rem', color: '#991b1b', textTransform: 'uppercase' }}>{alert.title}</div>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#b91c1c', fontWeight: 600 }}>{alert.message}</div>
              
              <div style={{ 
                marginTop: '4px',
                padding: '8px', 
                background: 'rgba(255,255,255,0.5)', 
                borderRadius: '6px', 
                fontSize: '0.7rem', 
                color: '#991b1b',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <ArrowRight size={12} />
                <span>{alert.suggestion}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </SectionCard>
  );
};

export default Alerts;
