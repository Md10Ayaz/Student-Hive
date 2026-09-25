// =====================================================================
// Student Hive — Auth Context (Dual-Mode: Firebase Live + Local Mock)
// =====================================================================
// Provides authentication state, login, register, logout, and user management.
// In LIVE mode: uses Firebase Authentication + Firestore user profiles.
// In DEMO mode: uses localStorage with mock data (offline development).

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { INITIAL_STUDENTS, INITIAL_FACULTY, INITIAL_ADMIN } from '../data/mockData';
import { isLiveFirebaseMode } from '../firebase/config';
import {
  firebaseSignUp,
  firebaseSignIn,
  firebaseSignOut,
  firebaseSendPasswordReset,
  getUserProfile,
  onAuthChange
} from '../firebase/authService';
import {
  approveUserInFirestore as approveUser_FS,
  rejectUserInFirestore as rejectUser_FS
} from '../firebase/firestoreService';

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = 'student_hive_auth_user_v1';
const REGISTERED_USERS_KEY = 'student_hive_registered_users_v1';
const PASSWORDS_STORAGE_KEY = 'student_hive_user_passwords_v1';

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true); // Auth state loading
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('student_hive_theme') || 'dark';
  });

  // ── Local Mock State (DEMO mode only) ────────────────────────────────────
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    if (isLiveFirebaseMode) return [];
    try {
      const saved = localStorage.getItem(REGISTERED_USERS_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  const [userPasswords, setUserPasswords] = useState(() => {
    if (isLiveFirebaseMode) return {};
    try {
      const saved = localStorage.getItem(PASSWORDS_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) { return {}; }
  });

  // ══════════════════════════════════════════════════════════════════════════
  // FIREBASE LIVE MODE — Auth State Observer
  // ══════════════════════════════════════════════════════════════════════════
  useEffect(() => {
    if (isLiveFirebaseMode) {
      const unsubscribe = onAuthChange(async (firebaseUser) => {
        if (firebaseUser) {
          try {
            const profile = await getUserProfile(firebaseUser.uid);
            if (profile && profile.status === 'approved') {
              setCurrentUser({ ...profile, _loggedIn: true });
            } else if (profile && profile.status === 'pending') {
              // User exists but not yet approved — sign them out
              await firebaseSignOut();
              setCurrentUser(null);
            } else {
              setCurrentUser(null);
            }
          } catch (err) {
            console.error('[Auth] Error fetching profile:', err);
            setCurrentUser(null);
          }
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
      });
      return () => unsubscribe();
    } else {
      // DEMO mode: restore from localStorage
      try {
        const saved = localStorage.getItem(AUTH_STORAGE_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (parsed && parsed._loggedIn) setCurrentUser(parsed);
        }
      } catch (e) {
        console.warn('Auth local storage parse error:', e);
      }
      setLoading(false);
    }
  }, []);

  // ── Persist auth state (DEMO mode) ───────────────────────────────────────
  useEffect(() => {
    if (!isLiveFirebaseMode) {
      try {
        if (currentUser) {
          localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
        } else {
          localStorage.removeItem(AUTH_STORAGE_KEY);
        }
      } catch (e) {}
    }
  }, [currentUser]);

  // ── Theme ────────────────────────────────────────────────────────────────
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('student_hive_theme', theme);
  }, [theme]);

  // ── Persist registered users & passwords (DEMO mode) ──────────────────────
  useEffect(() => {
    if (!isLiveFirebaseMode) {
      try { localStorage.setItem(REGISTERED_USERS_KEY, JSON.stringify(registeredUsers)); } catch (e) {}
    }
  }, [registeredUsers]);

  useEffect(() => {
    if (!isLiveFirebaseMode) {
      try { localStorage.setItem(PASSWORDS_STORAGE_KEY, JSON.stringify(userPasswords)); } catch (e) {}
    }
  }, [userPasswords]);

  const toggleTheme = () => setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));

  // ══════════════════════════════════════════════════════════════════════════
  // LOGIN
  // ══════════════════════════════════════════════════════════════════════════
  const login = useCallback(async (identifier, password, role) => {
    if (isLiveFirebaseMode) {
      // ── LIVE FIREBASE LOGIN ────────────────────────────────────────────
      try {
        // Firebase Auth uses email — if user provided USN/ID, we need to
        // look up their email first. For simplicity, try as email first.
        let email = identifier.trim();

        // If it doesn't look like an email, try to construct one or look it up
        if (!email.includes('@')) {
          // Convention: USN/FacultyID@student-hive.app (or use actual email lookup)
          email = `${email.toLowerCase()}@student-hive.app`;
        }

        const { user, profile } = await firebaseSignIn(email, password);

        // Verify role matches
        if (profile.role !== role) {
          await firebaseSignOut();
          return {
            success: false,
            message: `This account is registered as "${profile.role}", not "${role}".`
          };
        }

        setCurrentUser({ ...profile, _loggedIn: true });
        return { success: true };
      } catch (error) {
        return {
          success: false,
          message: error.message || 'Authentication failed. Please check your credentials.'
        };
      }
    } else {
      // ── LOCAL DEMO LOGIN ───────────────────────────────────────────────
      const trimmedId = identifier.trim().toLowerCase();
      const getUserPassword = (idOrEmail) => {
        if (!idOrEmail) return 'password123';
        const key = idOrEmail.trim().toLowerCase();
        return userPasswords[key] || 'password123';
      };
      const expectedPassword = getUserPassword(trimmedId);

      if (role === 'student') {
        const regUser = registeredUsers.find(
          u => u.role === 'student' && (u.usn?.toLowerCase() === trimmedId || u.email?.toLowerCase() === trimmedId)
        );
        if (regUser) {
          if (regUser.status === 'pending') {
            return { success: false, message: 'Your account registration is pending Admin verification. Please wait for an administrator to confirm your USN/details.' };
          }
          if (regUser.status === 'rejected') {
            return { success: false, message: 'Your registration request was declined by the Admin.' };
          }
          const userPass = regUser._password || expectedPassword;
          if (password === userPass) { setCurrentUser({ ...regUser, _loggedIn: true }); return { success: true }; }
          return { success: false, message: 'Incorrect password.' };
        }
        const student = INITIAL_STUDENTS.find(
          s => s.usn.toLowerCase() === trimmedId || s.email.toLowerCase() === trimmedId
        );
        if (student) {
          if (password === expectedPassword) { setCurrentUser({ ...student, _loggedIn: true }); return { success: true }; }
          return { success: false, message: `Incorrect password for ${student.name}.` };
        }
        return { success: false, message: 'Student not found. Please contact Admin for login credentials.' };
      }

      if (role === 'faculty') {
        const regUser = registeredUsers.find(
          u => u.role === 'faculty' && (u.facultyId?.toLowerCase() === trimmedId || u.email?.toLowerCase() === trimmedId)
        );
        if (regUser) {
          if (regUser.status === 'pending') return { success: false, message: 'Your account registration is pending Admin verification.' };
          if (regUser.status === 'rejected') return { success: false, message: 'Your registration request was declined by the Admin.' };
          const userPass = regUser._password || expectedPassword;
          if (password === userPass) { setCurrentUser({ ...regUser, _loggedIn: true }); return { success: true }; }
          return { success: false, message: 'Incorrect password.' };
        }
        const faculty = INITIAL_FACULTY.find(
          f => f.facultyId.toLowerCase() === trimmedId || f.email.toLowerCase() === trimmedId
        );
        if (faculty) {
          if (password === expectedPassword) { setCurrentUser({ ...faculty, _loggedIn: true }); return { success: true }; }
          return { success: false, message: `Incorrect password for ${faculty.name}.` };
        }
        return { success: false, message: 'Faculty not found. Please contact Admin for login credentials.' };
      }

      if (role === 'admin') {
        const regUser = registeredUsers.find(
          u => u.role === 'admin' && (u.adminId?.toLowerCase() === trimmedId || u.email?.toLowerCase() === trimmedId)
        );
        if (regUser) {
          const userPass = regUser._password || expectedPassword;
          if (password === userPass) { setCurrentUser({ ...regUser, _loggedIn: true }); return { success: true }; }
          return { success: false, message: 'Incorrect password.' };
        }
        const isAdmin =
          trimmedId === INITIAL_ADMIN.adminId.toLowerCase() ||
          trimmedId === INITIAL_ADMIN.email.toLowerCase() ||
          trimmedId === 'admin' || trimmedId === 'adm-001';
        if (isAdmin) {
          if (password === expectedPassword) { setCurrentUser({ ...INITIAL_ADMIN, _loggedIn: true }); return { success: true }; }
          return { success: false, message: 'Incorrect password for Admin.' };
        }
        return { success: false, message: 'Admin not found.' };
      }

      return { success: false, message: 'Role not recognized.' };
    }
  }, [registeredUsers, userPasswords]);

  // ══════════════════════════════════════════════════════════════════════════
  // LOGOUT
  // ══════════════════════════════════════════════════════════════════════════
  const logout = useCallback(async () => {
    if (isLiveFirebaseMode) {
      await firebaseSignOut();
    }
    setCurrentUser(null);
  }, []);

  // ══════════════════════════════════════════════════════════════════════════
  // REGISTER
  // ══════════════════════════════════════════════════════════════════════════
  const register = useCallback(async (formData, role, autoApprove = false) => {
    const { name, identifier, email, deptId, deptName, year, semester, designation, adminDesignation, password } = formData;

    if (isLiveFirebaseMode) {
      // ── LIVE FIREBASE REGISTRATION ─────────────────────────────────────
      try {
        const profileData = {
          ...(role === 'student' && {
            usn: identifier.trim(),
            department: deptName || 'Computer Science and Engineering',
            deptId: deptId || 'cse',
            year: parseInt(year || 1),
            semester: parseInt(semester || 1),
            section: 'A',
            cgpa: 0,
            admissionYear: new Date().getFullYear(),
            bloodGroup: ''
          }),
          ...(role === 'faculty' && {
            facultyId: identifier.trim(),
            department: deptName || 'Computer Science and Engineering',
            deptId: deptId || 'cse',
            designation: designation || 'Assistant Professor',
            office: 'TBD',
            subjectsAssigned: []
          }),
          ...(role === 'admin' && {
            adminId: identifier.trim(),
            designation: adminDesignation || 'Administrative Officer',
            office: 'Administrative Block'
          })
        };

        let authEmail = email.trim();
        if (!authEmail.includes('@')) {
          authEmail = `${authEmail.toLowerCase()}@student-hive.app`;
        }

        await firebaseSignUp({
          email: authEmail,
          password,
          name: name.trim(),
          role,
          profileData
        });

        // Sign out immediately since the account needs admin approval
        // (unless auto-approved)
        if (!autoApprove) {
          await firebaseSignOut();
        }

        return {
          success: true,
          pendingApproval: !autoApprove,
          message: autoApprove
            ? 'Account created and approved!'
            : 'Registration request submitted successfully! Your account is pending Admin verification.'
        };
      } catch (error) {
        let message = error.message;
        if (error.code === 'auth/email-already-in-use') {
          message = 'An account with this email already exists.';
        } else if (error.code === 'auth/weak-password') {
          message = 'Password must be at least 6 characters.';
        }
        return { success: false, message };
      }
    } else {
      // ── LOCAL DEMO REGISTRATION ────────────────────────────────────────
      const trimmedId = identifier.trim();
      const trimmedEmail = email.trim().toLowerCase();
      const idLower = trimmedId.toLowerCase();
      const userStatus = autoApprove ? 'approved' : 'pending';

      const updateUserPassword = (idOrEmail, newPassword) => {
        if (!idOrEmail) return;
        const key = idOrEmail.trim().toLowerCase();
        setUserPasswords(prev => ({ ...prev, [key]: newPassword }));
      };

      if (role === 'student') {
        const inMock = INITIAL_STUDENTS.find(s => s.usn.toLowerCase() === idLower || s.email.toLowerCase() === trimmedEmail);
        const inReg = registeredUsers.find(u => u.role === 'student' && (u.usn?.toLowerCase() === idLower || u.email?.toLowerCase() === trimmedEmail));
        if (inMock || inReg) return { success: false, message: 'A student with this USN or email already exists.' };
        const newUser = {
          uid: `stu-reg-${Date.now()}`, publicId: `SH-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
          usn: trimmedId, name: name.trim(), email: trimmedEmail, phone: '',
          department: deptName || 'Computer Science and Engineering', deptId: deptId || 'cse',
          year: parseInt(year || 1), semester: parseInt(semester || 1), section: 'A',
          role: 'student', cgpa: 0, admissionYear: new Date().getFullYear(), bloodGroup: '',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name.trim())}&background=1d4ed8&color=fff&bold=true`,
          _password: password, status: userStatus, createdAt: new Date().toISOString()
        };
        setRegisteredUsers(prev => [...prev, newUser]);
        if (autoApprove) updateUserPassword(trimmedId, password);
        return {
          success: true, pendingApproval: !autoApprove,
          message: autoApprove ? 'Account created and approved!' : 'Registration request submitted successfully! Your account is pending Admin verification.'
        };
      }

      if (role === 'faculty') {
        const inMock = INITIAL_FACULTY.find(f => f.facultyId.toLowerCase() === idLower || f.email.toLowerCase() === trimmedEmail);
        const inReg = registeredUsers.find(u => u.role === 'faculty' && (u.facultyId?.toLowerCase() === idLower || u.email?.toLowerCase() === trimmedEmail));
        if (inMock || inReg) return { success: false, message: 'A faculty member with this ID or email already exists.' };
        const newUser = {
          uid: `fac-reg-${Date.now()}`, facultyId: trimmedId, name: name.trim(), email: trimmedEmail, phone: '',
          department: deptName || 'Computer Science and Engineering', deptId: deptId || 'cse',
          designation: designation || 'Assistant Professor', role: 'faculty', office: 'TBD',
          officeHours: 'TBD', subjectsAssigned: [],
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name.trim())}&background=0284c7&color=fff&bold=true`,
          _password: password, status: userStatus, createdAt: new Date().toISOString()
        };
        setRegisteredUsers(prev => [...prev, newUser]);
        if (autoApprove) updateUserPassword(trimmedId, password);
        return {
          success: true, pendingApproval: !autoApprove,
          message: autoApprove ? 'Account created and approved!' : 'Registration request submitted successfully! Your account is pending Admin verification.'
        };
      }

      if (role === 'admin') {
        const inMock = INITIAL_ADMIN.adminId.toLowerCase() === idLower || INITIAL_ADMIN.email.toLowerCase() === trimmedEmail;
        const inReg = registeredUsers.find(u => u.role === 'admin' && (u.adminId?.toLowerCase() === idLower || u.email?.toLowerCase() === trimmedEmail));
        if (inMock || inReg) return { success: false, message: 'An admin with this ID or email already exists.' };
        const newUser = {
          uid: `adm-reg-${Date.now()}`, adminId: trimmedId, name: name.trim(), email: trimmedEmail,
          role: 'admin', designation: adminDesignation || 'Administrative Officer', office: 'Administrative Block',
          avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(name.trim())}&background=4f46e5&color=fff&bold=true`,
          _password: password, status: 'approved', createdAt: new Date().toISOString()
        };
        setRegisteredUsers(prev => [...prev, newUser]);
        updateUserPassword(trimmedId, password);
        return { success: true, pendingApproval: false };
      }

      return { success: false, message: 'Invalid role.' };
    }
  }, [registeredUsers]);

  // ══════════════════════════════════════════════════════════════════════════
  // ADMIN: Approve / Reject Users
  // ══════════════════════════════════════════════════════════════════════════
  const approveUser = useCallback(async (uid) => {
    if (isLiveFirebaseMode) {
      await approveUser_FS(uid);
    } else {
      setRegisteredUsers(prev => prev.map(u => {
        if (u.uid === uid) {
          const id = u.role === 'student' ? u.usn : u.role === 'faculty' ? u.facultyId : u.adminId;
          if (id && u._password) {
            setUserPasswords(p => ({ ...p, [id.trim().toLowerCase()]: u._password }));
          }
          return { ...u, status: 'approved' };
        }
        return u;
      }));
    }
  }, []);

  const rejectUser = useCallback(async (uid) => {
    if (isLiveFirebaseMode) {
      await rejectUser_FS(uid);
    } else {
      setRegisteredUsers(prev => prev.map(u => u.uid === uid ? { ...u, status: 'rejected' } : u));
    }
  }, []);

  // ── Password Helpers (DEMO mode) ────────────────────────────────────────
  const getUserPassword = (idOrEmail) => {
    if (!idOrEmail) return 'password123';
    const key = idOrEmail.trim().toLowerCase();
    return userPasswords[key] || 'password123';
  };

  const updateUserPassword = (idOrEmail, newPassword) => {
    if (!idOrEmail) return;
    const key = idOrEmail.trim().toLowerCase();
    setUserPasswords(prev => ({ ...prev, [key]: newPassword }));
  };

  // ── Password Reset (LIVE mode) ──────────────────────────────────────────
  const resetPassword = useCallback(async (email) => {
    if (isLiveFirebaseMode) {
      await firebaseSendPasswordReset(email);
      return { success: true, message: 'Password reset email sent! Check your inbox.' };
    }
    return { success: true, message: 'Password reset is not available in demo mode.' };
  }, []);

  // ── Quick Demo Role Switcher (DEMO mode only) ──────────────────────────
  const switchRole = (targetRole) => {
    if (targetRole === 'student') setCurrentUser({ ...INITIAL_STUDENTS[0], _loggedIn: true });
    else if (targetRole === 'faculty') setCurrentUser({ ...INITIAL_FACULTY[0], _loggedIn: true });
    else if (targetRole === 'admin') setCurrentUser({ ...INITIAL_ADMIN, _loggedIn: true });
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        role: currentUser?.role || null,
        loading,
        theme,
        toggleTheme,
        login,
        logout,
        register,
        switchRole,
        getUserPassword,
        updateUserPassword,
        resetPassword,
        registeredUsers,
        approveUser,
        rejectUser,
        isLiveMode: isLiveFirebaseMode
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
