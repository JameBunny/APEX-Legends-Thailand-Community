import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import { getPatchNotesData, getVideosData } from '../config/firebase';
import NewsCard from '../components/NewsCard';
import VideoCard from '../components/VideoCard';
import { Shield, Trophy, Zap } from 'lucide-react';

export default function Home() {
  const { t } = useLang();
  const [patches, setPatches] = useState([]);
  const [videos, setVideos] = useState([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // โหลดข้อมูล
    getPatchNotesData().then(data => setPatches(data.slice(0, 3))); // เอาแค่ 3 อันเด่น
    getVideosData().then(data => setVideos(data.slice(0, 4))); // เอาแค่ 4 วิดีโอ

    // เช็คประเภทเครื่องเพื่อปรับอนิเมชั่นให้เบาแรง
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  // วางแผน Variant อนิเมชั่นให้สัมพันธ์กับสเปกเครื่อง (ถ้าเป็นมือถือ จะเป็น Static ไม่มีอนิเมชั่นหน่วง)
  const heroAnimation = isMobile ? { opacity: 1 } : { opacity: 1, y: 0 };
  const heroInitial = isMobile ? { opacity: 1 } : { opacity: 0, y: 30 };

  return (
    <div>
      {/* Hero Section - Cinematic AAA Style (Wukong Vibes) */}
      <div style={{ 
        position: 'relative', 
        minHeight: '80vh', 
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '40px 20px' : '0 80px', 
        backgroundImage: 'linear-gradient(to right, rgba(11,12,13,1) 0%, rgba(11,12,13,0.4) 50%, rgba(11,12,13,1) 100%), url("https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        textAlign: 'center'
      }}>
        <div style={{ maxWidth: '800px', zIndex: 10 }}>
          <motion.h1 
            initial={heroInitial}
            animate={heroAnimation}
            transition={{ duration: 0.8, ease: "easeOut" }}
            style={{ 
              fontSize: isMobile ? '2.5rem' : '4.5rem', 
              color: 'white', 
              fontWeight: 'bold', 
              marginBottom: '20px', 
              lineHeight: '1.05',
              textShadow: '0px 10px 30px rgba(0,0,0,0.8)'
            }}
          >
            {t('heroTitle')}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            style={{ 
              color: 'rgba(255,255,255,0.7)', 
              fontSize: isMobile ? '16px' : '20px', 
              marginBottom: '40px', 
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto 40px auto'
            }}
          >
            {t('heroSub')}
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <button className="apex-btn" onClick={() => window.location.href='/patch-notes'}>
              <Zap size={18} /> EXPLORE PATCH NOTES
            </button>
          </motion.div>
        </div>
      </div>

      {/* Info Features */}
      <div className="container" style={{ margin: '50px auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr 1fr', gap: '20px' }}>
          <div className="glass-card" style={{ padding: '25px', borderBottom: '3px solid var(--apex-red)' }}>
            <Shield size={36} color="var(--apex-red)" style={{ marginBottom: '15px' }} />
            <h3 style={{ marginBottom: '10px' }}>Fast Translation</h3>
            <p style={{ color: 'var(--apex-light-gray)', fontSize: '14px' }}>แปลแพตช์โน้ตไว อัปเดตข้อมูลภาษาไทยอย่างเป็นทางการได้ก่อนใครในประเทศ</p>
          </div>
          <div className="glass-card" style={{ padding: '25px', borderBottom: '3px solid var(--apex-gold)' }}>
            <Trophy size={36} color="var(--apex-gold)" style={{ marginBottom: '15px' }} />
            <h3 style={{ marginBottom: '10px' }}>Esports Tracker</h3>
            <p style={{ color: 'var(--apex-light-gray)', fontSize: '14px' }}>เกาะติดผลคะแนนและตารางการแข่งขันรายวันของสโมสรไทยระดับโปรลีก</p>
          </div>
          <div className="glass-card" style={{ padding: '25px', borderBottom: '3px solid #fff' }}>
            <Zap size={36} color="#fff" style={{ marginBottom: '15px' }} />
            <h3 style={{ marginBottom: '10px' }}>Media Collection</h3>
            <p style={{ color: 'var(--apex-light-gray)', fontSize: '14px' }}>วิเคราะห์เจาะลึกเทคนิค เมต้าปืน และเทคนิคการเล่นจากโค้ชชั้นนำ</p>
          </div>
        </div>
      </div>

      {/* News & Patch Notes Section */}
      <div className="container" style={{ marginTop: '60px' }}>
        <motion.h2 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="apex-section-title"
        >
          {t('latestNews')}
        </motion.h2>

        {patches.length === 0 ? (
          <p style={{ color: 'var(--apex-light-gray)' }}>ยังไม่มีการอัปเดตข่าวสารในขณะนี้...</p>
        ) : (
          <div className="responsive-grid">
            {patches.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                className="glass-card"
              >
                <NewsCard item={item} />
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Media Collection */}
      <div className="container" style={{ marginTop: '70px', paddingBottom: '40px' }}>
        <motion.h2 
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="apex-section-title"
        >
          {t('videoGallery')}
        </motion.h2>

        {videos.length === 0 ? (
          <p style={{ color: 'var(--apex-light-gray)' }}>ยังไม่มีวิดีโอแนะนำในขณะนี้...</p>
        ) : (
          <div className="responsive-grid" style={{ gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr' }}>
            {videos.map((video, index) => (
              <motion.div
                key={video.id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="glass-card"
                whileHover={{ scale: 1.02 }}
              >
                <VideoCard video={video} />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
