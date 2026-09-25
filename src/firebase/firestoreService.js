// =====================================================================
// Student Hive — Firestore Data Service
// =====================================================================
// Generic CRUD helpers + domain-specific operations for all collections.
// Used by DataContext when running in live Firebase mode.

import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  serverTimestamp,
  writeBatch
} from 'firebase/firestore';
import { db } from './config';

// ═══════════════════════════════════════════════════════════════════════
// GENERIC CRUD HELPERS
// ═══════════════════════════════════════════════════════════════════════

/**
 * Fetch all documents from a collection (with optional query constraints)
 */
export async function fetchCollection(collectionName, ...queryConstraints) {
  const q = queryConstraints.length
    ? query(collection(db, collectionName), ...queryConstraints)
    : collection(db, collectionName);
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

/**
 * Fetch a single document by ID
 */
export async function fetchDocument(collectionName, docId) {
  const snap = await getDoc(doc(db, collectionName, docId));
  if (!snap.exists()) return null;
  return { id: snap.id, ...snap.data() };
}

/**
 * Add a new document (auto-generated ID)
 */
export async function addDocument(collectionName, data) {
  const docRef = await addDoc(collection(db, collectionName), {
    ...data,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp()
  });
  return docRef.id;
}

/**
 * Set a document with a specific ID (create or overwrite)
 */
export async function setDocument(collectionName, docId, data, merge = true) {
  await setDoc(doc(db, collectionName, docId), {
    ...data,
    updatedAt: serverTimestamp()
  }, { merge });
  return docId;
}

/**
 * Update specific fields on a document
 */
export async function updateDocument(collectionName, docId, updates) {
  await updateDoc(doc(db, collectionName, docId), {
    ...updates,
    updatedAt: serverTimestamp()
  });
}

/**
 * Delete a document
 */
export async function removeDocument(collectionName, docId) {
  await deleteDoc(doc(db, collectionName, docId));
}

/**
 * Subscribe to a collection in real-time (returns unsubscribe function)
 */
export function subscribeToCollection(collectionName, callback, ...queryConstraints) {
  const q = queryConstraints.length
    ? query(collection(db, collectionName), ...queryConstraints)
    : collection(db, collectionName);

  return onSnapshot(q, (snap) => {
    const docs = snap.docs.map(d => ({ id: d.id, ...d.data() }));
    callback(docs);
  }, (error) => {
    console.error(`[Firestore] Error subscribing to ${collectionName}:`, error);
  });
}

/**
 * Subscribe to a single document in real-time
 */
export function subscribeToDocument(collectionName, docId, callback) {
  return onSnapshot(doc(db, collectionName, docId), (snap) => {
    if (snap.exists()) {
      callback({ id: snap.id, ...snap.data() });
    } else {
      callback(null);
    }
  });
}

// ═══════════════════════════════════════════════════════════════════════
// DOMAIN-SPECIFIC OPERATIONS
// ═══════════════════════════════════════════════════════════════════════

// ── Users / Registration ─────────────────────────────────────────────────────

export async function fetchAllUsers(role) {
  if (role) {
    return fetchCollection('users', where('role', '==', role));
  }
  return fetchCollection('users');
}

export async function fetchPendingUsers() {
  return fetchCollection('users', where('status', '==', 'pending'));
}

export async function approveUserInFirestore(uid) {
  return updateDocument('users', uid, { status: 'approved' });
}

export async function rejectUserInFirestore(uid) {
  return updateDocument('users', uid, { status: 'rejected' });
}

// ── Attendance ───────────────────────────────────────────────────────────────

export async function fetchAttendance(studentUid) {
  if (studentUid) {
    return fetchCollection('attendance', where('studentUid', '==', studentUid));
  }
  return fetchCollection('attendance');
}

export async function markAttendanceInFirestore(studentUid, subjectId, date, status, hours = 1) {
  return addDocument('attendance', {
    studentUid,
    subjectId,
    date,
    status,
    hours
  });
}

export function subscribeToAttendance(studentUid, callback) {
  if (studentUid) {
    return subscribeToCollection('attendance', callback, where('studentUid', '==', studentUid));
  }
  return subscribeToCollection('attendance', callback);
}

// ── Marks ────────────────────────────────────────────────────────────────────

export async function fetchMarks(studentUid) {
  if (studentUid) {
    return fetchCollection('marks', where('studentUid', '==', studentUid));
  }
  return fetchCollection('marks');
}

export async function saveMarksInFirestore(markId, marksData) {
  if (markId) {
    return updateDocument('marks', markId, marksData);
  }
  return addDocument('marks', marksData);
}

// ── Assignments ──────────────────────────────────────────────────────────────

export async function fetchAssignments(subjectId) {
  if (subjectId) {
    return fetchCollection('assignments', where('subjectId', '==', subjectId));
  }
  return fetchCollection('assignments');
}

export async function createAssignmentInFirestore(assignmentData) {
  return addDocument('assignments', { ...assignmentData, status: 'active' });
}

export async function submitAssignmentInFirestore(assignmentId, submissionData) {
  return updateDocument('assignments', assignmentId, {
    status: 'submitted',
    submission: {
      ...submissionData,
      submittedAt: new Date().toISOString()
    }
  });
}

export async function gradeAssignmentInFirestore(assignmentId, marksAwarded, feedback) {
  return updateDocument('assignments', assignmentId, {
    marksAwarded: Number(marksAwarded),
    facultyFeedback: feedback
  });
}

// ── Study Materials ──────────────────────────────────────────────────────────

export async function fetchMaterials(subjectId) {
  if (subjectId) {
    return fetchCollection('materials', where('subjectId', '==', subjectId));
  }
  return fetchCollection('materials');
}

export async function uploadMaterialInFirestore(materialData) {
  return addDocument('materials', materialData);
}

// ── Questions (Academic Q&A) ─────────────────────────────────────────────────

export async function fetchQuestions(subjectId) {
  if (subjectId) {
    return fetchCollection('questions', where('subjectId', '==', subjectId));
  }
  return fetchCollection('questions');
}

export async function askQuestionInFirestore(questionData) {
  return addDocument('questions', { ...questionData, status: 'open', answer: null });
}

export async function answerQuestionInFirestore(questionId, answerText, facultyName) {
  return updateDocument('questions', questionId, {
    status: 'resolved',
    answer: {
      facultyName,
      text: answerText,
      answeredAt: new Date().toISOString()
    }
  });
}

// ── Syllabus ─────────────────────────────────────────────────────────────────

export async function fetchSyllabus(subjectId) {
  if (subjectId) {
    return fetchCollection('syllabus', where('subjectId', '==', subjectId));
  }
  return fetchCollection('syllabus');
}

// ── Timetable & Reschedules ──────────────────────────────────────────────────

export async function fetchTimetable() {
  return fetchCollection('timetable');
}

export async function rescheduleClassInFirestore(rescheduleData) {
  return addDocument('rescheduleAlerts', rescheduleData);
}

// ── Leave Requests ───────────────────────────────────────────────────────────

export async function fetchLeaves(studentUid) {
  if (studentUid) {
    return fetchCollection('leaveRequests', where('studentUid', '==', studentUid));
  }
  return fetchCollection('leaveRequests');
}

export async function submitLeaveInFirestore(leaveData) {
  return addDocument('leaveRequests', { ...leaveData, status: 'Pending', reviewedBy: null });
}

export async function reviewLeaveInFirestore(leaveId, status, reviewerName) {
  return updateDocument('leaveRequests', leaveId, { status, reviewedBy: reviewerName });
}

// ── Complaints ───────────────────────────────────────────────────────────────

export async function fetchComplaints(studentUid) {
  if (studentUid) {
    return fetchCollection('complaints', where('studentUid', '==', studentUid));
  }
  return fetchCollection('complaints');
}

export async function submitComplaintInFirestore(complaintData) {
  return addDocument('complaints', { ...complaintData, status: 'Submitted' });
}

export async function updateComplaintInFirestore(complaintId, status, adminNotes) {
  return updateDocument('complaints', complaintId, { status, adminNotes });
}

// ── Fees & Payments ──────────────────────────────────────────────────────────

export async function fetchFees(studentUid) {
  return fetchDocument('fees', studentUid);
}

export async function recordPaymentInFirestore(studentUid, paymentData) {
  // This could also use a subcollection for payment history
  return addDocument('payments', { studentUid, ...paymentData });
}

// ── Notices ──────────────────────────────────────────────────────────────────

export async function fetchNotices() {
  return fetchCollection('notices');
}

export async function publishNoticeInFirestore(noticeData) {
  return addDocument('notices', noticeData);
}

export function subscribeToNotices(callback) {
  return subscribeToCollection('notices', callback);
}

// ── Certificates ─────────────────────────────────────────────────────────────

export async function fetchCertificates(studentUid) {
  if (studentUid) {
    return fetchCollection('certificates', where('studentUid', '==', studentUid));
  }
  return fetchCollection('certificates');
}

export async function uploadCertificateInFirestore(certData) {
  return addDocument('certificates', certData);
}

// ── Feedback ─────────────────────────────────────────────────────────────────

export async function fetchFeedback() {
  return fetchCollection('feedback');
}

export async function submitFeedbackInFirestore(feedbackData) {
  return addDocument('feedback', feedbackData);
}

// ── Notifications ────────────────────────────────────────────────────────────

export async function fetchNotifications(userId) {
  return fetchCollection('notifications', where('userId', '==', userId));
}

export async function addNotificationInFirestore(notifData) {
  return addDocument('notifications', notifData);
}

export function subscribeToNotifications(userId, callback) {
  return subscribeToCollection('notifications', callback, where('userId', '==', userId));
}

// ── Departments & Subjects ───────────────────────────────────────────────────

export async function fetchDepartments() {
  return fetchCollection('departments');
}

export async function fetchSubjects(deptId) {
  if (deptId) {
    return fetchCollection('subjects', where('deptId', '==', deptId));
  }
  return fetchCollection('subjects');
}

// ── Batch Seed (for initial data migration) ──────────────────────────────────

/**
 * Seed initial mock data into Firestore (one-time operation)
 * Call this from an admin panel or a setup script
 */
export async function seedCollectionData(collectionName, dataArray) {
  const batch = writeBatch(db);
  dataArray.forEach((item) => {
    const id = item.id || item.uid || `${collectionName}-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    const docRef = doc(db, collectionName, id);
    batch.set(docRef, {
      ...item,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
  });
  await batch.commit();
  console.info(`[Firestore] Seeded ${dataArray.length} documents into "${collectionName}"`);
}
