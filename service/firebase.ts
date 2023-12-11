import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
//TODO: 파이어 베이스 인증된 사용자만 접근하게 설정하기
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DB_URL,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
};

// Initialize Firebase

export const firebaseApp = initializeApp(firebaseConfig);
export const database = getDatabase(firebaseApp);
