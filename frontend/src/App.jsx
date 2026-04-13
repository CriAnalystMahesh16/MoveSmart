import React, { useState } from 'react';
import Header from './components/Header';
import CrowdStatus from './components/CrowdStatus';
import NavigationAssistant from './components/NavigationAssistant';
import Alerts from './components/Alerts';
import CricketGround from './components/CricketGround';
import FoodCourts from './components/FoodCourts';
import Washrooms from './components/Washrooms';
import EmergencyExits from './components/EmergencyExits';
import ParkingGates from './components/ParkingGates';
import AIAssistant from './components/AIAssistant';

function App() {
  const [selections, setSelections] = useState({
    zone: null,
    food: null,
    gate: null,
    washroom: null
  });
  const [isRouteActive, setIsRouteActive] = useState(false);

  const updateSelection = (category, value) => {
    setSelections(prev => ({
      ...prev,
      [category]: prev[category] === value ? null : value
    }));
  };

  const toggleRoute = () => setIsRouteActive(!isRouteActive);

  return (
    <div className="app-container">
      <Header />
      
      <main className="dashboard-layout">
        {/* CENTER COLUMN: Main Stadium View & Services */}
        <section className="main-viewport">
          <CricketGround 
            selectedZone={selections.zone} 
            onZoneClick={(id) => updateSelection('zone', id)}
            isRouteActive={isRouteActive}
          />
          
          <div className="service-rack">
            <FoodCourts 
              selectedFood={selections.food} 
              onSelect={(name) => updateSelection('food', name)}
              selectedZone={selections.zone} 
            />
            <Washrooms 
              selectedFacility={selections.washroom} 
              onSelect={(name) => updateSelection('washroom', name)}
              selectedZone={selections.zone}
            />
            <ParkingGates 
              selectedGate={selections.gate} 
              onSelect={(name) => updateSelection('gate', name)}
              selectedZone={selections.zone}
            />
            <NavigationAssistant 
              isActive={isRouteActive}
              onToggle={toggleRoute}
            />
          </div>
        </section>

        {/* RIGHT COLUMN: Intelligence & Alerts */}
        <aside className="insights-sidebar">
          <AIAssistant />
          <Alerts />
          <EmergencyExits />
          <CrowdStatus />
        </aside>
      </main>
    </div>
  );
}

export default App;
