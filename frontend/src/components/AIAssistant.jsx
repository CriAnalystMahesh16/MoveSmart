import React, { useState } from 'react';
import SectionCard from './SectionCard';
import { MessageSquare, Send, Bot, MapPin } from 'lucide-react';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Hi! I'm your MoveFast Assistant. Ask me for directions or the best uncrowded food spots near you!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [userLocation, setUserLocation] = useState('Zone A (North Gate)');

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
      
      if (data.reply) {
        setMessages(prev => [...prev, { sender: 'ai', text: data.reply }]);
      } else if (data.fallback) {
        setMessages(prev => [...prev, { sender: 'ai', text: data.fallback }]);
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { sender: 'ai', text: "Sorry, I'm having trouble connecting to the server!" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionCard title="AI Stadium Guide" icon={MessageSquare}>
      <div style={{ display: 'flex', flexDirection: 'column', height: '400px' }}>
        
        {/* Context Selector */}
        <div style={{ paddingBottom: '10px', borderBottom: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin size={16} color="var(--secondary-color)" />
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>My Location:</span>
          <select 
            value={userLocation} 
            onChange={e => setUserLocation(e.target.value)}
            style={{ padding: '4px 8px', borderRadius: '8px', border: '1px solid #cbd5e1', outline: 'none', fontSize: '0.85rem', background: '#f8fafc', color: 'var(--text-main)', cursor: 'pointer' }}
          >
            <option value="Zone A (North Gate)">Zone A (North Gate)</option>
            <option value="Zone B (South Entrance)">Zone B (South Entrance)</option>
            <option value="Zone C (East Concourse)">Zone C (East Concourse)</option>
            <option value="Outside Stadium">Outside Stadium</option>
          </select>
        </div>

        {/* Chat History */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '12px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              background: msg.sender === 'user' ? 'var(--primary-color)' : '#f1f5f9',
              color: msg.sender === 'user' ? 'white' : 'var(--text-main)',
              padding: '10px 14px',
              borderRadius: '16px',
              borderBottomRightRadius: msg.sender === 'user' ? '4px' : '16px',
              borderBottomLeftRadius: msg.sender === 'ai' ? '4px' : '16px',
              maxWidth: '85%',
              display: 'flex',
              gap: '8px',
              lineHeight: 1.4,
              fontSize: '0.95rem',
              boxShadow: msg.sender === 'ai' ? '0 2px 4px rgba(0,0,0,0.02)' : 'none'
            }}>
              {msg.sender === 'ai' && <Bot size={18} style={{ flexShrink: 0, marginTop: '2px', color: 'var(--secondary-color)' }}/>}
              <span>{msg.text}</span>
            </div>
          ))}
          {loading && (
            <div style={{ alignSelf: 'flex-start', background: '#f1f5f9', padding: '10px 14px', borderRadius: '16px', borderBottomLeftRadius: '4px', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Thinking about best routes...
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSend} style={{ display: 'flex', gap: '8px', marginTop: '10px', paddingTop: '10px', borderTop: '1px solid var(--border-color)' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me for directions..."
            disabled={loading}
            style={{
              flex: 1,
              padding: '12px 16px',
              borderRadius: '24px',
              border: '1px solid var(--border-color)',
              outline: 'none',
              fontSize: '0.95rem',
              background: '#f8fafc',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = 'var(--secondary-color)'}
            onBlur={(e) => e.target.style.borderColor = 'var(--border-color)'}
          />
          <button type="submit" disabled={loading} style={{
            background: 'var(--secondary-color)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '46px',
            height: '46px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: loading ? 'not-allowed' : 'pointer',
            transition: 'transform 0.2s, background 0.2s',
            boxShadow: '0 4px 6px rgba(14, 165, 233, 0.2)'
          }}
          onMouseOver={e => !loading && (e.currentTarget.style.transform = 'translateY(-2px)')}
          onMouseOut={e => !loading && (e.currentTarget.style.transform = 'none')}
          >
            <Send size={20} style={{ transform: 'translateX(-1px)' }}/>
          </button>
        </form>

      </div>
    </SectionCard>
  );
};

export default AIAssistant;
