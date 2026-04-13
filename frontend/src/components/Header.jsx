import React from 'react';
import { Target, Trophy, Flame, Activity, Search, Bell, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="header-wrapper">
      <div className="header-content">
        <div className="app-title">
          <div className="app-badge">
            <Activity size={28} color="var(--accent-color)" />
          </div>
          <span>MoveFast</span>
        </div>
        
        <div className="header-actions">
          <div className="sports-icons" style={{ display: 'none' }}>
            {/* Kept available but hidden unless needed to clean up header */}
          </div>
          <button className="icon-btn">
            <Search size={22} />
          </button>
          <button className="icon-btn">
            <Bell size={22} />
          </button>
          <div className="user-profile">
            <div className="avatar">
              <User size={24} color="white" style={{ margin: '6px' }}/>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>Admin</span>
              <span style={{ fontSize: '0.75rem', color: '#cbd5e1' }}>Manager</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
