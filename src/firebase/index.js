// =====================================================================
// Student Hive — Firebase Module Barrel Export
// =====================================================================
// Single import point for all Firebase services

// Core configuration & instances
export { default as app, auth, db, storage, isLiveFirebaseMode } from './config';

// Authentication service
export {
  firebaseSignUp,
  firebaseSignIn,
  firebaseSignOut,
  firebaseSendPasswordReset,
  firebaseChangePassword,
  getUserProfile,
  updateUserProfile,
  onAuthChange
} from './authService';

// Firestore data service
export {
  fetchCollection,
  fetchDocument,
  addDocument,
  setDocument,
  updateDocument,
  removeDocument,
  subscribeToCollection,
  subscribeToDocument,
  fetchAllUsers,
  fetchPendingUsers,
  approveUserInFirestore,
  rejectUserInFirestore,
  fetchAttendance,
  markAttendanceInFirestore,
  subscribeToAttendance,
  fetchMarks,
  saveMarksInFirestore,
  fetchAssignments,
  createAssignmentInFirestore,
  submitAssignmentInFirestore,
  gradeAssignmentInFirestore,
  fetchMaterials,
  uploadMaterialInFirestore,
  fetchQuestions,
  askQuestionInFirestore,
  answerQuestionInFirestore,
  fetchSyllabus,
  fetchTimetable,
  rescheduleClassInFirestore,
  fetchLeaves,
  submitLeaveInFirestore,
  reviewLeaveInFirestore,
  fetchComplaints,
  submitComplaintInFirestore,
  updateComplaintInFirestore,
  fetchFees,
  recordPaymentInFirestore,
  fetchNotices,
  publishNoticeInFirestore,
  subscribeToNotices,
  fetchCertificates,
  uploadCertificateInFirestore,
  fetchFeedback,
  submitFeedbackInFirestore,
  fetchNotifications,
  addNotificationInFirestore,
  subscribeToNotifications,
  fetchDepartments,
  fetchSubjects,
  seedCollectionData
} from './firestoreService';

// Storage service
export {
  uploadFile,
  uploadAssignmentFile,
  uploadMaterialFile,
  uploadCertificateFile,
  uploadAvatar,
  getFileURL,
  deleteFile,
  listFiles
} from './storageService';
