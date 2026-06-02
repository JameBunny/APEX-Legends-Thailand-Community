import React from 'react';

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#090a0b', borderTop: '2px solid #1c1d21', padding: '30px 0', marginTop: '60px', textAlign: 'center', color: 'var(--apex-light-gray)', fontSize: '14px' }}>
      <div className="container">
        <p style={{ color: 'var(--apex-red)', fontFamily: 'var(--font-heading)', fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>APEX LEGENDS THAILAND COMMUNITY</p>
        <p>© 2026 Powered by GitHub Pages. All game assets belong to Electronic Arts & Respawn Entertainment.</p>
      </div>
    </footer>
  );
}
