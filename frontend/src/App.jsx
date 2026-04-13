import React from 'react';
import Header from './components/Header';
import CrowdStatus from './components/CrowdStatus';
import NavigationAssistant from './components/NavigationAssistant';
import Alerts from './components/Alerts';
import StadiumMap from './components/StadiumMap';
import AIAssistant from './components/AIAssistant';

function App() {
  return (
    <>
      <Header />
      <main className="dashboard-container">
        <div className="dashboard-grid">
          <div className="grid-col-12">
            <StadiumMap />
          </div>
          
          <div className="grid-col-8">
            <CrowdStatus />
          </div>
          <div className="grid-col-4">
            <Alerts />
          </div>

          <div className="grid-col-7" style={{ gridColumn: 'span 7' }}>
            <NavigationAssistant />
          </div>
          <div className="grid-col-5" style={{ gridColumn: 'span 5' }}>
            <AIAssistant />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
