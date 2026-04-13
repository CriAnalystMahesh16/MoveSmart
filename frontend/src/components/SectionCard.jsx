import React from 'react';

const SectionCard = ({ title, icon: Icon, children }) => {
  return (
    <div className="section-card">
      <div className="card-header">
        <div className="card-icon">
          {Icon && <Icon size={24} strokeWidth={2.5} />}
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
