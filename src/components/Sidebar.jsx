import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, PackagePlus, BarChart3, Settings, Package } from 'lucide-react';

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
      isActive 
        ? 'bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/30' 
        : 'text-slate-400 hover:bg-white/5 hover:text-white'
    }`;

  return (
    <div className="w-64 h-screen bg-slate-900 flex flex-col fixed left-0 top-0 border-r border-slate-800 shadow-2xl z-50">
      
      {/* Gradient Overlay for texture */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800/50 to-slate-900 pointer-events-none" />

      <div className="relative p-6 flex items-center gap-3 z-10">
        <div className="p-2 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-lg shadow-lg">
          <Package className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight">InvControl</h1>
          <p className="text-xs text-indigo-400">Pro India</p>
        </div>
      </div>

      <nav className="relative flex-1 p-4 space-y-2 z-10">
        <p className="px-4 text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Menu</p>
        <NavLink to="/" className={linkClasses}>
          <LayoutDashboard className="w-5 h-5" />
          Dashboard
        </NavLink>
        <NavLink to="/analytics" className={linkClasses}>
          <BarChart3 className="w-5 h-5" />
          Analytics (ABC)
        </NavLink>
        <NavLink to="/add-stock" className={linkClasses}>
          <PackagePlus className="w-5 h-5" />
          Incoming Stock
        </NavLink>
        <NavLink to="/settings" className={linkClasses}>
          <Settings className="w-5 h-5" />
          Settings
        </NavLink>
      </nav>

      <div className="relative p-4 z-10">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-4 rounded-xl border border-slate-700/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            <p className="text-xs font-semibold text-slate-300">System Live</p>
          </div>
          <p className="text-xs text-slate-500">Connected to Jalandhar Server</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;