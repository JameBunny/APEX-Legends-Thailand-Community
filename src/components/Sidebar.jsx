import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { Home, FileText, Trophy, ShieldAlert, Globe } from 'lucide-react';

export default function Sidebar() {
  const { lang, setLang, t } = useLang();
  const location = useLocation();

  const menuItems = [
    { path: '/', name: t('home'), icon: Home },
    { path: '/patch-notes', name: t('patchNotes'), icon: FileText },
    { path: '/esports', name: t('esports'), icon: Trophy },
    { path: '/admin', name: t('admin'), icon: ShieldAlert },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside 
        initial={{ x: -260 }}
        animate={{ x: 0 }}
        transition={{ type: 'spring', stiffness: 100 }}
        style={{
          width: '260px',
          height: '100vh',
          position: 'fixed',
          backgroundColor: '#0b0c0d',
          borderRight: '1px solid rgba(255,255,255,0.05)',
          padding: '40px 0',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 50
        }}
        className="desktop-sidebar hidden lg:flex"
      >
        <div style={{ padding: '0 30px', marginBottom: '50px' }}>
          <h1 style={{ color: 'var(--apex-red)', fontSize: '28px', lineHeight: '1' }}>
            APEX <span style={{ color: 'white', display: 'block', fontSize: '20px' }}>THAILAND</span>
          </h1>
        </div>

        <nav style={{ flexGrow: 1, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link key={item.path} to={item.path} style={{ textDecoration: 'none' }}>
                <motion.div 
                  whileHover={{ x: 10, backgroundColor: 'rgba(218, 41, 42, 0.1)' }}
                  style={{
                    padding: '15px 30px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '15px',
                    color: isActive ? 'white' : 'var(--apex-light-gray)',
                    borderRight: isActive ? '4px solid var(--apex-red)' : '4px solid transparent',
                    background: isActive ? 'linear-gradient(90deg, rgba(218,41,42,0) 0%, rgba(218,41,42,0.1) 100%)' : 'transparent',
                    fontWeight: isActive ? 'bold' : 'normal',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <Icon size={20} color={isActive ? 'var(--apex-red)' : 'var(--apex-light-gray)'} />
                  <span style={{ textTransform: 'uppercase', letterSpacing: '1px' }}>{item.name}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        <div style={{ padding: '0 30px' }}>
          <button 
            onClick={() => setLang(lang === 'th' ? 'en' : 'th')} 
            className="apex-btn"
            style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '10px' }}
          >
            <Globe size={18} /> {lang === 'th' ? 'EN / TH' : 'TH / EN'}
          </button>
        </div>
      </motion.aside>

      {/* Mobile CSS Logic (ซ่อน Sidebar บนมือถือ) */}
      <style>{`
        @media (max-width: 992px) {
          .desktop-sidebar { display: none !important; }
        }
      `}</style>
    </>
  );
}
