import React from 'react';
import { useLang } from '../context/LanguageContext';
import { Calendar, ArrowRight } from 'lucide-react';

export default function NewsCard({ item }) {
  const { lang, t } = useLang();
  
  // ตรวจสอบว่ามีข้อมูลภาษาอังกฤษไหม ถ้าไม่มีให้ fallback ไปภาษาไทย
  const title = lang === 'th' ? item.titleTh : (item.titleEn || item.titleTh);
  const content = lang === 'th' ? item.contentTh : (item.contentEn || item.contentTh);

  return (
    <div style={{ backgroundColor: 'var(--apex-card-bg)', border: '1px solid #232529', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden' }}>
      <div style={{ width: '100%', height: '180px', backgroundColor: '#333', backgroundImage: `url(${item.imageUrl || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=600'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div style={{ position: 'absolute', top: '10px', right: '10px', backgroundColor: 'var(--apex-red)', color: 'white', fontSize: '12px', padding: '3px 8px', fontWeight: 'bold', textTransform: 'uppercase' }}>
          {item.tag || 'PATCH'}
        </div>
      </div>
      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--apex-light-gray)', fontSize: '13px', marginBottom: '10px' }}>
          <Calendar size={14} />
          <span>{item.createdAt ? new Date(item.createdAt).toLocaleDateString() : 'RECENT'}</span>
        </div>
        <h3 style={{ fontSize: '1.2rem', marginBottom: '10px', color: 'white', lineHeight: '1.4' }}>{title}</h3>
        <p style={{ color: 'var(--apex-light-gray)', fontSize: '14px', marginBottom: '20px', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical' }}>
          {content}
        </p>
        <div style={{ marginTop: 'auto' }}>
          <button className="apex-btn-secondary" style={{ width: '100%', fontSize: '14px', padding: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '5px' }}>
            {t('readMore')} <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
