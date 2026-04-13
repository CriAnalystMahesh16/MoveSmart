import React, { useState, useEffect } from 'react';
import SectionCard from './SectionCard';
import { Send, Sparkles, Zap, Trophy, TrendingDown } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Operational Status: Optimal. Strategic recommendations updated.' }
  ]);
  const [input, setInput] = useState('');
  const [recommendations, setRecommendations] = useState({ zone: 'North', food: 'Turbo Tacos' });

  useEffect(() => {
    // Listen to crowdData for zone recommendations
    const unsub = onSnapshot(collection(db, 'crowdData'), (snapshot) => {
      let zones = [];
      snapshot.forEach(doc => {
        const data = doc.data();
        zones.push({ id: doc.id, level: data.crowdLevel || 'Low' });
      });

      if (zones.length > 0) {
        const weight = { 'Low': 1, 'Medium': 2, 'High': 3 };
        const low = zones.sort((a, b) => weight[a.level] - weight[b.level])[0];
        setRecommendations(prev => ({ ...prev, zone: low.id }));
      }
    });
    return () => unsub();
  }, []);

  return (
    <SectionCard title="AI Operations Hub" icon={Sparkles}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        
        {/* RECOMMENDED SECTION */}
        <div style={{ padding: '14px', background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)', borderRadius: '12px', border: '1px solid #bae6fd' }}>
           <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
              <Zap size={14} color="var(--brand-purple)" fill="var(--brand-purple)" />
              <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0369a1', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Strategy Highlights</span>
           </div>
           
           <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <span style={{ fontSize: '0.75rem', color: '#075985', fontWeight: 600 }}>Optimal Stand</span>
                 <span className="recommended-badge">{recommendations.zone}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <span style={{ fontSize: '0.75rem', color: '#075985', fontWeight: 600 }}>Best Dining</span>
                 <span className="recommended-badge">{recommendations.food}</span>
              </div>
           </div>
        </div>

        {/* CHAT INTERFACE (MINIMIZED) */}
        <div className="chat-area" style={{ height: '140px', overflowY: 'auto', padding: '10px', background: '#f8fafc', borderRadius: '8px', border: '1px solid #f1f5f9', fontSize: '0.75rem' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ marginBottom: '8px', textAlign: m.role === 'assistant' ? 'left' : 'right' }}>
              <div style={{ 
                display: 'inline-block', 
                padding: '8px 12px', 
                borderRadius: '8px', 
                background: m.role === 'assistant' ? '#fff' : 'var(--brand-blue)',
                color: m.role === 'assistant' ? 'var(--text-primary)' : '#fff',
                boxShadow: 'var(--shadow-sm)'
              }}>
                {m.text}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Operations AI..." 
            style={{ flex: 1, padding: '10px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.8125rem' }} 
          />
          <button style={{ padding: '10px', borderRadius: '8px', background: 'var(--brand-blue)', color: '#white', border: 'none' }}>
            <Send size={16} color="white" />
          </button>
        </div>
      </div>
    </SectionCard>
  );
};

export default AIAssistant;
