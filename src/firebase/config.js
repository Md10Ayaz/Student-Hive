// =====================================================================
// Student Hive — Firebase SDK Setup & Service Initialization
// =====================================================================
// This file initializes the Firebase app and exports all service instances.
// It supports dual-mode: Live Firebase (production) or Local Mock (demo).

import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getStorage, connectStorageEmulator } from 'firebase/storage';

// Your Firebase project configuration
// Environment variables take priority; falls back to your project's actual keys
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyAreQHnt2KUMwUs2nnemxbwpgLqHaSzNiM',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'student-hive-b9a35.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'student-hive-b9a35',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'student-hive-b9a35.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '615659389076',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:615659389076:web:4f53a736e4768d75c03481',
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || 'G-70XJK6MFT8'
};

// ── Initialize Firebase App ──────────────────────────────────────────────────
const app = initializeApp(firebaseConfig);

// ── Initialize Services ──────────────────────────────────────────────────────
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// ── Dual Mode Detection ──────────────────────────────────────────────────────
// Set VITE_USE_FIREBASE_LIVE=true in .env to force live mode
// When false or unset, the app uses localStorage mock data for offline dev
export const isLiveFirebaseMode = import.meta.env.VITE_USE_FIREBASE_LIVE === 'true';

// ── Optional: Connect to Firebase Emulators for local development ────────────
// Set VITE_USE_EMULATORS=true in .env to connect to local emulators
if (import.meta.env.VITE_USE_EMULATORS === 'true') {
  try {
    connectAuthEmulator(auth, 'http://localhost:9099', { disableWarnings: true });
    connectFirestoreEmulator(db, 'localhost', 8080);
    connectStorageEmulator(storage, 'localhost', 9199);
    console.info('[Student Hive] 🧪 Connected to Firebase Emulators');
  } catch (e) {
    console.warn('[Student Hive] Failed to connect to emulators:', e.message);
  }
}

console.info(
  `[Student Hive] Backend: ${isLiveFirebaseMode ? '🟢 LIVE FIREBASE' : '🟡 LOCAL DEMO (localStorage)'}`
);

export default app;
