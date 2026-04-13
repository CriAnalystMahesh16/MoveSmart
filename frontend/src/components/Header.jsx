import React, { useState, useEffect } from 'react';
import { Search, Bell, User, LayoutDashboard, Database } from 'lucide-react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

// Custom Minimal Cricket Icon (SVG)
const CricketIcon = ({ size = 24, color = "currentColor" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19 3L5 17L7 19L21 5L19 3Z" fill={color} />
    <path d="M4.5 17.5L3 19L5 21L6.5 19.5" stroke={color} strokeWidth="2" strokeLinecap="round"/>
    <circle cx="16" cy="18" r="3" fill={color} />
  </svg>
);

const Header = () => {
  return (
    <header style={{ 
      background: 'rgba(15, 23, 42, 0.8)', 
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      padding: '0.75rem 2rem',
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      <div className="header-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1600px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '3rem' }}>
          <div className="app-logo" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ background: 'var(--accent-blue)', padding: '6px', borderRadius: '10px' }}>
               <CricketIcon size={20} color="var(--primary-deep)" />
            </div>
            <span style={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>MoveFast <span style={{ color: 'var(--accent-blue)', fontWeight: 400 }}>Pro</span></span>
          </div>

          <nav style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--accent-blue)', fontWeight: 600, borderBottom: '2px solid var(--accent-blue)', padding: '8px 0' }}>
              <LayoutDashboard size={16}/> Command Center
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', padding: '8px 0', cursor: 'pointer' }}>
              <Database size={16}/> Audience Records
            </div>
          </nav>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <div className="live-match-box" style={{ border: 'none', background: 'rgba(255,255,255,0.05)', padding: '6px 12px' }}>
             <div className="live-pill">
                <div className="pulse-dot"></div>
                <span>IPL 2026 LIVE</span>
             </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '1.5rem' }}>
            <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Search size={20}/></button>
            <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Bell size={20}/></button>
            <div style={{ width: '32px', height: '32px', background: 'var(--accent-blue)', borderRadius: '50%', display: 'flex', alignItems: 'center', justify_content: 'center' }}>
               <User size={18} color="var(--primary-deep)" />
            </div>
          </div>
        </div>

      </div>
    </header>
  );
};

export default Header;
