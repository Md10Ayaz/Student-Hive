// =====================================================================
// Student Hive — Firestore Data Seeder
// =====================================================================
// Run this from the browser console or create an admin button to push
// all mock data into your Firestore database (one-time setup).
//
// Usage from Admin Dashboard:
//   import { seedAllData } from '../firebase/seedData';
//   seedAllData(); // Seeds all collections

import { seedCollectionData } from './firestoreService';
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
  INITIAL_NOTICES,
  INITIAL_CAMPUS_LOCATIONS,
  INITIAL_CONTACTS,
  INITIAL_EVENTS,
  INITIAL_LOST_FOUND,
  INITIAL_ALUMNI,
  INITIAL_CERTIFICATES
} from '../data/mockData';

/**
 * Seed all mock data into Firestore.
 * Call this once from an admin panel to populate your live database.
 */
export async function seedAllData() {
  console.info('[Seed] 🌱 Starting Firestore data seed...');

  try {
    // Core collections
    await seedCollectionData('departments', INITIAL_DEPARTMENTS);
    console.info('[Seed] ✅ Departments seeded');

    await seedCollectionData('subjects', INITIAL_SUBJECTS);
    console.info('[Seed] ✅ Subjects seeded');

    // User profiles (students, faculty, admin)
    const studentUsers = INITIAL_STUDENTS.map(s => ({
      ...s,
      role: 'student',
      status: 'approved'
    }));
    await seedCollectionData('users', studentUsers);
    console.info('[Seed] ✅ Student users seeded');

    const facultyUsers = INITIAL_FACULTY.map(f => ({
      ...f,
      role: 'faculty',
      status: 'approved'
    }));
    await seedCollectionData('users', facultyUsers);
    console.info('[Seed] ✅ Faculty users seeded');

    await seedCollectionData('users', [{
      ...INITIAL_ADMIN,
      role: 'admin',
      status: 'approved'
    }]);
    console.info('[Seed] ✅ Admin user seeded');

    // Academic data
    await seedCollectionData('attendance', INITIAL_ATTENDANCE_ROSTER);
    console.info('[Seed] ✅ Attendance seeded');

    await seedCollectionData('marks', INITIAL_MARKS);
    console.info('[Seed] ✅ Marks seeded');

    await seedCollectionData('assignments', INITIAL_ASSIGNMENTS);
    console.info('[Seed] ✅ Assignments seeded');

    await seedCollectionData('materials', INITIAL_MATERIALS);
    console.info('[Seed] ✅ Materials seeded');

    await seedCollectionData('questions', INITIAL_QUESTIONS);
    console.info('[Seed] ✅ Questions seeded');

    await seedCollectionData('syllabus', INITIAL_SYLLABUS);
    console.info('[Seed] ✅ Syllabus seeded');

    await seedCollectionData('timetable', INITIAL_TIMETABLE);
    console.info('[Seed] ✅ Timetable seeded');

    // Campus & admin data
    await seedCollectionData('rescheduleAlerts', INITIAL_RESCHEDULE_ALERTS);
    await seedCollectionData('leaveRequests', INITIAL_LEAVES);
    await seedCollectionData('complaints', INITIAL_COMPLAINTS);
    await seedCollectionData('notices', INITIAL_NOTICES);
    await seedCollectionData('certificates', INITIAL_CERTIFICATES);
    console.info('[Seed] ✅ Campus data seeded (leaves, complaints, notices, certificates)');

    // Static reference data
    await seedCollectionData('library', INITIAL_LIBRARY_BOOKS);
    await seedCollectionData('campusLocations', INITIAL_CAMPUS_LOCATIONS);
    await seedCollectionData('contacts', INITIAL_CONTACTS);
    await seedCollectionData('events', INITIAL_EVENTS);
    await seedCollectionData('lostFound', INITIAL_LOST_FOUND);
    await seedCollectionData('alumni', INITIAL_ALUMNI);
    console.info('[Seed] ✅ Reference data seeded (library, locations, contacts, events, alumni)');

    console.info('[Seed] 🎉 All data seeded successfully!');
    return { success: true, message: 'All data seeded successfully!' };

  } catch (error) {
    console.error('[Seed] ❌ Seeding failed:', error);
    return { success: false, message: error.message };
  }
}

// Make available in browser console for quick seeding
if (typeof window !== 'undefined') {
  window.__seedFirestore = seedAllData;
}
