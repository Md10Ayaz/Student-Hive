// =====================================================================
// Student Hive — Firebase Authentication Service
// =====================================================================
// Provides all Firebase Auth operations: sign up, sign in, sign out,
// password reset, profile management. Used by AuthContext in live mode.

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from './config';

// ── Sign Up: Create Firebase Auth user + Firestore profile ───────────────────
export async function firebaseSignUp({ email, password, name, role, profileData }) {
  // 1. Create the Firebase Auth user
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // 2. Set display name on the Auth profile
  await updateProfile(user, { displayName: name });

  // 3. Create the user document in Firestore with role & extra profile data
  const userDoc = {
    uid: user.uid,
    email: user.email,
    name,
    role,
    status: role === 'admin' ? 'approved' : 'pending', // Students/faculty need admin approval
    avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${
      role === 'student' ? '1d4ed8' : role === 'faculty' ? '0284c7' : '4f46e5'
    }&color=fff&bold=true`,
    createdAt: serverTimestamp(),
    ...profileData
  };

  await setDoc(doc(db, 'users', user.uid), userDoc);

  return { user, profile: userDoc };
}

// ── Sign In ──────────────────────────────────────────────────────────────────
export async function firebaseSignIn(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  const user = userCredential.user;

  // Fetch the Firestore profile to get role & status
  const profileSnap = await getDoc(doc(db, 'users', user.uid));
  if (!profileSnap.exists()) {
    await signOut(auth);
    throw new Error('User profile not found. Please contact the administrator.');
  }

  const profile = profileSnap.data();

  // Check if the user is approved
  if (profile.status === 'pending') {
    await signOut(auth);
    throw new Error('Your account is pending Admin verification. Please wait for approval.');
  }

  if (profile.status === 'rejected') {
    await signOut(auth);
    throw new Error('Your registration request was declined by the Admin.');
  }

  // Update last login timestamp
  await updateDoc(doc(db, 'users', user.uid), {
    lastLoginAt: serverTimestamp()
  });

  return { user, profile };
}

// ── Sign Out ─────────────────────────────────────────────────────────────────
export async function firebaseSignOut() {
  return signOut(auth);
}

// ── Password Reset ───────────────────────────────────────────────────────────
export async function firebaseSendPasswordReset(email) {
  return sendPasswordResetEmail(auth, email);
}

// ── Change Password (requires re-authentication) ────────────────────────────
export async function firebaseChangePassword(currentPassword, newPassword) {
  const user = auth.currentUser;
  if (!user) throw new Error('No authenticated user.');

  const credential = EmailAuthProvider.credential(user.email, currentPassword);
  await reauthenticateWithCredential(user, credential);
  await updatePassword(user, newPassword);
}

// ── Get User Profile from Firestore ──────────────────────────────────────────
export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return null;
  return { uid: snap.id, ...snap.data() };
}

// ── Update User Profile in Firestore ─────────────────────────────────────────
export async function updateUserProfile(uid, updates) {
  await updateDoc(doc(db, 'users', uid), {
    ...updates,
    updatedAt: serverTimestamp()
  });
}

// ── Auth State Observer ──────────────────────────────────────────────────────
export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}
