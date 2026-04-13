import React, { useState } from 'react';
import SectionCard from './SectionCard';
import { MessageSquare, Send, Bot, MapPin, Trophy } from 'lucide-react';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Welcome to the IPL Match Day! I'm your Stand Concierge. Need the nearest bar or a low-crowd exit path?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState('Pavilion North');

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, userLocation })
      });
      const data = await response.json();
      setMessages(prev => [...prev, { sender: 'ai', text: data.reply || data.fallback }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'ai', text: "Network break! Please check your stadium connectivity." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionCard title="Match Day Concierge" icon={Trophy}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '400px' }}>
        
        <div style={{ paddingBottom: '10px', borderBottom: '1px solid #e2e8f0', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin size={16} color="var(--grass-green)" />
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>Current Stand:</span>
          <select 
            value={userLocation} 
            onChange={e => setUserLocation(e.target.value)}
            style={{ padding: '4px 8px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.85rem', background: 'white', fontWeight: 600 }}
          >
            <option value="Pavilion North">Pavilion North</option>
            <option value="Grand Stand South">Grand Stand South</option>
            <option value="East Boundary Stand">East Boundary Stand</option>
          </select>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              background: msg.sender === 'user' ? 'var(--grass-green)' : '#f8fafc',
              color: msg.sender === 'user' ? 'white' : 'var(--text-main)',
              padding: '12px 16px',
              borderRadius: '16px',
              border: msg.sender === 'ai' ? '1px solid #e2e8f0' : 'none',
              maxWidth: '85%',
              display: 'flex',
              gap: '10px',
              fontSize: '0.9rem',
              lineHeight: 1.5
            }}>
              {msg.sender === 'ai' && <Bot size={18} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--pitch-clay)' }}/>}
              <span>{msg.text}</span>
            </div>
          ))}
          {loading && (
            <div style={{ padding: '12px', color: 'var(--text-muted)', fontSize: '0.8rem', fontStyle: 'italic' }}>Calculating match day routes...</div>
          )}
        </div>

        <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px', paddingTop: '10px', borderTop: '1px solid #e2e8f0' }}>
          <input
            type="text" value={input} onChange={(e) => setInput(e.target.value)}
            placeholder="Ask your concierge..."
            disabled={loading}
            style={{ flex: 1, padding: '12px', borderRadius: '24px', border: '1px solid #cbd5e1', outline: 'none' }}
          />
          <button type="submit" disabled={loading} style={{
            background: 'var(--grass-green)', color: 'white', border: 'none', borderRadius: '50%', width: '45px', height: '45px', display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <Send size={18} />
          </button>
        </form>
      </div>
    </SectionCard>
  );
};

export default AIAssistant;
