// =====================================================================
// Student Hive — Data Context (Dual-Mode: Firebase Live + Local Mock)
// =====================================================================
// Provides all application data and CRUD actions.
// In LIVE mode: reads/writes to Firestore with real-time subscriptions.
// In DEMO mode: uses localStorage with mock data (offline development).

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { isLiveFirebaseMode } from '../firebase/config';
import { useAuth } from './AuthContext';
import {
  // Firestore operations
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
  subscribeToNotifications,
  addNotificationInFirestore,
  fetchDepartments,
  fetchSubjects,
  subscribeToCollection
} from '../firebase/firestoreService';
import {
  INITIAL_DEPARTMENTS,
  INITIAL_SUBJECTS,
  INITIAL_STUDENTS,
  INITIAL_FACULTY,
  INITIAL_ADMIN,
  INITIAL_ATTENDANCE_SUMMARY,
  INITIAL_ATTENDANCE_ROSTER,
  INITIAL_MARKS,
  INITIAL_ASSIGNMENTS,
  INITIAL_MATERIALS,
  INITIAL_QUESTIONS,
  INITIAL_SYLLABUS,
  INITIAL_TIMETABLE,
  INITIAL_RESCHEDULE_ALERTS,
  INITIAL_LEAVES,
  INITIAL_COMPLAINTS,
  INITIAL_LIBRARY_BOOKS,
  INITIAL_FEES,
  INITIAL_NOTICES,
  INITIAL_CAMPUS_LOCATIONS,
  INITIAL_CONTACTS,
  INITIAL_EVENTS,
  INITIAL_LOST_FOUND,
  INITIAL_ALUMNI,
  INITIAL_QUOTES,
  INITIAL_CHECKLIST,
  INITIAL_CERTIFICATES,
  EXAM_TARGET_DATE
} from '../data/mockData';

const DataContext = createContext(null);
const STORAGE_KEY = 'student_hive_data_v1';

// ═════════════════════════════════════════════════════════════════════════════
// LOCAL DEMO DATA PROVIDER (existing localStorage-based logic)
// ═════════════════════════════════════════════════════════════════════════════

function LocalDataProvider({ children }) {
  const [data, setData] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved data from localStorage:', e);
    }
    return {
      departments: INITIAL_DEPARTMENTS,
      subjects: INITIAL_SUBJECTS,
      students: INITIAL_STUDENTS,
      faculty: INITIAL_FACULTY,
      admin: INITIAL_ADMIN,
      attendanceSummary: INITIAL_ATTENDANCE_SUMMARY,
      attendanceRoster: INITIAL_ATTENDANCE_ROSTER,
      marks: INITIAL_MARKS,
      assignments: INITIAL_ASSIGNMENTS,
      materials: INITIAL_MATERIALS,
      questions: INITIAL_QUESTIONS,
      syllabus: INITIAL_SYLLABUS,
      timetable: INITIAL_TIMETABLE,
      rescheduleAlerts: INITIAL_RESCHEDULE_ALERTS,
      leaves: INITIAL_LEAVES,
      complaints: INITIAL_COMPLAINTS,
      library: INITIAL_LIBRARY_BOOKS,
      fees: INITIAL_FEES,
      notices: INITIAL_NOTICES,
      campusLocations: INITIAL_CAMPUS_LOCATIONS,
      contacts: INITIAL_CONTACTS,
      events: INITIAL_EVENTS,
      lostFound: INITIAL_LOST_FOUND,
      alumni: INITIAL_ALUMNI,
      quotes: INITIAL_QUOTES,
      checklist: INITIAL_CHECKLIST,
      certificates: INITIAL_CERTIFICATES,
      feedbackList: [],
      notifications: [
        {
          id: 'notif-1', type: 'reschedule',
          title: 'Class Rescheduled: Full Stack Development (FSD)',
          message: 'FSD has been moved from 10:00 AM, Room 204 → 2:00 PM, Lab 3.',
          date: '2026-09-24T10:00:00', read: false
        },
        {
          id: 'notif-2', type: 'assignment',
          title: 'Assignment Due Tomorrow',
          message: 'Modern React Architecture & Custom Hooks is due on Sep 25, 23:59.',
          date: '2026-09-24T08:00:00', read: false
        }
      ]
    };
  });

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch (e) {
      console.warn('Failed to save data to localStorage:', e);
    }
  }, [data]);

  const resetAllData = () => { localStorage.removeItem(STORAGE_KEY); window.location.reload(); };

  // --- ATTENDANCE ACTIONS ---
  const markAttendance = (studentUid, subjectId, date, status, hours = 1) => {
    setData((prev) => {
      const updatedRoster = prev.attendanceRoster.map((item) => {
        if (item.studentUid === studentUid) {
          const newAttended = status === 'present' ? item.attended + 1 : item.attended;
          const newTotal = item.total + 1;
          const newPercentage = parseFloat(((newAttended / newTotal) * 100).toFixed(1));
          return { ...item, attended: newAttended, total: newTotal, percentage: newPercentage, status: newPercentage < 75 ? 'warning' : 'normal' };
        }
        return item;
      });
      return { ...prev, attendanceRoster: updatedRoster };
    });
  };

  const sendAttendanceWarning = (studentUid, customMessage) => {
    setData((prev) => {
      const student = prev.students.find((s) => s.uid === studentUid) || { name: 'Student' };
      const updatedRoster = prev.attendanceRoster.map((item) => {
        if (item.studentUid === studentUid) return { ...item, warningSent: true };
        return item;
      });
      const newNotif = {
        id: `warn-${Date.now()}`, type: 'warning', title: '⚠️ Attendance Warning Alert',
        message: customMessage || `Official Notice sent to ${student.name} (${student.email}): Attendance is below the mandatory 75% threshold.`,
        date: new Date().toISOString(), read: false
      };
      return { ...prev, attendanceRoster: updatedRoster, notifications: [newNotif, ...prev.notifications] };
    });
  };

  // --- MARKS ACTIONS ---
  const saveMarks = (subjectId, internalMarks, activityMarks, assignmentMarks, practicalMarks = 0) => {
    setData((prev) => {
      const updatedMarks = prev.marks.map((m) => {
        if (m.subjectId === subjectId) {
          const totalScored = internalMarks + activityMarks + assignmentMarks;
          let grade = 'B';
          if (totalScored >= 65) grade = 'A+';
          else if (totalScored >= 60) grade = 'A';
          else if (totalScored >= 50) grade = 'B+';
          return { ...m, internalMarks, activityMarks, assignmentMarks, practicalMarks, totalScored, grade };
        }
        return m;
      });
      return { ...prev, marks: updatedMarks };
    });
  };

  // --- ASSIGNMENT ACTIONS ---
  const submitAssignment = (assignmentId, fileDetails, comments) => {
    setData((prev) => {
      const updated = prev.assignments.map((asg) => {
        if (asg.id === assignmentId) {
          return {
            ...asg, status: 'submitted',
            submission: {
              fileName: fileDetails?.name || 'Assignment_Submission.pdf',
              fileSize: fileDetails?.size ? `${(fileDetails.size / 1024 / 1024).toFixed(2)} MB` : '1.8 MB',
              submittedAt: new Date().toISOString(), comments: comments || 'Submitted via Student Hive Portal.'
            }
          };
        }
        return asg;
      });
      try { confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } }); } catch (e) {}
      return { ...prev, assignments: updated };
    });
  };

  const createAssignment = (newAssignment) => {
    setData((prev) => ({
      ...prev,
      assignments: [{ ...newAssignment, id: `asg-${Date.now()}`, status: 'pending', submission: null }, ...prev.assignments]
    }));
  };

  const gradeAssignment = (assignmentId, marksAwarded, feedback) => {
    setData((prev) => {
      const updated = prev.assignments.map((asg) => {
        if (asg.id === assignmentId) return { ...asg, marksAwarded: Number(marksAwarded), facultyFeedback: feedback };
        return asg;
      });
      return { ...prev, assignments: updated };
    });
  };

  // --- QUESTIONS ---
  const askQuestion = (subjectId, topic, questionText, student) => {
    const newQ = {
      id: `q-${Date.now()}`, subjectId,
      subjectName: INITIAL_SUBJECTS.find((s) => s.id === subjectId)?.name || subjectId,
      topic, studentName: student?.name || 'Mohammed Ayaz', publicId: student?.publicId || 'SH-7F29K4',
      question: questionText, createdAt: new Date().toISOString(), status: 'open', answer: null
    };
    setData((prev) => ({ ...prev, questions: [newQ, ...prev.questions] }));
  };

  const answerQuestion = (questionId, answerText, facultyName) => {
    setData((prev) => {
      const updated = prev.questions.map((q) => {
        if (q.id === questionId) {
          return { ...q, status: 'resolved', answer: { facultyName: facultyName || 'Dr. Rajesh Sharma', text: answerText, answeredAt: new Date().toISOString() } };
        }
        return q;
      });
      return { ...prev, questions: updated };
    });
  };

  const toggleQuestionResolved = (questionId) => {
    setData((prev) => {
      const updated = prev.questions.map((q) => {
        if (q.id === questionId) return { ...q, status: q.status === 'resolved' ? 'open' : 'resolved' };
        return q;
      });
      return { ...prev, questions: updated };
    });
  };

  // --- SYLLABUS ---
  const toggleSyllabusTopic = (subjectId, topicId) => {
    setData((prev) => {
      const updated = prev.syllabus.map((s) => {
        if (s.subjectId === subjectId) {
          const updatedModules = s.modules.map((m) => {
            if (m.id === topicId) return { ...m, completed: !m.completed };
            return m;
          });
          const completedCount = updatedModules.filter((m) => m.completed).length;
          const newProgress = Math.round((completedCount / updatedModules.length) * 100);
          return { ...s, modules: updatedModules, overallProgress: newProgress };
        }
        return s;
      });
      return { ...prev, syllabus: updated };
    });
  };

  // --- TIMETABLE & RESCHEDULE ---
  const rescheduleClass = (subject, originalTime, newTime, reason, facultyName) => {
    const newAlert = {
      id: `resch-${Date.now()}`, subject, faculty: facultyName || 'Dr. Rajesh Sharma',
      originalTime, newTime, reason, date: new Date().toISOString().split('T')[0], read: false
    };
    const newNotification = {
      id: `notif-${Date.now()}`, type: 'reschedule', title: `🔔 Class Rescheduled: ${subject}`,
      message: `${subject} has been moved from ${originalTime} → ${newTime}. Reason: ${reason}`,
      date: new Date().toISOString(), read: false
    };
    setData((prev) => ({
      ...prev, rescheduleAlerts: [newAlert, ...prev.rescheduleAlerts],
      notifications: [newNotification, ...prev.notifications]
    }));
  };

  // --- LEAVE REQUESTS ---
  const submitLeave = (leaveType, fromDate, toDate, reason, student) => {
    const newLeave = {
      id: `leave-${Date.now()}`, studentUid: student?.uid || 'stu-001',
      studentName: student?.name || 'Mohammed Ayaz', usn: student?.usn || '1XX23CS001',
      type: leaveType, fromDate, toDate, reason, attachment: 'Doctor_Certificate.pdf',
      status: 'Pending', submittedAt: new Date().toISOString(), reviewedBy: null
    };
    setData((prev) => ({ ...prev, leaves: [newLeave, ...prev.leaves] }));
  };

  const reviewLeave = (leaveId, status, reviewerName) => {
    setData((prev) => {
      const updated = prev.leaves.map((l) => {
        if (l.id === leaveId) return { ...l, status, reviewedBy: reviewerName || 'Dr. Rajesh Sharma' };
        return l;
      });
      return { ...prev, leaves: updated };
    });
  };

  // --- COMPLAINTS ---
  const submitComplaint = (category, subject, description, isAnonymous, student) => {
    const randomHash = Math.random().toString(36).substring(2, 10);
    const newCmp = {
      id: `cmp-${Date.now()}`, publicTrackingId: `CMP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      category, subject, description, isAnonymous,
      anonymousHash: isAnonymous ? `anon_${randomHash}` : null,
      studentName: isAnonymous ? null : student?.name || 'Mohammed Ayaz',
      usn: isAnonymous ? null : student?.usn || '1XX23CS001',
      status: 'Submitted', submittedAt: new Date().toISOString(),
      adminNotes: 'Assigned to department coordinator for preliminary review.'
    };
    setData((prev) => ({ ...prev, complaints: [newCmp, ...prev.complaints] }));
  };

  const updateComplaintStatus = (complaintId, status, adminNotes) => {
    setData((prev) => {
      const updated = prev.complaints.map((c) => {
        if (c.id === complaintId) return { ...c, status, adminNotes: adminNotes || c.adminNotes };
        return c;
      });
      return { ...prev, complaints: updated };
    });
  };

  // --- FEES & PAYMENTS ---
  const payFee = (amount, category, paymentMode = 'UPI / NetBanking') => {
    const receiptNo = `REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPayment = {
      receiptNo, date: new Date().toISOString().split('T')[0],
      amount: Number(amount), category: category || 'Semester Tuition Dues',
      mode: paymentMode, status: 'Success'
    };
    setData((prev) => {
      const newPaid = prev.fees.tuitionPaid + Number(amount);
      const newRemaining = Math.max(0, prev.fees.tuitionRemaining - Number(amount));
      try { confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } }); } catch (e) {}
      return {
        ...prev,
        fees: { ...prev.fees, tuitionPaid: newPaid, tuitionRemaining: newRemaining, paymentsHistory: [newPayment, ...prev.fees.paymentsHistory] }
      };
    });
    return receiptNo;
  };

  // --- NOTICES ---
  const publishNotice = (title, body, category = 'General', urgency = 'normal', publishedBy) => {
    const newNotice = {
      id: `not-${Date.now()}`, title, body, category, urgency,
      publishedBy: publishedBy || 'Academic Dean', date: new Date().toISOString().split('T')[0]
    };
    setData((prev) => ({ ...prev, notices: [newNotice, ...prev.notices] }));
  };

  // --- CERTIFICATE WALLET ---
  const uploadCertificate = (title, issuer, category, fileName) => {
    const newCert = {
      id: `cert-${Date.now()}`, title, issuer, category,
      fileName: fileName || `${title.replace(/\s+/g, '_')}.pdf`,
      date: new Date().toISOString().split('T')[0]
    };
    setData((prev) => ({ ...prev, certificates: [newCert, ...prev.certificates] }));
  };

  // --- FEEDBACK ---
  const submitFeedback = (facultyId, subjectId, ratings, comments) => {
    const newFeed = {
      id: `fb-${Date.now()}`, facultyId, subjectId, ratings, comments,
      submittedAt: new Date().toISOString()
    };
    setData((prev) => ({ ...prev, feedbackList: [newFeed, ...prev.feedbackList] }));
  };

  // --- CHECKLIST ---
  const toggleChecklistItem = (id) => {
    setData((prev) => {
      const updated = prev.checklist.map((item) => {
        if (item.id === id) return { ...item, done: !item.done };
        return item;
      });
      return { ...prev, checklist: updated };
    });
  };

  // --- NOTIFICATIONS ---
  const markNotificationRead = (notifId) => {
    setData((prev) => {
      const updated = prev.notifications.map((n) => {
        if (n.id === notifId) return { ...n, read: true };
        return n;
      });
      return { ...prev, notifications: updated };
    });
  };

  const markAllNotificationsRead = () => {
    setData((prev) => ({ ...prev, notifications: prev.notifications.map((n) => ({ ...n, read: true })) }));
  };

  const value = {
    ...data,
    examTargetDate: EXAM_TARGET_DATE,
    resetAllData,
    markAttendance,
    sendAttendanceWarning,
    saveMarks,
    submitAssignment,
    createAssignment,
    gradeAssignment,
    askQuestion,
    answerQuestion,
    toggleQuestionResolved,
    toggleSyllabusTopic,
    rescheduleClass,
    submitLeave,
    reviewLeave,
    submitComplaint,
    updateComplaintStatus,
    payFee,
    publishNotice,
    uploadCertificate,
    submitFeedback,
    toggleChecklistItem,
    markNotificationRead,
    markAllNotificationsRead
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// ═════════════════════════════════════════════════════════════════════════════
// LIVE FIREBASE DATA PROVIDER (Firestore-backed with real-time subscriptions)
// ═════════════════════════════════════════════════════════════════════════════

function LiveDataProvider({ children }) {
  const { currentUser } = useAuth();

  // State mirrors for Firestore data
  const [departments, setDepartments] = useState(INITIAL_DEPARTMENTS);
  const [subjects, setSubjects] = useState(INITIAL_SUBJECTS);
  const [students, setStudents] = useState([]);
  const [faculty, setFaculty] = useState([]);
  const [attendanceRoster, setAttendanceRoster] = useState([]);
  const [attendanceSummary, setAttendanceSummary] = useState(INITIAL_ATTENDANCE_SUMMARY);
  const [marks, setMarks] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [syllabus, setSyllabus] = useState([]);
  const [timetable, setTimetable] = useState(INITIAL_TIMETABLE);
  const [rescheduleAlerts, setRescheduleAlerts] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [complaints, setComplaints] = useState([]);
  const [library, setLibrary] = useState(INITIAL_LIBRARY_BOOKS);
  const [fees, setFees] = useState(INITIAL_FEES);
  const [notices, setNotices] = useState([]);
  const [campusLocations] = useState(INITIAL_CAMPUS_LOCATIONS);
  const [contacts] = useState(INITIAL_CONTACTS);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [lostFound, setLostFound] = useState(INITIAL_LOST_FOUND);
  const [alumni] = useState(INITIAL_ALUMNI);
  const [quotes] = useState(INITIAL_QUOTES);
  const [checklist, setChecklist] = useState(INITIAL_CHECKLIST);
  const [certificates, setCertificates] = useState([]);
  const [feedbackList, setFeedbackList] = useState([]);
  const [notifications, setNotifications] = useState([]);

  // Real-time subscriptions
  useEffect(() => {
    const unsubscribers = [];

    // Subscribe to notices (real-time)
    unsubscribers.push(subscribeToNotices(setNotices));

    // Subscribe to assignments
    unsubscribers.push(subscribeToCollection('assignments', setAssignments));

    // Subscribe to questions
    unsubscribers.push(subscribeToCollection('questions', setQuestions));

    // Subscribe to complaints
    unsubscribers.push(subscribeToCollection('complaints', setComplaints));

    // Subscribe to leave requests
    unsubscribers.push(subscribeToCollection('leaveRequests', setLeaves));

    // Subscribe to materials
    unsubscribers.push(subscribeToCollection('materials', setMaterials));

    // Subscribe to reschedule alerts
    unsubscribers.push(subscribeToCollection('rescheduleAlerts', setRescheduleAlerts));

    // Subscribe to marks
    unsubscribers.push(subscribeToCollection('marks', setMarks));

    // Subscribe to certificates
    unsubscribers.push(subscribeToCollection('certificates', setCertificates));

    // Subscribe to feedback
    unsubscribers.push(subscribeToCollection('feedback', setFeedbackList));

    return () => unsubscribers.forEach(unsub => unsub && unsub());
  }, []);

  // User-specific subscriptions
  useEffect(() => {
    if (!currentUser?.uid) return;

    const unsubscribers = [];

    // Notifications for this user
    unsubscribers.push(subscribeToNotifications(currentUser.uid, setNotifications));

    // Attendance for this student
    if (currentUser.role === 'student') {
      unsubscribers.push(subscribeToAttendance(currentUser.uid, setAttendanceRoster));
    } else {
      unsubscribers.push(subscribeToAttendance(null, setAttendanceRoster));
    }

    return () => unsubscribers.forEach(unsub => unsub && unsub());
  }, [currentUser?.uid]);

  // ── Actions (write to Firestore) ───────────────────────────────────────────

  const resetAllData = () => { window.location.reload(); };

  const markAttendance = async (studentUid, subjectId, date, status, hours = 1) => {
    await markAttendanceInFirestore(studentUid, subjectId, date, status, hours);
  };

  const sendAttendanceWarning = async (studentUid, customMessage) => {
    await addNotificationInFirestore({
      userId: studentUid, type: 'warning', title: '⚠️ Attendance Warning Alert',
      message: customMessage || 'Your attendance is below the mandatory 75% threshold.',
      read: false
    });
  };

  const saveMarks_live = async (subjectId, internalMarks, activityMarks, assignmentMarks, practicalMarks = 0) => {
    const totalScored = internalMarks + activityMarks + assignmentMarks;
    let grade = 'B';
    if (totalScored >= 65) grade = 'A+';
    else if (totalScored >= 60) grade = 'A';
    else if (totalScored >= 50) grade = 'B+';

    await saveMarksInFirestore(null, {
      subjectId, internalMarks, activityMarks, assignmentMarks, practicalMarks, totalScored, grade
    });
  };

  const submitAssignment_live = async (assignmentId, fileDetails, comments) => {
    await submitAssignmentInFirestore(assignmentId, {
      fileName: fileDetails?.name || 'Assignment_Submission.pdf',
      fileSize: fileDetails?.size ? `${(fileDetails.size / 1024 / 1024).toFixed(2)} MB` : '1.8 MB',
      comments: comments || 'Submitted via Student Hive Portal.'
    });
    try { confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 } }); } catch (e) {}
  };

  const createAssignment_live = async (newAssignment) => {
    await createAssignmentInFirestore(newAssignment);
  };

  const gradeAssignment_live = async (assignmentId, marksAwarded, feedback) => {
    await gradeAssignmentInFirestore(assignmentId, marksAwarded, feedback);
  };

  const askQuestion_live = async (subjectId, topic, questionText, student) => {
    await askQuestionInFirestore({
      subjectId,
      subjectName: subjects.find((s) => s.id === subjectId)?.name || subjectId,
      topic, studentName: student?.name || 'Student', publicId: student?.publicId || '',
      question: questionText
    });
  };

  const answerQuestion_live = async (questionId, answerText, facultyName) => {
    await answerQuestionInFirestore(questionId, answerText, facultyName || 'Faculty');
  };

  const toggleQuestionResolved_live = async (questionId) => {
    const q = questions.find(q => q.id === questionId);
    if (q) {
      const { updateDocument } = await import('../firebase/firestoreService');
      await updateDocument('questions', questionId, {
        status: q.status === 'resolved' ? 'open' : 'resolved'
      });
    }
  };

  const toggleSyllabusTopic = (subjectId, topicId) => {
    // Syllabus toggle can work locally for now, or be persisted
    setSyllabus(prev => prev.map((s) => {
      if (s.subjectId === subjectId) {
        const updatedModules = s.modules.map((m) => m.id === topicId ? { ...m, completed: !m.completed } : m);
        const completedCount = updatedModules.filter((m) => m.completed).length;
        return { ...s, modules: updatedModules, overallProgress: Math.round((completedCount / updatedModules.length) * 100) };
      }
      return s;
    }));
  };

  const rescheduleClass_live = async (subject, originalTime, newTime, reason, facultyName) => {
    await rescheduleClassInFirestore({
      subject, faculty: facultyName || 'Faculty', originalTime, newTime, reason,
      date: new Date().toISOString().split('T')[0], read: false
    });
    await addNotificationInFirestore({
      userId: 'broadcast', type: 'reschedule', title: `🔔 Class Rescheduled: ${subject}`,
      message: `${subject} has been moved from ${originalTime} → ${newTime}. Reason: ${reason}`,
      read: false
    });
  };

  const submitLeave_live = async (leaveType, fromDate, toDate, reason, student) => {
    await submitLeaveInFirestore({
      studentUid: student?.uid || currentUser?.uid, studentName: student?.name || currentUser?.name,
      usn: student?.usn || '', type: leaveType, fromDate, toDate, reason,
      attachment: 'Doctor_Certificate.pdf'
    });
  };

  const reviewLeave_live = async (leaveId, status, reviewerName) => {
    await reviewLeaveInFirestore(leaveId, status, reviewerName || 'Faculty');
  };

  const submitComplaint_live = async (category, subject, description, isAnonymous, student) => {
    const randomHash = Math.random().toString(36).substring(2, 10);
    await submitComplaintInFirestore({
      publicTrackingId: `CMP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      category, subject, description, isAnonymous,
      anonymousHash: isAnonymous ? `anon_${randomHash}` : null,
      studentName: isAnonymous ? null : student?.name || currentUser?.name,
      usn: isAnonymous ? null : student?.usn || '',
      adminNotes: 'Assigned to department coordinator for preliminary review.'
    });
  };

  const updateComplaintStatus_live = async (complaintId, status, adminNotes) => {
    await updateComplaintInFirestore(complaintId, status, adminNotes);
  };

  const payFee_live = async (amount, category, paymentMode = 'UPI / NetBanking') => {
    const receiptNo = `REC-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    await recordPaymentInFirestore(currentUser?.uid || 'unknown', {
      receiptNo, date: new Date().toISOString().split('T')[0],
      amount: Number(amount), category: category || 'Semester Tuition Dues',
      mode: paymentMode, status: 'Success'
    });
    try { confetti({ particleCount: 100, spread: 80, origin: { y: 0.6 } }); } catch (e) {}
    return receiptNo;
  };

  const publishNotice_live = async (title, body, category = 'General', urgency = 'normal', publishedBy) => {
    await publishNoticeInFirestore({
      title, body, category, urgency, publishedBy: publishedBy || 'Academic Dean',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const uploadCertificate_live = async (title, issuer, category, fileName) => {
    await uploadCertificateInFirestore({
      studentUid: currentUser?.uid, title, issuer, category,
      fileName: fileName || `${title.replace(/\s+/g, '_')}.pdf`,
      date: new Date().toISOString().split('T')[0]
    });
  };

  const submitFeedback_live = async (facultyId, subjectId, ratings, comments) => {
    await submitFeedbackInFirestore({ facultyId, subjectId, ratings, comments });
  };

  const toggleChecklistItem = (id) => {
    setChecklist(prev => prev.map((item) => item.id === id ? { ...item, done: !item.done } : item));
  };

  const markNotificationRead = async (notifId) => {
    const { updateDocument } = await import('../firebase/firestoreService');
    await updateDocument('notifications', notifId, { read: true });
  };

  const markAllNotificationsRead = () => {
    notifications.forEach(async (n) => {
      if (!n.read) {
        const { updateDocument } = await import('../firebase/firestoreService');
        await updateDocument('notifications', n.id, { read: true });
      }
    });
  };

  const value = {
    departments,
    subjects,
    students,
    faculty,
    admin: INITIAL_ADMIN,
    attendanceSummary,
    attendanceRoster,
    marks,
    assignments,
    materials,
    questions,
    syllabus,
    timetable,
    rescheduleAlerts,
    leaves,
    complaints,
    library,
    fees,
    notices,
    campusLocations,
    contacts,
    events,
    lostFound,
    alumni,
    quotes,
    checklist,
    certificates,
    feedbackList,
    notifications,
    examTargetDate: EXAM_TARGET_DATE,
    resetAllData,
    markAttendance,
    sendAttendanceWarning,
    saveMarks: saveMarks_live,
    submitAssignment: submitAssignment_live,
    createAssignment: createAssignment_live,
    gradeAssignment: gradeAssignment_live,
    askQuestion: askQuestion_live,
    answerQuestion: answerQuestion_live,
    toggleQuestionResolved: toggleQuestionResolved_live,
    toggleSyllabusTopic,
    rescheduleClass: rescheduleClass_live,
    submitLeave: submitLeave_live,
    reviewLeave: reviewLeave_live,
    submitComplaint: submitComplaint_live,
    updateComplaintStatus: updateComplaintStatus_live,
    payFee: payFee_live,
    publishNotice: publishNotice_live,
    uploadCertificate: uploadCertificate_live,
    submitFeedback: submitFeedback_live,
    toggleChecklistItem,
    markNotificationRead,
    markAllNotificationsRead
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// ═════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT: Auto-selects between Live and Local providers
// ═════════════════════════════════════════════════════════════════════════════

export function DataProvider({ children }) {
  if (isLiveFirebaseMode) {
    return <LiveDataProvider>{children}</LiveDataProvider>;
  }
  return <LocalDataProvider>{children}</LocalDataProvider>;
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
