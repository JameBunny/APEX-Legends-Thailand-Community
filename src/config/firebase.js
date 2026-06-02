import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy } from "firebase/firestore";

// ใส่ข้อมูล Config ของโปรเจกต์ Firebase ของคุณที่นี่
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// ตรวจสอบและตั้งค่าเริ่มต้นให้กับแอป
let db = null;
try {
  if (firebaseConfig.apiKey !== "YOUR_API_KEY") {
    const app = initializeApp(firebaseConfig);
    db = getFirestore(app);
  }
} catch (error) {
  console.warn("Firebase Setup Required: โหมด Local Storage สำรองกำลังทำงาน", error);
}

// ฟังก์ชันจำลอง / บันทึกข้อมูลแบบ Hybrid (องรับทั้ง Local และ Firebase)
export const savePatchNoteData = async (data) => {
  if (db) {
    return await addDoc(collection(db, "patch_notes"), { ...data, createdAt: new Date().toISOString() });
  } else {
    const localData = JSON.parse(localStorage.getItem("local_patches") || "[]");
    localData.unshift({ id: Date.now(), ...data, createdAt: new Date().toISOString() });
    localStorage.setItem("local_patches", JSON.stringify(localData));
    return true;
  }
};

export const getPatchNotesData = async () => {
  if (db) {
    const q = query(collection(db, "patch_notes"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } else {
    return JSON.parse(localStorage.getItem("local_patches") || "[]");
  }
};

export const saveVideoData = async (data) => {
  if (db) {
    return await addDoc(collection(db, "videos"), { ...data, createdAt: new Date().toISOString() });
  } else {
    const localVideos = JSON.parse(localStorage.getItem("local_videos") || "[]");
    localVideos.unshift({ id: Date.now(), ...data, createdAt: new Date().toISOString() });
    localStorage.setItem("local_videos", JSON.stringify(localVideos));
    return true;
  }
};

export const getVideosData = async () => {
  if (db) {
    const q = query(collection(db, "videos"), orderBy("createdAt", "desc"));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } else {
    return JSON.parse(localStorage.getItem("local_videos") || "[]");
  }
};
