import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import Sidebar from './components/Sidebar';
import Cursor from './components/Cursor';
import Footer from './components/Footer';
import Home from './pages/Home';
import PatchNotes from './pages/PatchNotes';
import Esports from './pages/Esports';
import AdminDashboard from './pages/AdminDashboard';
import './styles/global.css';

export default function App() {
  return (
    <LanguageProvider>
      <Router>
        <Cursor /> {/* เมาส์เรืองแสง / เนสซี่ */}
        <div className="app-layout">
          <Sidebar /> {/* แถบเมนูซ้ายสุดล้ำ */}
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/patch-notes" element={<PatchNotes />} />
              <Route path="/esports" element={<Esports />} />
              <Route path="/admin" element={<AdminDashboard />} />
            </Routes>
            <Footer />
          </main>
        </div>
      </Router>
    </LanguageProvider>
  );
}
