import React, { createContext, useState, useContext, useEffect } from 'react';

const LanguageContext = createContext();

const translations = {
  th: {
    home: "หน้าหลัก",
    patchNotes: "แพตช์โน้ต",
    esports: "อีสปอร์ตไทย",
    admin: "ผู้ดูแลระบบ",
    heroTitle: "อัปเดตสถานการณ์สมรภูมิ APEX LEGENDS THAILAND",
    heroSub: "ติดตามข่าวสารล่าสุด คำแปลแพตช์โน้ตภาษาไทย และผลการแข่งขันของทีมไทยแบบเรียลไทม์",
    latestNews: "ข่าวสารล่าสุดประจำเกม",
    thaiEsports: "อัปเดตทัวร์นาเมนต์ทีมไทย",
    videoGallery: "วิดีโอไฮไลท์และบทวิเคราะห์",
    readMore: "อ่านเพิ่มเติม",
    addPatch: "เพิ่มข่าวสาร/แพตช์โน้ตใหม่",
    addVideo: "เพิ่มวิดีโอ YouTube",
    titleTh: "หัวข้อ (ภาษาไทย)",
    titleEn: "หัวข้อ (English)",
    contentTh: "เนื้อหาข่าว (ภาษาไทย)",
    contentEn: "เนื้อหาข่าว (English)",
    submit: "บันทึกข้อมูล",
    team: "ทีม",
    status: "สถานะ",
    score: "คะแนนรวม",
    live: "กำลังแข่ง",
    upcoming: "เร็วๆ นี้",
    ended: "สิ้นสุดแล้ว"
  },
  en: {
    home: "Home",
    patchNotes: "Patch Notes",
    esports: "Thai Esports",
    admin: "Admin",
    heroTitle: "THE ULTIMATE APEX LEGENDS THAILAND HUB",
    heroSub: "Stay updated with the latest news, Thai patch note translations, and live results of Thai pro teams.",
    latestNews: "Latest News & Updates",
    thaiEsports: "Thai Esports Tournament Tracker",
    videoGallery: "Video Highlights & Analytics",
    readMore: "Read More",
    addPatch: "Add New News / Patch Note",
    addVideo: "Add YouTube Video",
    titleTh: "Title (Thai)",
    titleEn: "Title (English)",
    contentTh: "Content (Thai)",
    contentEn: "Content (English)",
    submit: "Save Data",
    team: "Team",
    status: "Status",
    score: "Total Points",
    live: "LIVE",
    upcoming: "UPCOMING",
    ended: "ENDED"
  }
};

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(localStorage.getItem('apex_lang') || 'th');

  useEffect(() => {
    localStorage.setItem('apex_lang', lang);
  }, [lang]);

  const t = (key) => {
    return translations[lang][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLang = () => useContext(LanguageContext);
