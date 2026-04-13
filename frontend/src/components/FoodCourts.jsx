import React from 'react';
import SectionCard from './SectionCard';
import { Utensils, Star, Clock } from 'lucide-react';

const stalls = [
  { name: 'Pitch Side Burgers', icon: '🍔', wait: 5, rating: 4.8, isBest: true },
  { name: 'Turbo Tacos', icon: '🌮', wait: 12, rating: 4.5, isBest: false },
  { name: 'Sixer Shakes', icon: '🥤', wait: 8, rating: 4.7, isBest: false },
];

const FoodCourts = () => {
  return (
    <SectionCard title="Food & Refreshments" icon={Utensils}>
      <div className="services-list">
        {stalls.map((stall, i) => (
          <div key={i} className="food-item">
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <span style={{ fontSize: '1.5rem' }}>{stall.icon}</span>
              <div>
                <div style={{ fontWeight: 600, fontSize: '0.95rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {stall.name}
                  {stall.isBest && <span style={{ background: 'var(--pitch-gold)', color: 'var(--primary-deep)', fontSize: '0.65rem', padding: '2px 6px', borderRadius: '4px', fontWeight: 800 }}>BEST OPTION</span>}
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', gap: '8px' }}>
                   <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}><Star size={10} fill="var(--pitch-gold)" stroke="none"/> {stall.rating}</span>
                   <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}><Clock size={10}/> {stall.wait} min wait</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
};

export default FoodCourts;
