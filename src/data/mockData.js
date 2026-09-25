// =====================================================================
// Student Hive — Initial Seed Data Store (Realistic College Dataset)
// =====================================================================

export const INITIAL_DEPARTMENTS = [
  { id: 'cse', name: 'Computer Science and Engineering', code: 'CSE', color: '#06b6d4', icon: 'Cpu', hod: 'Dr. Rajesh Sharma' },
  { id: 'mech', name: 'Mechanical Engineering', code: 'ME', color: '#f97316', icon: 'Wrench', hod: 'Dr. Anand Joshi' },
  { id: 'civil', name: 'Civil Engineering', code: 'CE', color: '#f59e0b', icon: 'Building2', hod: 'Dr. Meenakshi Sundaram' },
  { id: 'eee', name: 'Electrical & Electronics Engineering', code: 'EEE', color: '#8b5cf6', icon: 'Zap', hod: 'Dr. K. N. Rao' },
  { id: 'mme', name: 'Metallurgical & Materials Engineering', code: 'MME', color: '#10b981', icon: 'Layers', hod: 'Dr. Sunita Deshmukh' }
];

export const INITIAL_SUBJECTS = [
  { id: 'FSD', code: 'CS501', name: 'Full Stack Development', deptId: 'cse', semester: 5, credits: 4, facultyId: 'FAC-CSE-001', facultyName: 'Dr. Rajesh Sharma' },
  { id: 'DBMS', code: 'CS502', name: 'Database Management Systems', deptId: 'cse', semester: 5, credits: 4, facultyId: 'FAC-CSE-001', facultyName: 'Dr. Rajesh Sharma' },
  { id: 'JAVA', code: 'CS503', name: 'Advanced Java Programming', deptId: 'cse', semester: 5, credits: 3, facultyId: 'FAC-CSE-002', facultyName: 'Prof. Ananya Roy' },
  { id: 'MATHS', code: 'CS504', name: 'Discrete Mathematics & Graph Theory', deptId: 'cse', semester: 5, credits: 3, facultyId: 'FAC-CSE-003', facultyName: 'Dr. Vikramaditya Rao' }
];

export const INITIAL_STUDENTS = [
  {
    uid: 'stu-001',
    publicId: 'SH-7F29K4',
    usn: '1XX23CS001',
    name: 'Anas Aqsa',
    email: 'anas.aqsa@student.college.edu',
    phone: '+91 98765 43210',
    department: 'Computer Science and Engineering',
    deptId: 'cse',
    year: 3,
    semester: 5,
    section: 'A',
    role: 'student',
    cgpa: 8.9,
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
    admissionYear: 2023,
    bloodGroup: 'O+'
  },
  {
    uid: 'stu-002',
    publicId: 'SH-8A41P9',
    usn: '1XX23CS002',
    name: 'Rahul Verma',
    email: 'rahul.v@student.college.edu',
    phone: '+91 98765 12345',
    department: 'Computer Science and Engineering',
    deptId: 'cse',
    year: 3,
    semester: 5,
    section: 'A',
    role: 'student',
    cgpa: 7.4,
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?w=150&auto=format&fit=crop&q=80',
    admissionYear: 2023,
    bloodGroup: 'B+'
  },
  {
    uid: 'stu-003',
    publicId: 'SH-3M92C7',
    usn: '1XX23CS003',
    name: 'Priya Nair',
    email: 'priya.nair@student.college.edu',
    phone: '+91 98765 67890',
    department: 'Computer Science and Engineering',
    deptId: 'cse',
    year: 3,
    semester: 5,
    section: 'A',
    role: 'student',
    cgpa: 9.2,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    admissionYear: 2023,
    bloodGroup: 'A+'
  }
];

export const INITIAL_FACULTY = [
  {
    uid: 'fac-001',
    facultyId: 'FAC-CSE-001',
    name: 'Dr. Rajesh Sharma',
    email: 'r.sharma@college.edu',
    phone: '+91 94480 11223',
    department: 'Computer Science and Engineering',
    deptId: 'cse',
    designation: 'Professor & Head of Department',
    role: 'faculty',
    office: 'Block 3, Room 304',
    officeHours: 'Mon & Wed: 2:00 PM – 4:00 PM',
    subjectsAssigned: ['FSD', 'DBMS'],
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80'
  },
  {
    uid: 'fac-002',
    facultyId: 'FAC-CSE-002',
    name: 'Prof. Ananya Roy',
    email: 'ananya.roy@college.edu',
    phone: '+91 94480 44556',
    department: 'Computer Science and Engineering',
    deptId: 'cse',
    designation: 'Assistant Professor',
    role: 'faculty',
    office: 'Block 3, Room 310',
    officeHours: 'Tue & Thu: 10:00 AM – 12:00 PM',
    subjectsAssigned: ['JAVA'],
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  }
];

export const INITIAL_ADMIN = {
  uid: 'adm-001',
  adminId: 'ADM-001',
  name: 'Dr. S. Ramanathan',
  email: 'dean.academic@college.edu',
  role: 'admin',
  designation: 'Dean of Academic Affairs',
  office: 'Administrative Central Block, Room 101',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
};

// PRD Section 6: Attendance Data
export const INITIAL_ATTENDANCE_SUMMARY = {
  totalClasses: 120,
  classesAttended: 98,
  classesMissed: 22,
  percentage: 81.67,
  totalWorkingHours: 180,
  hoursAttended: 147,
  hoursPercentage: 81.67,
  subjectWise: [
    { subjectId: 'MATHS', subjectName: 'Discrete Mathematics', attended: 32, total: 40, percentage: 80.0, faculty: 'Dr. Vikramaditya Rao' },
    { subjectId: 'DBMS', subjectName: 'Database Management Systems', attended: 35, total: 40, percentage: 87.5, faculty: 'Dr. Rajesh Sharma' },
    { subjectId: 'JAVA', subjectName: 'Advanced Java Programming', attended: 28, total: 35, percentage: 80.0, faculty: 'Prof. Ananya Roy' },
    { subjectId: 'FSD', subjectName: 'Full Stack Development', attended: 25, total: 30, percentage: 83.3, faculty: 'Dr. Rajesh Sharma' }
  ]
};

// Roster attendance records for marking & warnings
export const INITIAL_ATTENDANCE_ROSTER = [
  { studentUid: 'stu-001', studentName: 'Mohammed Ayaz', usn: '1XX23CS001', attended: 25, total: 30, percentage: 83.3, status: 'normal' },
  { studentUid: 'stu-002', studentName: 'Rahul Verma', usn: '1XX23CS002', attended: 21, total: 30, percentage: 70.0, status: 'warning', warningSent: false },
  { studentUid: 'stu-003', studentName: 'Priya Nair', usn: '1XX23CS003', attended: 29, total: 30, percentage: 96.6, status: 'normal' }
];

// PRD Section 7: Marks Management
export const INITIAL_MARKS = [
  {
    subjectId: 'FSD',
    subjectName: 'Full Stack Development',
    code: 'CS501',
    internalMarks: 38,
    maxInternal: 40,
    activityMarks: 9,
    maxActivity: 10,
    assignmentMarks: 18,
    maxAssignment: 20,
    practicalMarks: 28,
    maxPractical: 30,
    totalScored: 65,
    maxTotal: 70,
    grade: 'A+'
  },
  {
    subjectId: 'DBMS',
    subjectName: 'Database Management Systems',
    code: 'CS502',
    internalMarks: 36,
    maxInternal: 40,
    activityMarks: 9,
    maxActivity: 10,
    assignmentMarks: 17,
    maxAssignment: 20,
    practicalMarks: 26,
    maxPractical: 30,
    totalScored: 62,
    maxTotal: 70,
    grade: 'A'
  },
  {
    subjectId: 'JAVA',
    subjectName: 'Advanced Java Programming',
    code: 'CS503',
    internalMarks: 37,
    maxInternal: 40,
    activityMarks: 8,
    maxActivity: 10,
    assignmentMarks: 19,
    maxAssignment: 20,
    practicalMarks: 29,
    maxPractical: 30,
    totalScored: 64,
    maxTotal: 70,
    grade: 'A+'
  },
  {
    subjectId: 'MATHS',
    subjectName: 'Discrete Mathematics',
    code: 'CS504',
    internalMarks: 34,
    maxInternal: 40,
    activityMarks: 8,
    maxActivity: 10,
    assignmentMarks: 17,
    maxAssignment: 20,
    practicalMarks: 0,
    maxPractical: 0,
    totalScored: 59,
    maxTotal: 70,
    grade: 'B+'
  }
];

// PRD Section 8: Assignments
export const INITIAL_ASSIGNMENTS = [
  {
    id: 'asg-001',
    title: 'Modern React Architecture & Custom Hooks',
    description: 'Implement a stateful dashboard widget demonstrating useReducer, useMemo, and custom hooks with simulated async API calls.',
    subjectId: 'FSD',
    subjectName: 'Full Stack Development',
    deadline: '2026-09-25T23:59:00',
    maxMarks: 20,
    status: 'pending', // pending, submitted, late, graded
    facultyName: 'Dr. Rajesh Sharma',
    attachmentName: 'Assignment_1_React_Specs.pdf',
    submission: null
  },
  {
    id: 'asg-002',
    title: 'Relational Schema Normalization (3NF & BCNF)',
    description: 'Decompose the provided unnormalized hospital management relation into Boyce-Codd Normal Form with minimal functional dependency loss.',
    subjectId: 'DBMS',
    subjectName: 'Database Management Systems',
    deadline: '2026-09-27T17:00:00',
    maxMarks: 20,
    status: 'pending',
    facultyName: 'Dr. Rajesh Sharma',
    attachmentName: 'DBMS_Lab_Normalization_Case.pdf',
    submission: null
  },
  {
    id: 'asg-003',
    title: 'Multithreaded Client-Server Socket Protocol',
    description: 'Build a concurrent TCP chat server handling thread pooling, message broadcasts, and safe socket shutdown.',
    subjectId: 'JAVA',
    subjectName: 'Advanced Java Programming',
    deadline: '2026-09-20T23:59:00',
    maxMarks: 20,
    status: 'submitted',
    marksAwarded: 19,
    facultyFeedback: 'Excellent implementation of thread pooling and clean exception handling.',
    facultyName: 'Prof. Ananya Roy',
    submission: {
      fileName: 'Ayaz_1XX23CS001_Java_Sockets.zip',
      fileSize: '2.4 MB',
      submittedAt: '2026-09-19T21:40:00',
      comments: 'Handled edge cases for unexpected client disconnects.'
    }
  },
  {
    id: 'asg-004',
    title: 'Graph Planarity & Dijkstra Optimization',
    description: 'Implement shortest path routing and prove Kuratowski theorem conditions for non-planar graphs.',
    subjectId: 'MATHS',
    subjectName: 'Discrete Mathematics',
    deadline: '2026-09-15T18:00:00',
    maxMarks: 20,
    status: 'late',
    marksAwarded: 16,
    facultyFeedback: 'Submitted 12 hours late; 2 marks deducted per rubric policy.',
    facultyName: 'Dr. Vikramaditya Rao',
    submission: {
      fileName: 'Ayaz_Discrete_Maths_Graph_Report.pdf',
      fileSize: '1.8 MB',
      submittedAt: '2026-09-16T06:15:00',
      comments: 'Apologies for the slight delay due to lab power outage.'
    }
  }
];

// PRD Section 9: Notes & Study Materials Hierarchy
export const INITIAL_MATERIALS = [
  {
    id: 'mat-001',
    deptId: 'cse',
    semester: 5,
    subjectId: 'FSD',
    subjectName: 'Full Stack Development',
    topic: 'React',
    title: 'React 18 Architecture & Hooks In-Depth Guide',
    fileType: 'PDF',
    size: '4.2 MB',
    downloads: 142,
    uploadedBy: 'Dr. Rajesh Sharma',
    uploadDate: '2026-09-10'
  },
  {
    id: 'mat-002',
    deptId: 'cse',
    semester: 5,
    subjectId: 'FSD',
    subjectName: 'Full Stack Development',
    topic: 'Node.js',
    title: 'Express.js RESTful API & Authentication Middleware',
    fileType: 'PPTX',
    size: '8.1 MB',
    downloads: 98,
    uploadedBy: 'Dr. Rajesh Sharma',
    uploadDate: '2026-09-14'
  },
  {
    id: 'mat-003',
    deptId: 'cse',
    semester: 5,
    subjectId: 'FSD',
    subjectName: 'Full Stack Development',
    topic: 'Firebase',
    title: 'Firestore Data Modeling & Realtime Listeners',
    fileType: 'PDF',
    size: '3.6 MB',
    downloads: 110,
    uploadedBy: 'Dr. Rajesh Sharma',
    uploadDate: '2026-09-18'
  },
  {
    id: 'mat-004',
    deptId: 'cse',
    semester: 5,
    subjectId: 'DBMS',
    subjectName: 'Database Management Systems',
    topic: 'Indexing & B-Trees',
    title: 'B+ Tree Structure, Node Splitting & Disk I/O Costs',
    fileType: 'PDF',
    size: '5.4 MB',
    downloads: 165,
    uploadedBy: 'Dr. Rajesh Sharma',
    uploadDate: '2026-09-08'
  },
  {
    id: 'mat-005',
    deptId: 'cse',
    semester: 5,
    subjectId: 'JAVA',
    subjectName: 'Advanced Java Programming',
    topic: 'Concurrency',
    title: 'Java Concurrency Utilities, Locks & Atomic Primitives',
    fileType: 'DOCX',
    size: '2.1 MB',
    downloads: 87,
    uploadedBy: 'Prof. Ananya Roy',
    uploadDate: '2026-09-12'
  }
];

// PRD Section 10: Ask a Question (Academic Q&A)
export const INITIAL_QUESTIONS = [
  {
    id: 'q-001',
    subjectId: 'FSD',
    subjectName: 'Full Stack Development',
    topic: 'React Hooks',
    studentName: 'Mohammed Ayaz',
    publicId: 'SH-7F29K4',
    question: "I don't completely understand when useReducer is strictly necessary compared to useState. Can someone explain with a realistic campus scenario?",
    createdAt: '2026-09-22T14:30:00',
    status: 'resolved',
    answer: {
      facultyName: 'Dr. Rajesh Sharma',
      text: 'Great question Ayaz! Use useState when you have 1-2 independent state variables (like a modal toggle or text input). Use useReducer when state transitions depend on previous state and involve multiple sub-values (e.g. attendance marking with present/absent/late toggles and batch recalculations).',
      answeredAt: '2026-09-22T16:15:00'
    }
  },
  {
    id: 'q-002',
    subjectId: 'DBMS',
    subjectName: 'Database Management Systems',
    topic: 'Normalization',
    studentName: 'Priya Nair',
    publicId: 'SH-3M92C7',
    question: 'How do we identify whether a decomposition is dependency-preserving when moving from 3NF to BCNF?',
    createdAt: '2026-09-23T11:00:00',
    status: 'resolved',
    answer: {
      facultyName: 'Dr. Rajesh Sharma',
      text: 'Calculate the projection of functional dependencies F on each decomposed relation Ri. If the closure of the union of all projections equals F+, the decomposition preserves dependencies.',
      answeredAt: '2026-09-23T15:20:00'
    }
  },
  {
    id: 'q-003',
    subjectId: 'JAVA',
    subjectName: 'Advanced Java Programming',
    topic: 'Executors',
    studentName: 'Mohammed Ayaz',
    publicId: 'SH-7F29K4',
    question: 'What is the risk of using Executors.newCachedThreadPool() in high-throughput microservices?',
    createdAt: '2026-09-24T09:45:00',
    status: 'open',
    answer: null
  }
];

// PRD Section 11: Syllabus Progress
export const INITIAL_SYLLABUS = [
  {
    subjectId: 'FSD',
    subjectName: 'Full Stack Development',
    overallProgress: 65,
    modules: [
      { id: 'fsd-1', title: 'Unit 1: Modern Web Foundations & HTML5/CSS3', completed: true },
      { id: 'fsd-2', title: 'Unit 2: JavaScript ES6+, Asynchronous Event Loop & Promises', completed: true },
      { id: 'fsd-3', title: 'Unit 3: React 18 Component Architecture & Hooks', completed: true },
      { id: 'fsd-4', title: 'Unit 4: Server-Side Logic with Node.js & Express APIs', completed: true },
      { id: 'fsd-5', title: 'Unit 5: Firebase Cloud Firestore & Authentication', completed: false },
      { id: 'fsd-6', title: 'Unit 6: Production Deployment, CI/CD & PWA Optimization', completed: false }
    ]
  },
  {
    subjectId: 'DBMS',
    subjectName: 'Database Management Systems',
    overallProgress: 75,
    modules: [
      { id: 'db-1', title: 'Unit 1: ER Modeling & Relational Algebra', completed: true },
      { id: 'db-2', title: 'Unit 2: SQL Advanced Queries & Stored Procedures', completed: true },
      { id: 'db-3', title: 'Unit 3: Normalization 1NF to BCNF', completed: true },
      { id: 'db-4', title: 'Unit 4: Transaction Management & ACID Properties', completed: true },
      { id: 'db-5', title: 'Unit 5: Concurrency Control & Deadlock Resolution', completed: false },
      { id: 'db-6', title: 'Unit 6: Distributed Databases & NoSQL Fundamentals', completed: false }
    ]
  }
];

// PRD Section 12 & 13: Timetable & Reschedule Alerts
export const INITIAL_TIMETABLE = {
  days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
  slots: [
    { time: '09:00 - 10:00', Mon: 'FSD (Room 204)', Tue: 'DBMS (Room 301)', Wed: 'JAVA (Lab 2)', Thu: 'MATHS (Room 204)', Fri: 'FSD (Room 204)' },
    { time: '10:00 - 11:00', Mon: 'JAVA (Lab 2)', Tue: 'FSD (Room 204)', Wed: 'DBMS (Room 301)', Thu: 'JAVA (Lab 2)', Fri: 'DBMS (Room 301)' },
    { time: '11:15 - 12:15', Mon: 'MATHS (Room 204)', Tue: 'JAVA (Lab 2)', Wed: 'FSD (Lab 3)', Thu: 'DBMS (Room 301)', Fri: 'MATHS (Room 204)' },
    { time: '01:15 - 02:15', Mon: 'DBMS Lab (Lab 1)', Tue: 'FSD Lab (Lab 3)', Wed: 'Sports / Library', Thu: 'FSD Lab (Lab 3)', Fri: 'Mini-Project' },
    { time: '02:15 - 03:15', Mon: 'DBMS Lab (Lab 1)', Tue: 'FSD Lab (Lab 3)', Wed: 'Seminar', Thu: 'FSD Lab (Lab 3)', Fri: 'Mini-Project' }
  ]
};

export const INITIAL_RESCHEDULE_ALERTS = [
  {
    id: 'resch-001',
    subject: 'Full Stack Development (FSD)',
    faculty: 'Dr. Rajesh Sharma',
    originalTime: '10:00 AM, Room 204',
    newTime: '2:00 PM, Lab 3',
    reason: 'Server configuration demonstration requiring high-spec workstations',
    date: '2026-09-24',
    read: false
  }
];

// PRD Section 14: Leave Requests
export const INITIAL_LEAVES = [
  {
    id: 'leave-001',
    studentUid: 'stu-001',
    studentName: 'Mohammed Ayaz',
    usn: '1XX23CS001',
    type: 'Medical',
    fromDate: '2026-09-26',
    toDate: '2026-09-27',
    reason: 'Severe viral flu and medical rest advised by physician.',
    attachment: 'Medical_Certificate_Prescription.pdf',
    status: 'Pending', // Pending, Approved, Rejected
    submittedAt: '2026-09-24T08:30:00',
    reviewedBy: null
  },
  {
    id: 'leave-002',
    studentUid: 'stu-001',
    studentName: 'Mohammed Ayaz',
    usn: '1XX23CS001',
    type: 'Casual',
    fromDate: '2026-09-02',
    toDate: '2026-09-03',
    reason: 'Family wedding out of station.',
    attachment: null,
    status: 'Approved',
    submittedAt: '2026-08-30T10:00:00',
    reviewedBy: 'Dr. Rajesh Sharma'
  }
];

// PRD Section 15: Complaints Box
export const INITIAL_COMPLAINTS = [
  {
    id: 'cmp-001',
    publicTrackingId: 'CMP-2026-784',
    category: 'Laboratory',
    subject: 'Faulty Ethernet switches in Lab 3 Workstations 14 to 20',
    description: 'During practical exams, workstations 14 to 20 intermittently drop network connectivity, causing session disconnects.',
    isAnonymous: true,
    anonymousHash: 'anon_b7f920da8e41',
    status: 'In Progress', // Submitted, Under Review, In Progress, Resolved
    submittedAt: '2026-09-21T11:20:00',
    adminNotes: 'IT Network engineer assigned to replace 24-port switch on Friday.'
  },
  {
    id: 'cmp-002',
    publicTrackingId: 'CMP-2026-641',
    category: 'Library',
    subject: 'Shortage of Silberschatz Operating Systems textbooks in reference section',
    description: 'Only 2 copies are available for 180 third-year students preparing for upcoming midterms.',
    isAnonymous: false,
    studentName: 'Mohammed Ayaz',
    usn: '1XX23CS001',
    status: 'Under Review',
    submittedAt: '2026-09-23T15:40:00',
    adminNotes: 'Procurement indent submitted to Central Library committee.'
  }
];

// PRD Section 16: Library Activity
export const INITIAL_LIBRARY_BOOKS = [
  {
    id: 'lib-001',
    title: 'Operating System Concepts (10th Edition)',
    author: 'Abraham Silberschatz, Peter B. Galvin',
    isbn: '978-1119456339',
    issuedDate: '2026-09-10',
    dueDate: '2026-09-25',
    daysRemaining: 1,
    status: 'due-soon', // active, due-soon, overdue, returned
    fineAmount: 0
  },
  {
    id: 'lib-002',
    title: 'Clean Code: A Handbook of Agile Software Craftsmanship',
    author: 'Robert C. Martin',
    isbn: '978-0132350884',
    issuedDate: '2026-09-15',
    dueDate: '2026-10-05',
    daysRemaining: 11,
    status: 'active',
    fineAmount: 0
  }
];

// PRD Section 17: Fees
export const INITIAL_FEES = {
  tuitionTotal: 50000,
  tuitionPaid: 35000,
  tuitionRemaining: 15000,
  examFeeTotal: 2500,
  examFeePaid: 2500,
  examFeeRemaining: 0,
  libraryDeposit: 2000,
  paymentsHistory: [
    { receiptNo: 'REC-2026-9041', date: '2026-08-01', amount: 35000, category: 'Semester 5 Tuition (Installment 1)', mode: 'Online Banking', status: 'Success' },
    { receiptNo: 'REC-2026-7712', date: '2026-08-15', amount: 2500, category: 'Semester 5 University Exam Fee', mode: 'UPI', status: 'Success' }
  ]
};

// PRD Section 19: Notices
export const INITIAL_NOTICES = [
  {
    id: 'not-001',
    title: 'Semester Examination Timetable Released',
    body: 'The tentative schedule for 5th & 6th Semester theory examinations has been published on the student portal. Review dates and report clashing electives by Oct 5th.',
    publishedBy: 'Dr. S. Ramanathan (Dean Academic)',
    date: '2026-09-24',
    urgency: 'high',
    category: 'Examination'
  },
  {
    id: 'not-002',
    title: 'Inter-College Hackathon — HackHive 2026',
    body: 'Registrations are open for the annual 36-hour hackathon. Cash prize pool of ₹1,50,000. Team formation deadline is September 30th.',
    publishedBy: 'Department of Computer Science',
    date: '2026-09-22',
    urgency: 'normal',
    category: 'Event'
  },
  {
    id: 'not-003',
    title: 'College Closed on October 2nd for Gandhi Jayanti',
    body: 'All academic classes, laboratories, and administrative offices will remain closed on Wednesday, October 2nd, 2026.',
    publishedBy: 'Registrar Office',
    date: '2026-09-20',
    urgency: 'normal',
    category: 'Holiday'
  }
];

// PRD Section 20: Campus Map Nodes
export const INITIAL_CAMPUS_LOCATIONS = [
  { id: 'loc-1', name: 'Administrative Central Block', category: 'Administration', x: 28, y: 35, info: 'Dean Office, Admissions, Registrar, Student Accounts & Fee Counter' },
  { id: 'loc-2', name: 'Computer Science Department', category: 'Departments', x: 55, y: 25, info: 'CS Classrooms, HOD Cabin, Seminar Hall 1, Server Room' },
  { id: 'loc-3', name: 'Central Computing Lab & Lab 3', category: 'Labs', x: 72, y: 30, info: '120 Workstations, FSD Lab, Cloud Infrastructure Lab' },
  { id: 'loc-4', name: 'Dr. APJ Abdul Kalam Central Library', category: 'Library', x: 42, y: 60, info: '2 Floors, Digital E-Library, 40,000+ Volumes, Quiet Study Zone' },
  { id: 'loc-5', name: 'Campus Cafeteria & Food Court', category: 'Canteen', x: 20, y: 70, info: 'Hot Meals, Healthy Juices, Snacks, Student Lounge' },
  { id: 'loc-6', name: 'Emergency Health & Medical Unit', category: 'Medical', x: 15, y: 45, info: '24/7 Resident Physician, First Aid, Ambulance Bay' },
  { id: 'loc-7', name: 'Mechanical & Civil Engineering Block', category: 'Departments', x: 78, y: 65, info: 'Workshops, CAD/CAM Lab, Strength of Materials Facility' },
  { id: 'loc-8', name: 'Sports Complex & Pavilion', category: 'Sports', x: 65, y: 82, info: 'Football Ground, Indoor Badminton Courts, Gym' }
];

// PRD Section 21: Contacts Directory
export const INITIAL_CONTACTS = [
  { id: 'cnt-1', name: 'Dr. Rajesh Sharma', role: 'HOD, Computer Science', email: 'r.sharma@college.edu', phone: '+91 94480 11223', office: 'Block 3, Room 304' },
  { id: 'cnt-2', name: 'Prof. Ananya Roy', role: 'Assistant Professor, CSE', email: 'ananya.roy@college.edu', phone: '+91 94480 44556', office: 'Block 3, Room 310' },
  { id: 'cnt-3', name: 'Dr. S. Ramanathan', role: 'Dean of Academic Affairs', email: 'dean.academic@college.edu', phone: '+91 94480 99001', office: 'Admin Block, Room 101' },
  { id: 'cnt-4', name: 'Campus Medical Officer', role: 'Healthcare Incharge', email: 'medical@college.edu', phone: '+91 94480 00108', office: 'Health Center' },
  { id: 'cnt-5', name: 'Security & Lost-Found Desk', role: 'Chief Security Officer', email: 'security@college.edu', phone: '+91 94480 77700', office: 'Main Gate Gatehouse' }
];

// PRD Section 24: Events
export const INITIAL_EVENTS = [
  { id: 'ev-1', title: 'Inter-Department Football Tournament', date: '28 September 2026', time: '04:00 PM', venue: 'University Sports Ground', category: 'Sports', icon: 'Trophy' },
  { id: 'ev-2', title: 'Guest Lecture: Scalable Microservices with Go & Kafka', date: '02 October 2026', time: '11:00 AM', venue: 'Sir MV Auditorium', category: 'Academic', icon: 'Mic' },
  { id: 'ev-3', title: 'Tarang 2026 — Annual Cultural Festival', date: '10 October 2026', time: '05:00 PM', venue: 'Open Air Amphitheatre', category: 'Cultural', icon: 'Sparkles' },
  { id: 'ev-4', title: 'Coding Club Meetup: System Design Deep Dive', date: '15 October 2026', time: '03:30 PM', venue: 'Lab 3', category: 'Technical', icon: 'Code' }
];

// PRD Section 25: Lost & Found
export const INITIAL_LOST_FOUND = [
  { id: 'lf-1', type: 'LOST', title: 'Black Leather Wallet with ID Card', location: 'Central Library 1st Floor', date: '2026-09-23', status: 'Active', postedBy: 'Mohammed Ayaz (SH-7F29K4)' },
  { id: 'lf-2', type: 'FOUND', title: 'Blue Spiral Notebook (DBMS Unit 3 Notes)', location: 'Lab 3, Desk 12', date: '2026-09-24', status: 'Active', postedBy: 'Lab Assistant Ramesh' }
];

// PRD Section 26: Alumni Directory
export const INITIAL_ALUMNI = [
  { id: 'alm-1', name: 'Aakash Verma', gradYear: 2023, department: 'Computer Science', company: 'Google', role: 'Software Engineer II', linkedin: 'https://linkedin.com', location: 'Bengaluru, India' },
  { id: 'alm-2', name: 'Sneha Patel', gradYear: 2022, department: 'Computer Science', company: 'Microsoft', role: 'Cloud Solutions Architect', linkedin: 'https://linkedin.com', location: 'Hyderabad, India' },
  { id: 'alm-3', name: 'Rohit Kulkarni', gradYear: 2021, department: 'Mechanical', company: 'Tesla', role: 'Mechanical Systems Engineer', linkedin: 'https://linkedin.com', location: 'Fremont, CA' }
];

// PRD Section 27: Daily Quotes & Tips
export const INITIAL_QUOTES = [
  { quote: 'The secret of getting ahead is getting started.', author: 'Mark Twain', tip: 'Tip: 25 minutes of focused Pomodoro study beats 3 hours of distracted reading.' },
  { quote: 'Success is the sum of small efforts, repeated day in and day out.', author: 'Robert Collier', tip: 'Tip: Review your lecture slides within 24 hours to boost memory retention by 80%.' }
];

// PRD Section 28: Exam Countdown Target
export const EXAM_TARGET_DATE = '2026-10-26T09:30:00';

// PRD Section 29: First-Day Checklist
export const INITIAL_CHECKLIST = [
  { id: 'chk-1', text: 'Visit Admission Office & Complete Bio-Verification', done: true },
  { id: 'chk-2', text: 'Collect Official Student Smart ID Card', done: true },
  { id: 'chk-3', text: 'Verify Department & Section Allocation (CSE - Sec A)', done: true },
  { id: 'chk-4', text: 'Meet Class Coordinator (Dr. Rajesh Sharma)', done: true },
  { id: 'chk-5', text: 'Visit Central Library & Activate Borrowing Card', done: true },
  { id: 'chk-6', text: 'Activate Student Hive Digital Account', done: true },
  { id: 'chk-7', text: 'Collect Academic Timetable & Syllabus Copy', done: true },
  { id: 'chk-8', text: 'Join Section WhatsApp & Hive Study Channels', done: false }
];

// PRD Section 30: Certificate Wallet
export const INITIAL_CERTIFICATES = [
  { id: 'cert-1', title: 'National Smart India Hackathon Finalist', issuer: 'Ministry of Education, Govt of India', date: '2026-03-15', category: 'Hackathon', fileName: 'SIH_2026_Finalist_Ayaz.pdf' },
  { id: 'cert-2', title: 'Cloud & Kubernetes Workshop Certificate', issuer: 'Google Developer Student Clubs', date: '2026-06-20', category: 'Workshop', fileName: 'GDSC_Cloud_Architect.pdf' },
  { id: 'cert-3', title: 'Inter-College Football Tournament Runners Up', issuer: 'State University Athletic Association', date: '2025-11-10', category: 'Sports', fileName: 'State_Athletics_Silver.pdf' }
];

// PRD Section 31: Faculty Feedback
export const INITIAL_FEEDBACK_QUESTIONS = [
  { id: 'f-1', label: 'Teaching Clarity & Explanation of Complex Topics' },
  { id: 'f-2', label: 'Communication, Approachability & Student Interaction' },
  { id: 'f-3', label: 'In-Depth Subject Knowledge & Real-World Examples' },
  { id: 'f-4', label: 'Course Organization, Punctuality & Lab Guidance' }
];
