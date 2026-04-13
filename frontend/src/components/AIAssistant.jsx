import React, { useState } from 'react';
import SectionCard from './SectionCard';
import { Send, Bot, Sparkles } from 'lucide-react';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: "Systems online. How can I assist with stadium movement?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const resp = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, userLocation: 'North Stand' })
      });
      const data = await resp.json();
      setMessages(prev => [...prev, { sender: 'ai', text: data.reply || data.fallback }]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: 'ai', text: "Comms disrupted. Checking bypass..." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionCard title="Match Insights" icon={Sparkles} style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '10px 0', fontSize: '0.875rem', display: 'flex', flexDirection: 'column', gap: '12px', minHeight: '200px' }}>
        {messages.map((m, i) => (
          <div key={i} style={{ 
            alignSelf: m.sender === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '90%',
            padding: '10px 14px',
            borderRadius: '12px',
            background: m.sender === 'user' ? 'var(--brand-blue)' : '#f1f5f9',
            color: m.sender === 'user' ? 'white' : 'var(--text-primary)',
            fontSize: '0.8125rem',
            lineHeight: '1.4'
          }}>
            {m.text}
          </div>
        ))}
        {loading && <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontStyle: 'italic' }}>AI is thinking...</div>}
      </div>

      <form onSubmit={handleSend} style={{ marginTop: '1rem', display: 'flex', gap: '8px', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
        <input 
          type="text" value={input} onChange={e => setInput(e.target.value)}
          placeholder="Ask about crowds or stalls..."
          style={{ flex: 1, background: '#f8fafc', border: '1px solid var(--border-subtle)', borderRadius: '8px', padding: '8px 12px', fontSize: '0.8125rem', outline: 'none' }}
        />
        <button type="submit" style={{ background: 'var(--brand-blue)', border: 'none', borderRadius: '8px', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'white' }}>
          <Send size={16} />
        </button>
      </form>
    </SectionCard>
  );
};

export default AIAssistant;
