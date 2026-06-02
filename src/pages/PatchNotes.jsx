import React, { useEffect, useState } from 'react';
import { getPatchNotesData } from '../config/firebase';
import NewsCard from '../components/NewsCard';
import { useLang } from '../context/LanguageContext';

export default function PatchNotes() {
  const { t } = useLang();
  const [patches, setPatches] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPatchNotesData().then(data => {
      setPatches(data);
      setLoading(false);
    });
  }, []);

  return (
    <div className="container" style={{ paddingTop: '40px', minHeight: '80vh' }}>
      <h2 className="apex-section-title">{t('patchNotes')}</h2>
      
      {loading ? (
        <div style={{ textAlign: 'center', color: 'var(--apex-light-gray)', padding: '50px' }}>กำลังโหลดข้อมูลสมรภูมิ...</div>
      ) : patches.length === 0 ? (
        <div style={{ backgroundColor: 'var(--apex-card-bg)', padding: '40px', textAlign: 'center', color: 'var(--apex-light-gray)' }}>
          ไม่พบข้อมูลประวัติแพตช์ กรุณาเข้าสู่ระบบผ่านหน้าต่างผู้ดูแลระบบเพื่อเพิ่มข้อมูลข่าวสาร
        </div>
      ) : (
        <div className="responsive-grid">
          {patches.map(item => (
            <NewsCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}
