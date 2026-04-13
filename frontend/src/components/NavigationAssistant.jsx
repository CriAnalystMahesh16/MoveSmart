import React, { useState, useEffect } from 'react';
import SectionCard from './SectionCard';
import { Compass, ArrowRight, Zap } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const NavigationAssistant = ({ isActive, onToggle }) => {
  const [bestPath, setBestPath] = useState('Calculating...');
  const [bestZone, setBestZone] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'crowd_zones'), (snapshot) => {
      let zones = [];
      snapshot.forEach(doc => zones.push({ id: doc.id, ...doc.data() }));
      const weight = { 'Low': 1, 'Medium': 2, 'High': 3 };
      const low = zones.sort((a, b) => (weight[a.level] || 1) - (weight[b.level] || 1))[0];
      if (low) {
        setBestZone(low);
        setBestPath(low.name || low.id.toUpperCase());
      }
    });
    return () => unsub();
  }, []);

  return (
    <SectionCard 
      title="Best Route" 
      icon={Compass}
      className={isActive ? 'active-selection' : ''}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <div 
          onClick={onToggle}
          className="clickable-row"
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '12px', 
            padding: '12px', 
            background: isActive ? '#eff6ff' : '#f8fafc', 
            borderRadius: '8px', 
            border: isActive ? '1px solid var(--brand-blue)' : '1px solid #dbeafe',
            transition: 'all 0.2s'
          }}
        >
          <div style={{ background: isActive ? 'var(--brand-blue)' : '#dbeafe', padding: '8px', borderRadius: '50%', color: isActive ? 'white' : 'var(--brand-blue)' }}>
            <Compass size={20} />
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 600, color: isActive ? 'var(--brand-blue)' : 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              {isActive ? 'Path Active' : 'Optimal Vector'}
            </div>
            <div style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary)' }}>{bestPath}</div>
          </div>
        </div>

        {bestZone && (
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <span style={{ padding: '6px 12px', background: '#ecfdf5', color: '#065f46', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Zap size={12} /> Live Flow: {bestZone.level || 'Low'}
            </span>
            <button 
              onClick={onToggle}
              style={{ background: 'none', border: 'none', color: 'var(--brand-blue)', fontSize: '0.75rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              {isActive ? 'Hide Route' : 'Map Best Route'} <ArrowRight size={12} />
            </button>
          </div>
        )}
      </div>
    </SectionCard>
  );
};

export default NavigationAssistant;
