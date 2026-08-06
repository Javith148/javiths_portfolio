import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './components/Nav';
import About from './components/AboutMe';
import Projects from './components/ProjectMain';
import Skill from './components/Skills';
import Certificate from './components/Certificatemain';
import Contact from './components/Contact';
import AdminPanel from './components/AdminPanel';
import SuperAdminPanel from './components/SuperAdminPanel';

const App = () => {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skill" element={<Skill />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/certificate" element={<Certificate />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/open" element={<AdminPanel />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/super" element={<SuperAdminPanel />} />
      </Routes>
    </Router>
  );
};

export default App;
