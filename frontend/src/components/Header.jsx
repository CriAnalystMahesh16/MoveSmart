// Header.jsx
import React from 'react';
import { LayoutDashboard, Bell, User, Search } from 'lucide-react';

const Header = () => {
  return (
    <nav className="saas-navbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div style={{ background: 'var(--brand-blue)', color: 'white', padding: '8px', borderRadius: '8px' }}>
          <LayoutDashboard size={20} />
        </div>
        <span style={{ fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.025em' }}>MoveFast <span style={{ color: 'var(--brand-blue)' }}>Pro</span></span>
      </div>

      <div style={{ flex: 1, maxWidth: '400px', margin: '0 2rem' }}>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Search zones, stalls, or alerts..." 
            style={{ 
              width: '100%', 
              background: '#f1f5f9', 
              border: 'none', 
              borderRadius: '8px', 
              padding: '10px 10px 10px 40px',
              fontSize: '0.875rem'
            }} 
          />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <Bell size={20} color="var(--text-secondary)" />
          <div style={{ position: 'absolute', top: '-2px', right: '-2px', width: '8px', height: '8px', background: 'var(--brand-danger)', borderRadius: '50%', border: '2px solid white' }}></div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', paddingLeft: '1.5rem', borderLeft: '1px solid var(--border-subtle)' }}>
           <div style={{ textAlign: 'right' }}>
             <div style={{ fontSize: '0.875rem', fontWeight: 600 }}>Mahesh W.</div>
             <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>Arena Admin</div>
           </div>
           <div style={{ width: '36px', height: '36px', background: '#e2e8f0', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
             <User size={20} color="var(--text-secondary)" />
           </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
