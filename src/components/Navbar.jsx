import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLang } from '../context/LanguageContext';
import { Menu, X, Globe } from 'lucide-react';

export default function Navbar() {
  const { lang, setLang, t } = useLang();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const activeClass = (path) => location.pathname === path ? "text-red-500 border-b-2 border-red-500" : "text-white hover:text-red-400";

  return (
    <nav style={{ backgroundColor: '#111214', borderBottom: '2px solid #232529', sticky: 'top', top: 0, zIndex: 50, position: 'relative' }}>
      <div className="container" style={{ height: '70px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', color: '#da292a', fontSize: '24px', fontWeight: 'bold', fontFamily: 'var(--font-heading)' }}>
          APEX <span style={{ color: 'white' }}>THAI</span>
        </Link>

        {/* Desktop Menu */}
        <div style={{ display: 'none', md: 'flex', alignItems: 'center', gap: '30px' }} className="desktop-menu">
          <Link to="/" style={{ textDecoration: 'none', color: 'white', padding: '5px 0' }}>{t('home')}</Link>
          <Link to="/patch-notes" style={{ textDecoration: 'none', color: 'white', padding: '5px 0' }}>{t('patchNotes')}</Link>
          <Link to="/esports" style={{ textDecoration: 'none', color: 'white', padding: '5px 0' }}>{t('esports')}</Link>
          <Link to="/admin" style={{ textDecoration: 'none', color: '#a4a5a7', padding: '5px 0' }}>{t('admin')}</Link>
          
          <button onClick={() => setLang(lang === 'th' ? 'en' : 'th')} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Globe size={18} color="var(--apex-gold)" />
            <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{lang}</span>
          </button>
        </div>

        {/* Mobile / iPad Hamburger Toggle */}
        <div className="mobile-toggle" style={{ display: 'block' }}>
          <button onClick={() => setIsOpen(!isOpen)} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div style={{ position: 'absolute', top: '70px', left: 0, width: '100%', backgroundColor: '#111214', borderBottom: '2px solid #232529', padding: '20px', display: 'flex', flexDirection: 'column', gap: '20px', zIndex: 40 }}>
          <Link to="/" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: 'white', fontSize: '18px' }}>{t('home')}</Link>
          <Link to="/patch-notes" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: 'white', fontSize: '18px' }}>{t('patchNotes')}</Link>
          <Link to="/esports" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: 'white', fontSize: '18px' }}>{t('esports')}</Link>
          <Link to="/admin" onClick={() => setIsOpen(false)} style={{ textDecoration: 'none', color: '#a4a5a7', fontSize: '18px' }}>{t('admin')}</Link>
          <button onClick={() => { setLang(lang === 'th' ? 'en' : 'th'); setIsOpen(false); }} style={{ alignSelf: 'flex-start', background: '#1c1d21', border: 'none', color: 'white', padding: '8px 15px', borderRadius: '4px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={18} color="var(--apex-gold)" />
            <span style={{ textTransform: 'uppercase', fontWeight: 'bold' }}>{lang === 'th' ? 'English' : 'ภาษาไทย'}</span>
          </button>
        </div>
      )}

      {/* สไตล์จำลองการซ่อนแสดงเมนูบน CSS สำหรับ Responsive */}
      <style>{`
        @media (min-width: 769px) {
          .mobile-toggle { display: none !important; }
          .desktop-menu { display: flex !important; }
        }
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
        }
      `}</style>
    </nav>
  );
}
