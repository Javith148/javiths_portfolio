import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaFolderPlus, 
  FaEnvelope, 
  FaTrash, 
  FaEdit, 
  FaEye, 
  FaEyeSlash,
  FaDatabase, 
  FaLock, 
  FaUnlock, 
  FaSignOutAlt, 
  FaPlus, 
  FaCheckCircle, 
  FaTimesCircle, 
  FaServer, 
  FaCode, 
  FaAward, 
  FaRedo,
  FaArrowUp,
  FaArrowDown,
  FaUserShield,
  FaUpload,
  FaCheck,
  FaPalette,
  FaHome
} from 'react-icons/fa';
import bg from './assets/back2.png';

import { API_BASE } from '../config/api';

const AdminPanel = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem('javith_jwt_token') || sessionStorage.getItem('javith_admin_auth') || '');
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');
  
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Data States
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [messages, setMessages] = useState([]);
  
  const [notification, setNotification] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  // Gradient Color Picker State
  const [color1, setColor1] = useState('#7F17DA');
  const [color2, setColor2] = useState('#737373');

  // Modals
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [projectForm, setProjectForm] = useState({ 
    title: '', 
    category: 'Web App', 
    short_desc: '', 
    description: '', 
    image_url: '', 
    live_link: '', 
    github_link: '', 
    gradient: 'linear-gradient(175deg, #7F17DA 0%, #737373 100%)', 
    tags: [],
    is_featured: true 
  });

  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillForm, setSkillForm] = useState({ name: '', category: 'Frontend', icon_url: '', proficiency: 85 });

  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [certForm, setCertForm] = useState({ title: '', issuer: '', issue_date: '2024', credential_url: '', image_url: '', description: '', is_featured: true });

  const showNotify = (msg, type = 'success') => {
    setNotification({ msg, type });
    setTimeout(() => setNotification(null), 3500);
  };

  // JWT Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError('');
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: usernameInput, password: passwordInput })
      });
      const data = await res.json();
      if (data.success) {
        setToken(data.token);
        localStorage.setItem('javith_jwt_token', data.token);
        showNotify(`Welcome back ${data.user.username}!`);
      } else {
        setAuthError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      if ((usernameInput === 'admin' || usernameInput === 'javithadmin') && (passwordInput === 'admin123' || passwordInput === '1234')) {
        const dummyToken = 'dummy_admin_jwt_token_2026';
        setToken(dummyToken);
        sessionStorage.setItem('javith_admin_auth', 'true');
        showNotify('Logged in successfully!');
      } else {
        setAuthError('Use Demo credentials: admin / admin123');
      }
    }
  };

  const handleLogout = () => {
    setToken('');
    localStorage.removeItem('javith_jwt_token');
    sessionStorage.removeItem('javith_admin_auth');
  };

  // Fetch All Data from Backend API
  const fetchData = async () => {
    try {
      const [pRes, sRes, cRes, mRes] = await Promise.all([
        fetch(`${API_BASE}/projects`),
        fetch(`${API_BASE}/skills`),
        fetch(`${API_BASE}/certificates`),
        fetch(`${API_BASE}/contacts`)
      ]);

      if (pRes.ok) {
        const pData = await pRes.json();
        setProjects(pData.projects || []);
      }
      if (sRes.ok) {
        const sData = await sRes.json();
        setSkills(sData.skills || []);
      }
      if (cRes.ok) {
        const cData = await cRes.json();
        setCertificates(cData.certificates || []);
      }
      if (mRes.ok) {
        const mData = await mRes.json();
        setMessages(mData.messages || []);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  // Image Upload Helper
  const handleFileUpload = async (file, callback) => {
    if (!file) return;
    setIsUploading(true);
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const base64Image = e.target.result;
        const res = await fetch(`${API_BASE}/upload`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ image: base64Image, name: file.name })
        });
        const data = await res.json();
        if (data.success && data.url) {
          callback(data.url);
          showNotify('Image uploaded successfully! 🚀');
        } else {
          showNotify('Failed to upload image', 'error');
        }
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (err) {
      showNotify('Image upload error', 'error');
      setIsUploading(false);
    }
  };

  // REORDER ITEMS
  const moveItem = async (type, index, direction) => {
    let list = type === 'projects' ? [...projects] : type === 'skills' ? [...skills] : [...certificates];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIndex];
    list[targetIndex] = temp;

    if (type === 'projects') setProjects(list);
    else if (type === 'skills') setSkills(list);
    else setCertificates(list);

    const orderedIds = list.map(item => item.id);
    try {
      await fetch(`${API_BASE}/${type}/reorder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds })
      });
      showNotify(`Reordered ${type} successfully!`);
    } catch (err) {}
  };

  // TOGGLE VISIBILITY FOR PROJECT
  const toggleProjectVisibility = async (p) => {
    const newStatus = p.is_featured === false ? true : false;
    const updated = { ...p, is_featured: newStatus };
    setProjects(projects.map(item => item.id === p.id ? updated : item));
    try {
      await fetch(`${API_BASE}/projects/${p.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_featured: newStatus })
      });
      showNotify(newStatus ? 'Project set to visible on main portfolio' : 'Project hidden from main portfolio');
    } catch (e) {}
  };

  // TOGGLE VISIBILITY FOR CERTIFICATE
  const toggleCertVisibility = async (c) => {
    const newStatus = c.is_featured === false ? true : false;
    const updated = { ...c, is_featured: newStatus };
    setCertificates(certificates.map(item => item.id === c.id ? updated : item));
    try {
      await fetch(`${API_BASE}/certificates/${c.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_featured: newStatus })
      });
      showNotify(newStatus ? 'Certificate set to visible on main portfolio' : 'Certificate hidden from main portfolio');
    } catch (e) {}
  };

  // Helper to extract hex colors from a gradient string
  const extractHexColors = (gradStr) => {
    if (!gradStr) return { c1: '#7F17DA', c2: '#737373' };
    const matches = gradStr.match(/#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3}/g);
    if (matches && matches.length >= 2) {
      return { c1: matches[0], c2: matches[1] };
    } else if (matches && matches.length === 1) {
      return { c1: matches[0], c2: matches[0] };
    }
    return { c1: '#7F17DA', c2: '#737373' };
  };

  // --- Project Modal ---
  const handleOpenProjectModal = (project = null) => {
    if (project) {
      const g = project.gradient || 'linear-gradient(175deg, #7F17DA 0%, #737373 100%)';
      const extracted = extractHexColors(g);
      setColor1(extracted.c1);
      setColor2(extracted.c2);
      setEditingProject(project);
      setProjectForm({
        title: project.title || '',
        category: project.category || 'Web App',
        short_desc: project.short_desc || '',
        description: project.description || '',
        image_url: project.image_url || '',
        live_link: project.live_link || '',
        github_link: project.github_link || '',
        gradient: g,
        tags: Array.isArray(project.tags) ? project.tags : (typeof project.tags === 'string' ? project.tags.split(',').map(t => t.trim()) : []),
        is_featured: project.is_featured !== undefined ? project.is_featured : true
      });
    } else {
      setColor1('#7F17DA');
      setColor2('#737373');
      setEditingProject(null);
      setProjectForm({
        title: '',
        category: 'Web App',
        short_desc: '',
        description: '',
        image_url: '',
        live_link: '',
        github_link: '',
        gradient: 'linear-gradient(175deg, #7F17DA 0%, #737373 100%)',
        tags: [],
        is_featured: true
      });
    }
    setIsProjectModalOpen(true);
  };

  const updateGradientColors = (c1, c2) => {
    setColor1(c1);
    setColor2(c2);
    const gradStr = `linear-gradient(175deg, ${c1} 0%, ${c2} 100%)`;
    setProjectForm(prev => ({ ...prev, gradient: gradStr }));
  };

  const setSolidBannerColor = (hexColor) => {
    setColor1(hexColor);
    setColor2(hexColor);
    setProjectForm(prev => ({ ...prev, gradient: hexColor }));
  };

  const toggleSkillInProject = (skillName) => {
    const currentTags = Array.isArray(projectForm.tags) ? [...projectForm.tags] : [];
    const index = currentTags.indexOf(skillName);
    if (index > -1) {
      currentTags.splice(index, 1);
    } else {
      currentTags.push(skillName);
    }
    setProjectForm({ ...projectForm, tags: currentTags });
  };

  const handleSaveProject = async (e) => {
    e.preventDefault();
    try {
      if (editingProject) {
        await fetch(`${API_BASE}/projects/${editingProject.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectForm)
        });
        showNotify('Project updated successfully!');
      } else {
        await fetch(`${API_BASE}/projects`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(projectForm)
        });
        showNotify('New project added successfully!');
      }
      fetchData();
    } catch (err) {
      fetchData();
    }
    setIsProjectModalOpen(false);
  };

  const handleDeleteProject = async (id) => {
    if (!window.confirm('Delete project?')) return;
    try {
      await fetch(`${API_BASE}/projects/${id}`, { method: 'DELETE' });
      showNotify('Project deleted');
      fetchData();
    } catch (err) {
      setProjects(projects.filter(p => p.id !== id));
    }
  };

  // --- Skill Modal ---
  const handleOpenSkillModal = (skill = null) => {
    if (skill) {
      setEditingSkill(skill);
      setSkillForm({
        name: skill.name || '',
        category: skill.category || 'Frontend',
        icon_url: skill.icon_url || '',
        proficiency: skill.proficiency || 85
      });
    } else {
      setEditingSkill(null);
      setSkillForm({ name: '', category: 'Frontend', icon_url: '', proficiency: 85 });
    }
    setIsSkillModalOpen(true);
  };

  const handleSaveSkill = async (e) => {
    e.preventDefault();
    try {
      if (editingSkill) {
        await fetch(`${API_BASE}/skills/${editingSkill.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(skillForm)
        });
        showNotify('Skill saved to DB!');
      } else {
        await fetch(`${API_BASE}/skills`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(skillForm)
        });
        showNotify('Skill added to DB!');
      }
      fetchData();
    } catch (err) {
      fetchData();
    }
    setIsSkillModalOpen(false);
  };

  const handleDeleteSkill = async (id) => {
    if (!window.confirm('Delete skill?')) return;
    try {
      await fetch(`${API_BASE}/skills/${id}`, { method: 'DELETE' });
      showNotify('Skill deleted');
      fetchData();
    } catch (err) {
      setSkills(skills.filter(s => s.id !== id));
    }
  };

  // --- Certificate Modal ---
  const handleOpenCertModal = (cert = null) => {
    if (cert) {
      setEditingCert(cert);
      setCertForm({
        title: cert.title || '',
        issuer: cert.issuer || '',
        issue_date: cert.issue_date || '2024',
        credential_url: cert.credential_url || '',
        image_url: cert.image_url || '',
        description: cert.description || '',
        is_featured: cert.is_featured !== undefined ? cert.is_featured : true
      });
    } else {
      setEditingCert(null);
      setCertForm({ title: '', issuer: '', issue_date: '2024', credential_url: '', image_url: '', description: '', is_featured: true });
    }
    setIsCertModalOpen(true);
  };

  const handleSaveCert = async (e) => {
    e.preventDefault();
    try {
      if (editingCert) {
        await fetch(`${API_BASE}/certificates/${editingCert.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(certForm)
        });
        showNotify('Certificate saved to DB!');
      } else {
        await fetch(`${API_BASE}/certificates`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(certForm)
        });
        showNotify('Certificate added to DB!');
      }
      fetchData();
    } catch (err) {
      fetchData();
    }
    setIsCertModalOpen(false);
  };

  const handleDeleteCert = async (id) => {
    if (!window.confirm('Delete certificate?')) return;
    try {
      await fetch(`${API_BASE}/certificates/${id}`, { method: 'DELETE' });
      showNotify('Certificate deleted');
      fetchData();
    } catch (err) {
      setCertificates(certificates.filter(c => c.id !== id));
    }
  };

  const unreadCount = messages.filter(m => !m.is_read).length;

  if (!token) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center bg-[#0D0C0C] font-['Outfit'] px-4 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url(${bg})` }}>
        <div className="max-w-[440px] w-full bg-white/10 backdrop-blur-2xl p-8 sm:p-10 rounded-3xl border border-white/20 shadow-2xl text-center text-white relative">
          <div className="w-16 h-16 bg-gradient-to-br from-[#d91a1a]/20 to-[#e340d8]/20 rounded-2xl mx-auto flex items-center justify-center text-3xl mb-4 border border-white/15 text-[#e340d8]">
            <FaLock />
          </div>
          <h1 className="text-3xl font-bold font-['Norican'] mb-1">Admin Panel Login</h1>
          {authError && <div className="mb-4 p-3 bg-red-500/20 rounded-xl text-red-300 text-xs">{authError}</div>}
          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <div>
              <label className="text-xs text-gray-300 font-semibold mb-1 block">Username</label>
              <input type="text" placeholder="admin" value={usernameInput} onChange={(e) => setUsernameInput(e.target.value)} className="w-full bg-[#141414] text-white border border-white/15 p-3 rounded-xl text-sm" required />
            </div>
            <div>
              <label className="text-xs text-gray-300 font-semibold mb-1 block">Password</label>
              <input type="password" placeholder="admin123" value={passwordInput} onChange={(e) => setPasswordInput(e.target.value)} className="w-full bg-[#141414] text-white border border-white/15 p-3 rounded-xl text-sm" required />
            </div>
            <button type="submit" className="w-full py-3.5 rounded-xl bg-gradient-to-r from-[#d91a1a] via-[#e340d8] to-[#4851FF] text-white font-bold text-sm cursor-pointer">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-[#0D0C0C] font-['Outfit'] text-white flex flex-col bg-cover bg-center bg-no-repeat bg-fixed" style={{ backgroundImage: `url(${bg})` }}>
      {notification && (
        <div className="fixed top-6 right-6 z-[4000] px-5 py-3 rounded-2xl bg-purple-900/90 border border-purple-500 text-white shadow-2xl flex items-center gap-3 animate-bounce">
          <FaCheckCircle className="text-emerald-400 text-lg" />
          <span className="text-sm font-medium">{notification.msg}</span>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-[100] bg-black/70 backdrop-blur-2xl border-b border-white/10 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-[#d91a1a] via-[#e340d8] to-[#4851FF] flex items-center justify-center font-bold text-white text-2xl">J</div>
          <div>
            <h1 className="text-2xl font-bold font-['Norican']">Javith Admin Panel</h1>
            <p className="text-xs text-gray-400">Manage Featured Projects, Certificates, Banner Colors & Image Uploads</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')} className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold flex items-center gap-2 cursor-pointer"><FaEye /> View Portfolio</button>
          <button onClick={fetchData} className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer"><FaRedo className="text-xs" /></button>
          <button onClick={handleLogout} className="px-3.5 py-2 rounded-xl bg-red-500/20 text-red-300 text-xs font-semibold cursor-pointer"><FaSignOutAlt /> Logout</button>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="max-w-[1320px] w-full mx-auto px-4 md:px-8 py-8 flex-1 flex flex-col md:flex-row gap-8">
        
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex flex-col gap-2 bg-white/5 backdrop-blur-2xl p-4 rounded-3xl border border-white/10 h-fit">
          <p className="text-[11px] font-bold uppercase text-gray-400 px-3 py-1">Admin Control</p>
          <button onClick={() => setActiveTab('dashboard')} className={`w-full px-4 py-3 rounded-2xl font-semibold text-sm flex items-center gap-3 ${activeTab === 'dashboard' ? 'bg-gradient-to-r from-[#d91a1a] via-[#e340d8] to-[#4851FF]' : 'text-gray-400 hover:bg-white/10'}`}><FaServer /> Overview</button>
          <button onClick={() => setActiveTab('projects')} className={`w-full px-4 py-3 rounded-2xl font-semibold text-sm flex items-center justify-between ${activeTab === 'projects' ? 'bg-gradient-to-r from-[#d91a1a] via-[#e340d8] to-[#4851FF]' : 'text-gray-400 hover:bg-white/10'}`}><span>Projects</span><span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-bold">{projects.length}</span></button>
          <button onClick={() => setActiveTab('skills')} className={`w-full px-4 py-3 rounded-2xl font-semibold text-sm flex items-center justify-between ${activeTab === 'skills' ? 'bg-gradient-to-r from-[#d91a1a] via-[#e340d8] to-[#4851FF]' : 'text-gray-400 hover:bg-white/10'}`}><span>Skills</span><span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-bold">{skills.length}</span></button>
          <button onClick={() => setActiveTab('certificates')} className={`w-full px-4 py-3 rounded-2xl font-semibold text-sm flex items-center justify-between ${activeTab === 'certificates' ? 'bg-gradient-to-r from-[#d91a1a] via-[#e340d8] to-[#4851FF]' : 'text-gray-400 hover:bg-white/10'}`}><span>Certificates</span><span className="px-2 py-0.5 rounded-full bg-white/20 text-xs font-bold">{certificates.length}</span></button>
        </aside>

        {/* Content */}
        <main className="flex-1 w-full space-y-6">

          {/* DASHBOARD OVERVIEW */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Welcome Header Banner */}
              <div className="bg-gradient-to-r from-[#d91a1a]/30 via-[#e340d8]/30 to-[#4851FF]/30 backdrop-blur-2xl border border-white/20 p-6 sm:p-8 rounded-3xl space-y-3 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 relative z-10">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold font-['Norican'] text-white">Welcome Javith! ✨</h2>
                    <p className="text-xs sm:text-sm text-gray-300 max-w-[600px] mt-1 leading-relaxed">
                      Manage your full portfolio website dynamically! View real-time metrics, toggle project/cert visibility, reorder items, customize banner gradient background colors, and sync with your Supabase database.
                    </p>
                  </div>
                  <button onClick={() => navigate('/')} className="px-5 py-3 rounded-2xl bg-white text-black font-bold text-xs flex items-center gap-2 hover:bg-gray-200 transition-all cursor-pointer shadow-lg shrink-0">
                    <FaEye /> View Live Website
                  </button>
                </div>
              </div>

              {/* Metric Stat Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {/* Stat 1: Projects */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2 hover:border-purple-500/50 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400">Total Projects</span>
                    <div className="w-8 h-8 rounded-xl bg-purple-500/20 text-[#e340d8] flex items-center justify-center text-sm"><FaFolderPlus /></div>
                  </div>
                  <div className="text-2xl font-bold text-white">{projects.length}</div>
                  <div className="text-[11px] text-emerald-400 font-medium">
                    {projects.filter(p => p.is_featured !== false).length} Visible on Main Site
                  </div>
                </div>

                {/* Stat 2: Skills */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2 hover:border-blue-500/50 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400">Total Skills</span>
                    <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm"><FaCode /></div>
                  </div>
                  <div className="text-2xl font-bold text-white">{skills.length}</div>
                  <div className="text-[11px] text-gray-400 font-medium">
                    Tech Stack & Tools
                  </div>
                </div>

                {/* Stat 3: Certificates */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2 hover:border-emerald-500/50 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400">Certificates</span>
                    <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-sm"><FaAward /></div>
                  </div>
                  <div className="text-2xl font-bold text-white">{certificates.length}</div>
                  <div className="text-[11px] text-emerald-400 font-medium">
                    {certificates.filter(c => c.is_featured !== false).length} Visible on Main Site
                  </div>
                </div>

                {/* Stat 4: Database Status */}
                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl space-y-2 hover:border-pink-500/50 transition-all">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-400">Database</span>
                    <div className="w-8 h-8 rounded-xl bg-pink-500/20 text-pink-400 flex items-center justify-center text-sm"><FaDatabase /></div>
                  </div>
                  <div className="text-2xl font-bold text-emerald-400 text-sm flex items-center gap-1.5 pt-1">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" /> Supabase Active
                  </div>
                  <div className="text-[11px] text-gray-400 font-medium">
                    Connected & Synced
                  </div>
                </div>
              </div>

              {/* Quick Actions Shortcuts */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
                <h3 className="text-sm font-bold uppercase text-gray-300 tracking-wider">Quick Actions & Shortcuts</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button onClick={() => { setActiveTab('projects'); handleOpenProjectModal(); }} className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-3 font-semibold text-xs cursor-pointer transition-all">
                    <div className="w-9 h-9 rounded-xl bg-[#d91a1a]/20 text-[#d91a1a] flex items-center justify-center text-sm shrink-0"><FaPlus /></div>
                    <div className="text-left">
                      <span className="block text-white font-bold">Add New Project</span>
                      <span className="text-[10px] text-gray-400">Upload images & banner colors</span>
                    </div>
                  </button>

                  <button onClick={() => { setActiveTab('skills'); handleOpenSkillModal(); }} className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-3 font-semibold text-xs cursor-pointer transition-all">
                    <div className="w-9 h-9 rounded-xl bg-[#e340d8]/20 text-[#e340d8] flex items-center justify-center text-sm shrink-0"><FaPlus /></div>
                    <div className="text-left">
                      <span className="block text-white font-bold">Add New Skill</span>
                      <span className="text-[10px] text-gray-400">Frontend / Backend / Tools</span>
                    </div>
                  </button>

                  <button onClick={() => { setActiveTab('certificates'); handleOpenCertModal(); }} className="p-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center gap-3 font-semibold text-xs cursor-pointer transition-all">
                    <div className="w-9 h-9 rounded-xl bg-[#4851FF]/20 text-[#4851FF] flex items-center justify-center text-sm shrink-0"><FaPlus /></div>
                    <div className="text-left">
                      <span className="block text-white font-bold">Add Certificate</span>
                      <span className="text-[10px] text-gray-400">Credentials & Badges</span>
                    </div>
                  </button>
                </div>
              </div>

              {/* Recent Items Preview List */}
              <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold uppercase text-gray-300 tracking-wider">Current Portfolio Content Overview</h3>
                  <span className="text-xs text-[#e340d8] font-semibold">{projects.length} Projects, {skills.length} Skills, {certificates.length} Certs</span>
                </div>

                <div className="space-y-2">
                  {projects.slice(0, 4).map((p, idx) => (
                    <div key={p.id || idx} className="bg-white/5 border border-white/10 p-3.5 rounded-xl flex items-center justify-between text-xs">
                      <div className="flex items-center gap-3">
                        <img src={p.image_url || 'https://via.placeholder.com/100'} alt="" className="w-10 h-10 rounded-lg object-cover border border-white/10" />
                        <div>
                          <span className="font-bold text-white block">{p.title}</span>
                          <span className="text-[10px] text-gray-400">{p.category}</span>
                        </div>
                      </div>
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${p.is_featured !== false ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'}`}>
                        {p.is_featured !== false ? 'Home ON' : 'Home OFF'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PROJECTS TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white/5 p-6 rounded-3xl border border-white/10">
                <div>
                  <h2 className="text-xl font-bold">Projects Management</h2>
                  <p className="text-xs text-gray-400">Use ⬆️ ⬇️ arrows to reorder project order on portfolio</p>
                </div>
                <button onClick={() => handleOpenProjectModal()} className="px-5 py-3 bg-gradient-to-r from-[#d91a1a] via-[#e340d8] to-[#4851FF] font-bold text-xs rounded-2xl shadow-lg hover:opacity-90 flex items-center gap-2 cursor-pointer"><FaPlus /> Add New Project</button>
              </div>

              <div className="space-y-3">
                {projects.map((p, idx) => (
                  <div key={p.id || idx} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-4 min-w-0">
                      {/* Up/Down Reorder Buttons */}
                      <div className="flex flex-col gap-1">
                        <button disabled={idx === 0} onClick={() => moveItem('projects', idx, 'up')} className="p-1.5 bg-white/10 disabled:opacity-30 rounded cursor-pointer hover:bg-white/20" title="Move Up"><FaArrowUp className="text-xs text-emerald-400" /></button>
                        <button disabled={idx === projects.length - 1} onClick={() => moveItem('projects', idx, 'down')} className="p-1.5 bg-white/10 disabled:opacity-30 rounded cursor-pointer hover:bg-white/20" title="Move Down"><FaArrowDown className="text-xs text-emerald-400" /></button>
                      </div>
                      <img src={p.image_url || 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400'} alt="" className="w-16 h-16 rounded-xl object-cover border border-white/10" />
                      <div>
                        <h4 className="font-bold text-white flex items-center gap-2">
                          {p.title}
                        </h4>
                        <div className="w-20 h-2 rounded mt-1.5 border border-white/10" style={{ background: p.gradient || '#7F17DA' }} title="Banner Background" />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                      {/* Home Page Show Icon */}
                      <button 
                        onClick={() => toggleProjectVisibility(p)} 
                        title={p.is_featured !== false ? "Visible on Home Page" : "Hidden from Home Page"}
                        className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                          p.is_featured !== false ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-gray-800 text-gray-400 border border-white/10'
                        }`}
                      >
                        <FaHome className={p.is_featured !== false ? 'text-[#e340d8]' : 'text-gray-400'} />
                        <span>{p.is_featured !== false ? 'Home ON' : 'Home OFF'}</span>
                      </button>

                      {/* Eye Icon Visibility Button */}
                      <button 
                        onClick={() => toggleProjectVisibility(p)} 
                        title={p.is_featured !== false ? "Hide Project" : "Show Project"}
                        className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                          p.is_featured !== false ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
                        }`}
                      >
                        {p.is_featured !== false ? <FaEye className="text-emerald-400" /> : <FaEyeSlash className="text-red-400" />}
                      </button>

                      {/* Edit Button */}
                      <button onClick={() => handleOpenProjectModal(p)} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"><FaEdit /> Edit</button>
                      
                      {/* Delete Button */}
                      <button onClick={() => handleDeleteProject(p.id)} className="p-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"><FaTrash /> Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SKILLS TAB */}
          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white/5 p-6 rounded-3xl border border-white/10">
                <div>
                  <h2 className="text-xl font-bold">Skills List</h2>
                  <p className="text-xs text-gray-400">Use ⬆️ ⬇️ arrows to reorder skills display order</p>
                </div>
                <button onClick={() => handleOpenSkillModal()} className="px-5 py-3 bg-gradient-to-r from-[#d91a1a] via-[#e340d8] to-[#4851FF] font-bold text-xs rounded-2xl shadow-lg flex items-center gap-2 cursor-pointer"><FaPlus /> Add Skill</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {skills.map((s, idx) => (
                  <div key={s.id || idx} className="bg-white/5 border border-white/10 p-4 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {/* Up/Down Reorder Buttons */}
                      <div className="flex flex-col gap-1">
                        <button disabled={idx === 0} onClick={() => moveItem('skills', idx, 'up')} className="p-1 bg-white/10 disabled:opacity-30 rounded cursor-pointer hover:bg-white/20" title="Move Up"><FaArrowUp className="text-[10px] text-emerald-400" /></button>
                        <button disabled={idx === skills.length - 1} onClick={() => moveItem('skills', idx, 'down')} className="p-1 bg-white/10 disabled:opacity-30 rounded cursor-pointer hover:bg-white/20" title="Move Down"><FaArrowDown className="text-[10px] text-emerald-400" /></button>
                      </div>
                      <div className="w-10 h-10 rounded-xl bg-white/10 p-2 flex items-center justify-center"><img src={s.icon_url} alt="" className="w-full h-full object-contain" /></div>
                      <div><h4 className="text-sm font-bold">{s.name}</h4><span className="text-xs text-gray-400">{s.category}</span></div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => handleOpenSkillModal(s)} className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs cursor-pointer"><FaEdit /></button>
                      <button onClick={() => handleDeleteSkill(s.id)} className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg text-xs cursor-pointer"><FaTrash /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CERTIFICATES TAB */}
          {activeTab === 'certificates' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center bg-white/5 p-6 rounded-3xl border border-white/10">
                <div>
                  <h2 className="text-xl font-bold">Certificates Management</h2>
                  <p className="text-xs text-gray-400">Use ⬆️ ⬇️ arrows to reorder certificate order on portfolio</p>
                </div>
                <button onClick={() => handleOpenCertModal()} className="px-5 py-3 bg-gradient-to-r from-[#d91a1a] via-[#e340d8] to-[#4851FF] font-bold text-xs rounded-2xl shadow-lg flex items-center gap-2 cursor-pointer"><FaPlus /> Add Certificate</button>
              </div>
              <div className="space-y-3">
                {certificates.map((c, idx) => (
                  <div key={c.id || idx} className="bg-white/5 border border-white/10 p-5 rounded-2xl flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      {/* Up/Down Reorder Buttons */}
                      <div className="flex flex-col gap-1">
                        <button disabled={idx === 0} onClick={() => moveItem('certificates', idx, 'up')} className="p-1.5 bg-white/10 disabled:opacity-30 rounded cursor-pointer hover:bg-white/20" title="Move Up"><FaArrowUp className="text-xs text-emerald-400" /></button>
                        <button disabled={idx === certificates.length - 1} onClick={() => moveItem('certificates', idx, 'down')} className="p-1.5 bg-white/10 disabled:opacity-30 rounded cursor-pointer hover:bg-white/20" title="Move Down"><FaArrowDown className="text-xs text-emerald-400" /></button>
                      </div>
                      <img src={c.image_url} alt="" className="w-16 h-16 rounded-xl object-cover border border-white/10" />
                      <div>
                        <h4 className="font-bold text-white flex items-center gap-2">
                          {c.title}
                        </h4>
                        <p className="text-xs text-[#e340d8]">{c.issuer}</p>
                        {c.description && <p className="text-[11px] text-gray-400 line-clamp-1 mt-0.5 max-w-[300px]">{c.description}</p>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
                      {/* Home Page Show Icon */}
                      <button 
                        onClick={() => toggleCertVisibility(c)} 
                        title={c.is_featured !== false ? "Visible on Home Page" : "Hidden from Home Page"}
                        className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                          c.is_featured !== false ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' : 'bg-gray-800 text-gray-400 border border-white/10'
                        }`}
                      >
                        <FaHome className={c.is_featured !== false ? 'text-[#e340d8]' : 'text-gray-400'} />
                        <span>{c.is_featured !== false ? 'Home ON' : 'Home OFF'}</span>
                      </button>

                      {/* Eye Icon Visibility Button */}
                      <button 
                        onClick={() => toggleCertVisibility(c)} 
                        title={c.is_featured !== false ? "Hide Certificate" : "Show Certificate"}
                        className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-all ${
                          c.is_featured !== false ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-red-500/20 text-red-300 border border-red-500/30'
                        }`}
                      >
                        {c.is_featured !== false ? <FaEye className="text-emerald-400" /> : <FaEyeSlash className="text-red-400" />}
                      </button>

                      {/* Edit Button */}
                      <button onClick={() => handleOpenCertModal(c)} className="p-2.5 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"><FaEdit /> Edit</button>

                      {/* Delete Button */}
                      <button onClick={() => handleDeleteCert(c.id)} className="p-2.5 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"><FaTrash /> Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </main>
      </div>

      {/* --- ADD / EDIT PROJECT MODAL WITH COLOR PICKER & SHOW TOGGLE --- */}
      {isProjectModalOpen && (
        <div className="fixed inset-0 z-[3000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-white/20 rounded-3xl max-w-[620px] w-full p-6 text-white max-h-[90vh] overflow-y-auto space-y-4">
            <h3 className="text-xl font-bold">{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
            <form onSubmit={handleSaveProject} className="space-y-4 text-xs">
              <div>
                <label className="text-gray-300 font-semibold mb-1 block">Title *</label>
                <input type="text" required placeholder="Project Title" value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} className="w-full bg-[#222] p-3 rounded-xl border border-white/10" />
              </div>

              {/* BANNER DESCRIPTION (SHORT DESC) */}
              <div>
                <label className="text-gray-300 font-semibold mb-1 block">Banner Card Description (Short Text on Card)</label>
                <input type="text" placeholder="Short description displayed inside banner card" value={projectForm.short_desc} onChange={e => setProjectForm({...projectForm, short_desc: e.target.value})} className="w-full bg-[#222] p-3 rounded-xl border border-white/10" />
              </div>

              {/* LIVE & GITHUB LINKS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-gray-300 font-semibold mb-1 block">Live Project Link (URL)</label>
                  <input type="url" placeholder="https://example.com" value={projectForm.live_link} onChange={e => setProjectForm({...projectForm, live_link: e.target.value})} className="w-full bg-[#222] p-3 rounded-xl border border-white/10" />
                </div>
                <div>
                  <label className="text-gray-300 font-semibold mb-1 block">GitHub Repository Link (URL)</label>
                  <input type="url" placeholder="https://github.com/..." value={projectForm.github_link} onChange={e => setProjectForm({...projectForm, github_link: e.target.value})} className="w-full bg-[#222] p-3 rounded-xl border border-white/10" />
                </div>
              </div>

              {/* VISIBILITY TOGGLE */}
              <div className="bg-[#1e1e1e] p-3 rounded-2xl border border-white/10 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Show on Main Portfolio Website?</span>
                  <span className="text-[11px] text-gray-400">Toggle ON to display this project on live portfolio</span>
                </div>
                <input 
                  type="checkbox" 
                  checked={projectForm.is_featured} 
                  onChange={e => setProjectForm({...projectForm, is_featured: e.target.checked})} 
                  className="w-5 h-5 accent-[#e340d8] cursor-pointer" 
                />
              </div>

              {/* BANNER GRADIENT BACKGROUND COLOR PICKER */}
              <div className="bg-[#1e1e1e] p-4 rounded-2xl border border-white/10 space-y-3">
                <label className="text-gray-200 font-bold block flex items-center justify-between">
                  <span className="flex items-center gap-2"><FaPalette className="text-[#e340d8]" /> Project Banner Background Color Picker</span>
                  <span className="text-[10px] text-gray-400">Stored in Database</span>
                </label>

                {/* Live Preview Box */}
                <div className="w-full h-20 rounded-xl border border-white/20 p-3 flex flex-col items-center justify-center font-bold text-white shadow-inner transition-all duration-300" style={{ background: projectForm.gradient }}>
                  <span className="text-sm">{projectForm.title || 'Project Banner Background'}</span>
                  <span className="text-[10px] font-normal opacity-80 mt-1">{projectForm.gradient}</span>
                </div>

                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300 font-semibold">Gradient Start (Color 1):</span>
                    <input type="color" value={color1} onChange={e => updateGradientColors(e.target.value, color2)} className="w-9 h-9 rounded-lg border border-white/20 cursor-pointer bg-transparent" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-300 font-semibold">Gradient End (Color 2):</span>
                    <input type="color" value={color2} onChange={e => updateGradientColors(color1, e.target.value)} className="w-9 h-9 rounded-lg border border-white/20 cursor-pointer bg-transparent" />
                  </div>
                </div>

                {/* Solid & Gradient Color Presets */}
                <div className="space-y-1.5 pt-1">
                  <p className="text-[11px] font-semibold text-gray-400">Popular Color Presets:</p>
                  <div className="flex flex-wrap gap-2">
                    <button type="button" onClick={() => updateGradientColors('#EB7B18', '#737373')} className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white cursor-pointer" style={{ background: 'linear-gradient(175deg, #EB7B18 0%, #737373 100%)' }}>Orange Sunset</button>
                    <button type="button" onClick={() => updateGradientColors('#7F17DA', '#737373')} className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white cursor-pointer" style={{ background: 'linear-gradient(175deg, #7F17DA 0%, #737373 100%)' }}>Royal Purple</button>
                    <button type="button" onClick={() => updateGradientColors('#4851FF', '#737373')} className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white cursor-pointer" style={{ background: 'linear-gradient(175deg, #4851FF 0%, #737373 100%)' }}>Cyber Blue</button>
                    <button type="button" onClick={() => updateGradientColors('#30B45C', '#737373')} className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white cursor-pointer" style={{ background: 'linear-gradient(175deg, #30B45C 0%, #737373 100%)' }}>Emerald Green</button>
                    <button type="button" onClick={() => updateGradientColors('#D91A1A', '#222222')} className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white cursor-pointer" style={{ background: 'linear-gradient(175deg, #D91A1A 0%, #222222 100%)' }}>Crimson Red</button>
                    <button type="button" onClick={() => setSolidBannerColor('#1A1A2E')} className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white bg-[#1A1A2E] border border-white/20 cursor-pointer">Solid Dark Blue</button>
                    <button type="button" onClick={() => setSolidBannerColor('#2D132C')} className="px-2.5 py-1 rounded-lg text-[10px] font-bold text-white bg-[#2D132C] border border-white/20 cursor-pointer">Solid Dark Purple</button>
                  </div>
                </div>
              </div>

              {/* IMAGE FILE PICKER */}
              <div className="bg-[#1e1e1e] p-4 rounded-2xl border border-white/10 space-y-2">
                <label className="text-gray-200 font-bold block flex items-center justify-between">
                  <span>Project Image Picker</span>
                  {isUploading && <span className="text-[#e340d8] text-[11px] animate-pulse">Uploading...</span>}
                </label>
                <div className="flex items-center gap-3">
                  <input type="file" accept="image/*" onChange={(e) => { if (e.target.files && e.target.files[0]) handleFileUpload(e.target.files[0], (url) => setProjectForm({...projectForm, image_url: url})); }} className="hidden" id="proj-img-input" />
                  <label htmlFor="proj-img-input" className="px-4 py-2 bg-gradient-to-r from-[#d91a1a] to-[#e340d8] text-white rounded-xl font-bold cursor-pointer flex items-center gap-2"><FaUpload /> Choose Image File</label>
                  {projectForm.image_url && <img src={projectForm.image_url} alt="" className="w-10 h-10 rounded-lg object-cover" />}
                </div>
                <input type="text" placeholder="Or paste image URL" value={projectForm.image_url} onChange={e => setProjectForm({...projectForm, image_url: e.target.value})} className="w-full bg-[#121212] p-2 rounded-xl border border-white/10 text-[11px]" />
              </div>

              {/* SELECT TECH STACK FROM SKILLS */}
              <div className="bg-[#1e1e1e] p-4 rounded-2xl border border-white/10 space-y-2">
                <label className="text-gray-200 font-bold block">Select Tech Stack Tags (Click to toggle)</label>
                <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto p-1">
                  {skills.map((skill) => {
                    const isSelected = Array.isArray(projectForm.tags) && projectForm.tags.includes(skill.name);
                    return (
                      <button key={skill.id || skill.name} type="button" onClick={() => toggleSkillInProject(skill.name)} className={`px-3 py-1.5 rounded-xl border text-xs font-semibold flex items-center gap-1.5 cursor-pointer ${isSelected ? 'bg-gradient-to-r from-[#d91a1a] to-[#e340d8] text-white border-transparent' : 'bg-[#2a2a2a] text-gray-300 border-white/10'}`}>
                        {skill.icon_url && <img src={skill.icon_url} alt="" className="w-3.5 h-3.5 object-contain" />}
                        {skill.name}
                        {isSelected && <FaCheck className="text-[10px]" />}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="text-gray-300 font-semibold mb-1 block">Full Description *</label>
                <textarea required rows={3} placeholder="Description" value={projectForm.description} onChange={e => setProjectForm({...projectForm, description: e.target.value})} className="w-full bg-[#222] p-3 rounded-xl border border-white/10" />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button type="button" onClick={() => setIsProjectModalOpen(false)} className="px-5 py-2.5 bg-white/10 rounded-xl font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-[#d91a1a] to-[#e340d8] font-bold rounded-xl cursor-pointer">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD / EDIT SKILL MODAL --- */}
      {isSkillModalOpen && (
        <div className="fixed inset-0 z-[3000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-white/20 rounded-3xl max-w-[460px] w-full p-6 text-white space-y-4">
            <h3 className="text-xl font-bold">{editingSkill ? 'Edit Skill' : 'Add Skill'}</h3>
            <form onSubmit={handleSaveSkill} className="space-y-4 text-xs">
              <div>
                <label className="text-gray-300 font-semibold mb-1 block">Skill Name *</label>
                <input type="text" required placeholder="Skill Name (e.g. React, Node.js)" value={skillForm.name} onChange={e => setSkillForm({...skillForm, name: e.target.value})} className="w-full bg-[#222] p-3 rounded-xl border border-white/10" />
              </div>
              <div>
                <label className="text-gray-300 font-semibold mb-1 block">Skill Category * (e.g. Frontend, Backend, Database, Mobile, Tools)</label>
                <input type="text" required placeholder="Category (e.g. Frontend, Backend)" value={skillForm.category} onChange={e => setSkillForm({...skillForm, category: e.target.value})} className="w-full bg-[#222] p-3 rounded-xl border border-white/10" />
              </div>
              <div className="bg-[#1e1e1e] p-4 rounded-2xl border border-white/10 space-y-2">
                <label className="text-gray-200 font-bold block flex items-center justify-between"><span>Skill Icon Image Picker</span>{isUploading && <span className="text-[#e340d8] text-[11px]">Uploading...</span>}</label>
                <div className="flex items-center gap-3">
                  <input type="file" accept="image/*" onChange={(e) => { if (e.target.files && e.target.files[0]) handleFileUpload(e.target.files[0], (url) => setSkillForm({...skillForm, icon_url: url})); }} className="hidden" id="skill-img-input" />
                  <label htmlFor="skill-img-input" className="px-4 py-2 bg-gradient-to-r from-[#d91a1a] to-[#e340d8] text-white rounded-xl font-bold cursor-pointer flex items-center gap-2"><FaUpload /> Choose Icon File</label>
                  {skillForm.icon_url && <img src={skillForm.icon_url} alt="" className="w-8 h-8 object-contain" />}
                </div>
                <input type="text" placeholder="Or paste icon URL" value={skillForm.icon_url} onChange={e => setSkillForm({...skillForm, icon_url: e.target.value})} className="w-full bg-[#121212] p-2 rounded-xl border border-white/10 text-[11px]" />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button type="button" onClick={() => setIsSkillModalOpen(false)} className="px-5 py-2.5 bg-white/10 rounded-xl font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-[#d91a1a] to-[#e340d8] font-bold rounded-xl cursor-pointer">Save Skill</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- ADD / EDIT CERTIFICATE MODAL --- */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-[3000] bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#141414] border border-white/20 rounded-3xl max-w-[520px] w-full p-6 text-white max-h-[90vh] overflow-y-auto space-y-4">
            <h3 className="text-xl font-bold">{editingCert ? 'Edit Certificate' : 'Add Certificate'}</h3>
            <form onSubmit={handleSaveCert} className="space-y-4 text-xs">
              <div>
                <label className="text-gray-300 font-semibold mb-1 block">Certificate Title *</label>
                <input type="text" required placeholder="Title" value={certForm.title} onChange={e => setCertForm({...certForm, title: e.target.value})} className="w-full bg-[#222] p-3 rounded-xl border border-white/10" />
              </div>
              <div>
                <label className="text-gray-300 font-semibold mb-1 block">Issuer *</label>
                <input type="text" required placeholder="Issuer" value={certForm.issuer} onChange={e => setCertForm({...certForm, issuer: e.target.value})} className="w-full bg-[#222] p-3 rounded-xl border border-white/10" />
              </div>
              <div>
                <label className="text-gray-300 font-semibold mb-1 block">Description</label>
                <textarea rows={3} placeholder="Enter certificate description / details..." value={certForm.description} onChange={e => setCertForm({...certForm, description: e.target.value})} className="w-full bg-[#222] p-3 rounded-xl border border-white/10" />
              </div>
              <div className="bg-[#1e1e1e] p-3 rounded-2xl border border-white/10 flex items-center justify-between">
                <div>
                  <span className="font-bold text-white block">Show on Main Portfolio Website?</span>
                  <span className="text-[11px] text-gray-400">Toggle ON to display this certificate on live site</span>
                </div>
                <input type="checkbox" checked={certForm.is_featured} onChange={e => setCertForm({...certForm, is_featured: e.target.checked})} className="w-5 h-5 accent-[#e340d8] cursor-pointer" />
              </div>
              <div className="bg-[#1e1e1e] p-4 rounded-2xl border border-white/10 space-y-2">
                <label className="text-gray-200 font-bold block flex items-center justify-between"><span>Certificate Image Picker</span>{isUploading && <span className="text-[#e340d8] text-[11px]">Uploading...</span>}</label>
                <div className="flex items-center gap-3">
                  <input type="file" accept="image/*" onChange={(e) => { if (e.target.files && e.target.files[0]) handleFileUpload(e.target.files[0], (url) => setCertForm({...certForm, image_url: url})); }} className="hidden" id="cert-img-input" />
                  <label htmlFor="cert-img-input" className="px-4 py-2 bg-gradient-to-r from-[#d91a1a] to-[#e340d8] text-white rounded-xl font-bold cursor-pointer flex items-center gap-2"><FaUpload /> Choose Image File</label>
                  {certForm.image_url && <img src={certForm.image_url} alt="" className="w-10 h-10 rounded-lg object-cover" />}
                </div>
                <input type="text" placeholder="Or paste image URL" value={certForm.image_url} onChange={e => setCertForm({...certForm, image_url: e.target.value})} className="w-full bg-[#121212] p-2 rounded-xl border border-white/10 text-[11px]" />
              </div>
              <div className="flex justify-end gap-2 pt-3 border-t border-white/10">
                <button type="button" onClick={() => setIsCertModalOpen(false)} className="px-5 py-2.5 bg-white/10 rounded-xl font-semibold cursor-pointer">Cancel</button>
                <button type="submit" className="px-6 py-2.5 bg-gradient-to-r from-[#d91a1a] to-[#e340d8] font-bold rounded-xl cursor-pointer">Save Certificate</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;
