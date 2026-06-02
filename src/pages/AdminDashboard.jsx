import React, { useState } from 'react';
import { useLang } from '../context/LanguageContext';
import { savePatchNoteData, saveVideoData } from '../config/firebase';
import { PlusCircle, FileText, Youtube } from 'lucide-react';

export default function AdminDashboard() {
  const { t } = useLang();
  
  // State สองฟอร์มหลัก
  const [patchForm, setPatchForm] = useState({ titleTh: '', titleEn: '', contentTh: '', contentEn: '', tag: 'PATCH', imageUrl: '' });
  const [videoForm, setVideoForm] = useState({ titleTh: '', youtubeUrl: '' });
  
  const [statusMsg, setStatusMsg] = useState('');

  const handlePatchSubmit = async (e) => {
    e.preventDefault();
    if (!patchForm.titleTh || !patchForm.contentTh) return alert("กรุณากรอกหัวข้อและเนื้อหาภาษาไทยเป็นหลัก");
    
    await savePatchNoteData(patchForm);
    setStatusMsg('✅ บันทึกข้อมูลแพตช์โน้ตเรียบร้อยแล้ว!');
    setPatchForm({ titleTh: '', titleEn: '', contentTh: '', contentEn: '', tag: 'PATCH', imageUrl: '' });
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handleVideoSubmit = async (e) => {
    e.preventDefault();
    if (!videoForm.titleTh || !videoForm.youtubeUrl) return alert("กรุณากรอกข้อมูลวิดีโอให้ครบถ้วน");

    await saveVideoData(videoForm);
    setStatusMsg('✅ เพิ่มลิงก์วิดีโอ YouTube สำเร็จ!');
    setVideoForm({ titleTh: '', youtubeUrl: '' });
    setTimeout(() => setStatusMsg(''), 3000);
  };

  return (
    <div className="container" style={{ paddingTop: '40px', minHeight: '80vh' }}>
      <h2 className="apex-section-title">{t('admin')} Console</h2>
      
      {statusMsg && (
        <div style={{ backgroundColor: '#1a3a2a', border: '1px solid #2e7d32', color: '#4caf50', padding: '15px', marginBottom: '20px', fontWeight: 'bold' }}>
          {statusMsg}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: window.innerWidth < 992 ? '1fr' : '2fr 1fr', gap: '40px' }}>
        
        {/* ฟอร์มเขียน Patch Note */}
        <div style={{ backgroundColor: 'var(--apex-card-bg)', padding: '25px', border: '1px solid #232529' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: 'var(--apex-red)' }}>
            <FileText size={20} /> {t('addPatch')}
          </h3>
          <form onSubmit={handlePatchSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: 'var(--apex-light-gray)' }}>{t('titleTh')} *</label>
              <input type="text" value={patchForm.titleTh} onChange={(e) => setPatchForm({...patchForm, titleTh: e.target.value})} style={{ width: '100%', padding: '10px', background: '#0b0c0d', border: '1px solid #333', color: 'white' }} required />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: 'var(--apex-light-gray)' }}>{t('titleEn')}</label>
              <input type="text" value={patchForm.titleEn} onChange={(e) => setPatchForm({...patchForm, titleEn: e.target.value})} style={{ width: '100%', padding: '10px', background: '#0b0c0d', border: '1px solid #333', color: 'white' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: 'var(--apex-light-gray)' }}>หมวดหมู่ป้ายกำกับ (Tag)</label>
              <select value={patchForm.tag} onChange={(e) => setPatchForm({...patchForm, tag: e.target.value})} style={{ width: '100%', padding: '10px', background: '#0b0c0d', border: '1px solid #333', color: 'white' }}>
                <option value="PATCH">PATCH NOTES</option>
                <option value="NEWS">NEWS</option>
                <option value="ESPORTS">ESPORTS</option>
              </select>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: 'var(--apex-light-gray)' }}>รูปภาพหน้าปก URL (Image URL)</label>
              <input type="url" placeholder="https://..." value={patchForm.imageUrl} onChange={(e) => setPatchForm({...patchForm, imageUrl: e.target.value})} style={{ width: '100%', padding: '10px', background: '#0b0c0d', border: '1px solid #333', color: 'white' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: 'var(--apex-light-gray)' }}>{t('contentTh')} *</label>
              <textarea rows="5" value={patchForm.contentTh} onChange={(e) => setPatchForm({...patchForm, contentTh: e.target.value})} style={{ width: '100%', padding: '10px', background: '#0b0c0d', border: '1px solid #333', color: 'white', fontFamily: 'inherit' }} required></textarea>
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: 'var(--apex-light-gray)' }}>{t('contentEn')}</label>
              <textarea rows="5" value={patchForm.contentEn} onChange={(e) => setPatchForm({...patchForm, contentEn: e.target.value})} style={{ width: '100%', padding: '10px', background: '#0b0c0d', border: '1px solid #333', color: 'white', fontFamily: 'inherit' }}></textarea>
            </div>
            <button type="submit" className="apex-btn" style={{ marginTop: '10px', alignSelf: 'flex-start' }}>
              <PlusCircle size={16} /> {t('submit')}
            </button>
          </form>
        </div>

        {/* ฟอร์มเพิ่มวิดีโอ YouTube */}
        <div style={{ backgroundColor: 'var(--apex-card-bg)', padding: '25px', border: '1px solid #232529', height: 'fit-content' }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', color: 'var(--apex-gold)' }}>
            <Youtube size={20} /> {t('addVideo')}
          </h3>
          <form onSubmit={handleVideoSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: 'var(--apex-light-gray)' }}>ชื่อวิดีโอ / คำอธิบาย</label>
              <input type="text" value={videoForm.titleTh} onChange={(e) => setVideoForm({...videoForm, titleTh: e.target.value})} style={{ width: '100%', padding: '10px', background: '#0b0c0d', border: '1px solid #333', color: 'white' }} required />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: 'var(--apex-light-gray)' }}>YouTube Link *</label>
              <input type="url" placeholder="[https://www.youtube.com/watch?v=](https://www.youtube.com/watch?v=)..." value={videoForm.youtubeUrl} onChange={(e) => setVideoForm({...videoForm, youtubeUrl: e.target.value})} style={{ width: '100%', padding: '10px', background: '#0b0c0d', border: '1px solid #333', color: 'white' }} required />
            </div>
            <button type="submit" className="apex-btn" style={{ backgroundColor: 'var(--apex-gold)', color: '#000', marginTop: '10px' }}>
              <PlusCircle size={16} /> {t('submit')}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
