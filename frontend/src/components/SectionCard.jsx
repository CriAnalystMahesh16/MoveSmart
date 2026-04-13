import React from 'react';

const SectionCard = ({ title, icon: Icon, children, className = "" }) => {
  return (
    <div className={`saas-card ${className}`}>
      {title && (
        <div className="card-title-pro">
          <div style={{ color: 'var(--brand-blue)' }}>
            {Icon && <Icon size={18} />}
          </div>
          {title}
        </div>
      )}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default SectionCard;
