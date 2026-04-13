import React from 'react';
import Header from './components/Header';
import CrowdStatus from './components/CrowdStatus';
import NavigationAssistant from './components/NavigationAssistant';
import Alerts from './components/Alerts';
import StadiumMap from './components/StadiumMap';
import AIAssistant from './components/AIAssistant';
import CricketGround from './components/CricketGround';
import FoodCourts from './components/FoodCourts';
import Washrooms from './components/Washrooms';
import EmergencyExits from './components/EmergencyExits';
import ParkingGates from './components/ParkingGates';

function App() {
  return (
    <>
      <Header />
      <main className="dashboard-container">
        <div className="dashboard-grid">
          
          {/* TOP SECTION: OVERVIEW */}
          <div className="area-overview">
            <CricketGround />
          </div>
          
          {/* MIDDLE LEFT: NAVIGATION & PHYSICAL MAP */}
          <div className="area-left">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <StadiumMap />
              <NavigationAssistant />
              <CrowdStatus />
            </div>
          </div>

          {/* MIDDLE RIGHT: INTELLIGENCE & ALERTS */}
          <div className="area-right">
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', height: '100%' }}>
              <AIAssistant />
              <Alerts />
            </div>
          </div>

          {/* BOTTOM SECTION: PREMIUM SERVICES GRID */}
          <div className="area-footer">
             <div className="services-grid">
                <FoodCourts />
                <Washrooms />
                <ParkingGates />
                <EmergencyExits />
             </div>
          </div>

        </div>
      </main>
    </>
  );
}

export default App;
