import React, { useMemo } from 'react';
import SectionCard from './SectionCard';
import { Utensils, Star, Clock, Trophy } from 'lucide-react';

const stalls = [
  { name: 'Turbo Tacos', icon: '🌮', wait: 5, rating: 4.8, zone: 'zone-a' },
  { name: 'Catch Cafe', icon: '☕', wait: 2, rating: 4.9, zone: 'zone-c' },
  { name: 'Arena Grill', icon: '🍔', wait: 8, rating: 4.5, zone: 'zone-b' },
  { name: 'Pitch Pizza', icon: '🍕', wait: 12, rating: 4.2, zone: 'zone-d' },
];

const FoodCourts = ({ selectedFood, onSelect, selectedZone }) => {
  // Filter by zone if selected
  const filteredStalls = useMemo(() => {
    return selectedZone ? stalls.filter(s => s.zone === selectedZone) : stalls;
  }, [selectedZone]);

  // Proactive: Auto-detect best option (lowest wait)
  const bestOption = useMemo(() => {
    return [...filteredStalls].sort((a, b) => a.wait - b.wait)[0];
  }, [filteredStalls]);

  return (
    <SectionCard 
      title="Food & Dining" 
      icon={Utensils} 
      className={selectedFood ? 'active-selection' : ''}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {filteredStalls.length === 0 ? (
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textAlign: 'center', padding: '1rem' }}>No vendors in this sector.</div>
        ) : (
          filteredStalls.map((stall, i) => {
            const isBest = stall.name === bestOption?.name;
            const isSelected = stall.name === selectedFood;

            return (
              <div 
                key={i} 
                onClick={() => onSelect(stall.name)}
                className="clickable-row"
                style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  padding: '12px', 
                  background: isSelected ? '#eff6ff' : '#f8fafc', 
                  borderRadius: '8px',
                  border: isSelected ? '1px solid var(--brand-blue)' : '1px solid #f1f5f9',
                  position: 'relative',
                  transition: 'all 0.2s'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <span style={{ fontSize: '1.25rem' }}>{stall.icon}</span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{stall.name}</div>
                      {isBest && (
                        <span className="best-badge" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Trophy size={10} /> BEST
                        </span>
                      )}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', gap: '12px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Star size={10} fill="#fbbf24" stroke="none"/> {stall.rating}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={10}/> {stall.wait}m wait</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </SectionCard>
  );
};

export default FoodCourts;
