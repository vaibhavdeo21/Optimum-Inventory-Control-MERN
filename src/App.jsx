import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import all your components
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import AddStock from './components/AddStock';

function App() {
  return (
    <BrowserRouter>
      
      <div className="flex min-h-screen bg-gradient-to-br from-slate-50 to-indigo-50/30">
        
        
        <Sidebar />

        <div className="flex-1 ml-64 p-8">
          <Routes>
            {/* 1. Dashboard (Home) */}
            <Route path="/" element={<Dashboard />} />
            
            {/* 2. Analytics & ABC Analysis */}
            <Route path="/analytics" element={<Analytics />} />
            
            {/* 3. Incoming Stock (Restocking) */}
            <Route path="/add-stock" element={<AddStock />} />
            
            {/* 4. Settings & Export */}
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;