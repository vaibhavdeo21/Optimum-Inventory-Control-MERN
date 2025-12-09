import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IndianRupee, ArrowDownLeft, ArrowUpRight, Calendar, Clock } from 'lucide-react';

const Reports = () => {
  const [transactions, setTransactions] = useState([]);
  const [currentValue, setCurrentValue] = useState(0);
  const [stats, setStats] = useState({ addedToday: 0, dispatchedToday: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // 1. Fetch Inventory for Value Calculation
      const invRes = await axios.get('http://localhost:5000/api/spares');
      const totalVal = invRes.data.reduce((sum, item) => sum + (item.currentStock * item.unitPrice), 0);
      setCurrentValue(totalVal);

      // 2. Fetch Transactions
      const transRes = await axios.get('http://localhost:5000/api/transactions');
      setTransactions(transRes.data);

      // 3. Calculate Today's Stats
      const today = new Date().toDateString();
      let added = 0;
      let dispatched = 0;

      transRes.data.forEach(t => {
        const tDate = new Date(t.date).toDateString();
        if (tDate === today) {
          if (t.type === 'IN') added += t.quantity;
          if (t.type === 'OUT') dispatched += t.quantity;
        }
      });

      setStats({ addedToday: added, dispatchedToday: dispatched });

    } catch (err) { console.error(err); }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header>
        <h1 className="text-3xl font-extrabold text-slate-800">Inventory Reports</h1>
        <p className="text-slate-500 mt-1">Real-time asset value and transaction history</p>
      </header>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Total Current Value */}
        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-6 rounded-2xl text-white shadow-lg">
          <div className="flex items-center gap-3 mb-2 opacity-90">
            <IndianRupee size={20} />
            <span className="font-semibold">Current Asset Worth</span>
          </div>
          <p className="text-3xl font-bold">₹ {currentValue.toLocaleString('en-IN')}</p>
          <p className="text-xs text-emerald-100 mt-2">Value of items physically in store</p>
        </div>

        {/* Card 2: Added Today */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-semibold">Received Today</p>
            <p className="text-3xl font-bold text-slate-800">{stats.addedToday} <span className="text-sm font-normal text-slate-400">units</span></p>
          </div>
          <div className="p-3 bg-blue-50 text-blue-600 rounded-full">
            <ArrowDownLeft size={24} />
          </div>
        </div>

        {/* Card 3: Dispatched Today */}
        <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-slate-500 text-sm font-semibold">Dispatched Today</p>
            <p className="text-3xl font-bold text-slate-800">{stats.dispatchedToday} <span className="text-sm font-normal text-slate-400">units</span></p>
          </div>
          <div className="p-3 bg-amber-50 text-amber-600 rounded-full">
            <ArrowUpRight size={24} />
          </div>
        </div>
      </div>

      {/* TRANSACTION TABLE */}
      <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-700 flex items-center gap-2">
            <Clock className="text-slate-400" size={20}/> Activity Logs
          </h2>
          <span className="text-xs bg-slate-100 text-slate-500 px-3 py-1 rounded-full">Sorted by Newest</span>
        </div>
        
        <div className="max-h-[500px] overflow-y-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold sticky top-0">
              <tr>
                <th className="p-4">Time</th>
                <th className="p-4">Type</th>
                <th className="p-4">Item Details</th>
                <th className="p-4 text-right">Quantity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {transactions.map((t) => (
                <tr key={t._id} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4 text-sm text-slate-500">
                    <div className="flex items-center gap-2">
                      <Calendar size={14}/>
                      {new Date(t.date).toLocaleDateString()} 
                      <span className="text-slate-300">|</span> 
                      {new Date(t.date).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </div>
                  </td>
                  <td className="p-4">
                    {t.type === 'IN' ? (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 text-xs font-bold border border-blue-100">
                        <ArrowDownLeft size={12}/> Received
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-amber-50 text-amber-700 text-xs font-bold border border-amber-100">
                        <ArrowUpRight size={12}/> Dispatched
                      </span>
                    )}
                  </td>
                  <td className="p-4">
                    <p className="font-bold text-slate-700">{t.itemName}</p>
                    <p className="text-xs text-slate-400">SKU: {t.sku}</p>
                  </td>
                  <td className={`p-4 text-right font-bold text-lg ${t.type === 'IN' ? 'text-blue-600' : 'text-amber-600'}`}>
                    {t.type === 'IN' ? '+' : '-'}{t.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Reports;