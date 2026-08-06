import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserPlus, FaKey, FaTrash, FaDatabase, FaCheckCircle, FaExclamationTriangle, FaArrowLeft } from 'react-icons/fa';
import bg from './assets/back2.png';

import { API_BASE } from '../config/api';

const SuperAdminPanel = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('superadmin');
  const [adminsList, setAdminsList] = useState([]);
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(false);
  const [seedLoading, setSeedLoading] = useState(false);

  const showNotify = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem('javith_jwt_token') || sessionStorage.getItem('javith_admin_auth') || '';
      const res = await fetch(`${API_BASE}/auth/admins`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      const data = await res.json();
      if (data.success && data.admins) {
        setAdminsList(data.admins);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAdmins();
  }, []);

  // Create Admin Account Form Submit
  const handleCreateAdmin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      showNotify('Username and Password are required!', 'error');
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('javith_jwt_token') || sessionStorage.getItem('javith_admin_auth') || '';
      const res = await fetch(`${API_BASE}/auth/admins`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ username, password, email, role })
      });
      const data = await res.json();

      if (data.success) {
        showNotify(`Account "${username}" (${role}) created successfully in Database!`);
        setUsername('');
        setPassword('');
        setEmail('');
        fetchAdmins();
      } else {
        showNotify(data.error || 'Failed to create account', 'error');
      }
    } catch (err) {
      showNotify('Error connecting to backend server', 'error');
    }
    setLoading(false);
  };

  // Seed Database Assets
  const handleSeedDatabase = async () => {
    setSeedLoading(true);
    try {
      const res = await fetch(`${API_BASE}/seed`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        showNotify('Database seeded with all projects, skills, certificates & default admin!');
      } else {
        showNotify(data.error || 'Failed to seed database', 'error');
      }
    } catch (err) {
      showNotify('Error connecting to server', 'error');
    }
    setSeedLoading(false);
  };

  const handleDeleteAdmin = async (id) => {
    if (!window.confirm('Delete this admin account from DB?')) return;
    try {
      const token = localStorage.getItem('javith_jwt_token') || sessionStorage.getItem('javith_admin_auth') || '';
      await fetch(`${API_BASE}/auth/admins/${id}`, { 
        method: 'DELETE',
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      showNotify('Admin deleted successfully');
      fetchAdmins();
    } catch (err) {
      setAdminsList(adminsList.filter(a => a.id !== id));
      showNotify('Admin deleted');
    }
  };

  return (
    <div 
      className="min-h-screen w-full bg-[#0D0C0C] font-['Outfit'] text-white flex flex-col items-center justify-center p-4 bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bg})` }}
    >
      {/* Toast Notification */}
      {notification && (
        <div className={`fixed top-6 right-6 z-[2000] px-5 py-3 rounded-2xl border text-white shadow-2xl flex items-center gap-3 ${
          notification.type === 'error' ? 'bg-red-900/90 border-red-500' : 'bg-emerald-900/90 border-emerald-500'
        }`}>
          {notification.type === 'error' ? <FaExclamationTriangle /> : <FaCheckCircle />}
          <span className="text-sm font-medium">{notification.msg}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-[800px] w-full bg-white/10 backdrop-blur-2xl p-6 sm:p-10 rounded-3xl border border-white/15 shadow-[0_10px_40px_rgba(0,0,0,0.8)] space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-linear-to-br from-red-600 to-purple-600 flex items-center justify-center text-white text-2xl shadow-lg border border-white/20">
              <FaUserPlus />
            </div>
            <div>
              <h1 className="text-2xl font-bold font-['Norican'] text-white">Create Admin Account (/super)</h1>
              <p className="text-xs text-gray-400">Add new Admin credentials into database</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={handleSeedDatabase}
              disabled={seedLoading}
              className="px-4 py-2 bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-200 text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer"
            >
              <FaDatabase /> {seedLoading ? 'Seeding DB...' : 'Seed Local Data to DB'}
            </button>
            
            <button 
              onClick={() => navigate('/open')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 border border-white/15 text-white text-xs font-bold rounded-xl flex items-center gap-2 transition-all cursor-pointer"
            >
              <FaArrowLeft /> Go to Admin Login (/open)
            </button>
          </div>
        </div>

        {/* Create Admin Form */}
        <form onSubmit={handleCreateAdmin} className="space-y-4">
          <h2 className="text-base font-bold text-gray-200 flex items-center gap-2">
            <FaKey className="text-purple-400" /> New Admin Credentials Form
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-300 font-semibold mb-1.5 block">Username *</label>
              <input 
                type="text"
                required
                placeholder="e.g. javithadmin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-[#161616] text-white border border-white/10 p-3.5 rounded-xl text-sm focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-gray-300 font-semibold mb-1.5 block">Password *</label>
              <input 
                type="password"
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#161616] text-white border border-white/10 p-3.5 rounded-xl text-sm focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-gray-300 font-semibold mb-1.5 block">Email (Optional)</label>
              <input 
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#161616] text-white border border-white/10 p-3.5 rounded-xl text-sm focus:border-purple-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs text-gray-300 font-semibold mb-1.5 block">Account Role *</label>
              <select 
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-[#161616] text-white border border-white/10 p-3.5 rounded-xl text-sm focus:border-purple-500 focus:outline-none cursor-pointer"
              >
                <option value="superadmin">Super Admin (Full Access)</option>
                <option value="admin">Regular Admin</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full py-3.5 rounded-xl bg-linear-to-r from-red-600 via-purple-600 to-pink-600 text-white font-bold text-sm shadow-xl hover:opacity-95 transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <FaUserPlus /> {loading ? 'Creating Account...' : 'Save & Create Admin in DB'}
          </button>
        </form>

        {/* Existing Admins in DB */}
        <div className="pt-6 border-t border-white/10 space-y-4">
          <h2 className="text-sm font-bold text-gray-300">Existing Admin Accounts in Database</h2>
          
          {adminsList.length === 0 ? (
            <p className="text-xs text-gray-500 italic">No admin accounts found in DB yet. Use form above to create one!</p>
          ) : (
            <div className="space-y-2">
              {adminsList.map((admin) => (
                <div key={admin.id} className="bg-white/5 border border-white/10 p-3.5 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-white text-sm">{admin.username}</span>
                    <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${admin.role === 'superadmin' ? 'bg-purple-500/30 text-purple-300 border border-purple-500/40' : 'bg-blue-500/30 text-blue-300 border border-blue-500/40'}`}>
                      {admin.role || 'admin'}
                    </span>
                    <span className="text-gray-400 text-xs">({admin.email || 'No email'})</span>
                  </div>
                  <button 
                    onClick={() => handleDeleteAdmin(admin.id)}
                    className="p-2 rounded-lg bg-red-500/20 hover:bg-red-500/40 text-red-300 transition-colors cursor-pointer"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default SuperAdminPanel;
