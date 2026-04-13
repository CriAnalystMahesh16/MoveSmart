import React from 'react';
import Header from './components/Header';
import CrowdStatus from './components/CrowdStatus';
import NavigationAssistant from './components/NavigationAssistant';
import Alerts from './components/Alerts';

function App() {
  return (
    <>
      <Header />
      <main className="dashboard-container">
        <div className="dashboard-grid">
          <div className="grid-col-8">
            <CrowdStatus />
          </div>
          <div className="grid-col-4">
            <Alerts />
          </div>
          <div className="grid-col-12">
            <NavigationAssistant />
          </div>
        </div>
      </main>
    </>
  );
}

export default App;
