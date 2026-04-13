import React from 'react';

const SectionCard = ({ title, icon: Icon, children, glow = false, className = "" }) => {
  return (
    <div className={`section-card ${glow ? 'glow-active' : ''} ${className}`}>
      <div className="card-header">
        <div className="card-icon-container">
          {Icon && <Icon size={20} />}
        </div>
        <h2 className="card-title">{title}</h2>
      </div>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default SectionCard;
