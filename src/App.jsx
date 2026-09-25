import React, { useState, useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import Navbar from './components/layout/Navbar';
import Sidebar from './components/layout/Sidebar';
import DemoSwitcher from './components/common/DemoSwitcher';
import Login from './pages/auth/Login';

// Student Pages
import StudentDashboard from './pages/student/Dashboard';
import StudentAttendance from './pages/student/Attendance';
import StudentMarks from './pages/student/Marks';
import StudentAssignments from './pages/student/Assignments';
import StudyMaterials from './pages/student/StudyMaterials';
import StudentQuestions from './pages/student/Questions';
import StudentSyllabus from './pages/student/SyllabusProgress';
import StudentTimetable from './pages/student/Timetable';
import AcademicCalendar from './pages/student/Calendar';
import OfficeHours from './pages/student/OfficeHours';
import StudentNotices from './pages/student/Notices';
import StudentEvents from './pages/student/Events';
import CampusMap from './pages/student/CampusMap';
import CampusContacts from './pages/student/Contacts';
import StudentLibrary from './pages/student/Library';
import LostFound from './pages/student/LostFound';
import StudentFees from './pages/student/Fees';
import StudentLeave from './pages/student/LeaveRequests';
import StudentComplaints from './pages/student/Complaints';
import CertificateWallet from './pages/student/Certificates';
import GroupChats from './pages/student/GroupChats';
import AlumniDirectory from './pages/student/Alumni';
import StudentFeedback from './pages/student/Feedback';

// Faculty Pages
import FacultyDashboard from './pages/faculty/FacultyDashboard';
import FacultyAttendance from './pages/faculty/FacultyAttendance';
import FacultyMarks from './pages/faculty/FacultyMarks';
import FacultyAssignments from './pages/faculty/FacultyAssignments';
import FacultyMaterials from './pages/faculty/FacultyMaterials';
import FacultyQuestions from './pages/faculty/FacultyQuestions';
import FacultySyllabus from './pages/faculty/FacultySyllabus';
import FacultyTimetable from './pages/faculty/FacultyTimetable';
import FacultyOfficeHours from './pages/faculty/FacultyOfficeHours';
import FacultyComplaints from './pages/faculty/FacultyComplaints';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminDepartments from './pages/admin/AdminDepartments';
import AdminUsers from './pages/admin/AdminUsers';
import AdminNotices from './pages/admin/AdminNotices';
import AdminComplaints from './pages/admin/AdminComplaints';
import AdminFeedback from './pages/admin/AdminFeedback';

export default function App() {
  const { currentUser, role, loading } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Automatically reset tab when switching roles
  useEffect(() => {
    if (role === 'student' && (activeTab.startsWith('fac-') || activeTab.startsWith('adm-'))) {
      setActiveTab('dashboard');
    } else if (role === 'faculty' && !activeTab.startsWith('fac-')) {
      setActiveTab('fac-dashboard');
    } else if (role === 'admin' && !activeTab.startsWith('adm-')) {
      setActiveTab('adm-dashboard');
    }
  }, [role]);

  // Show loading spinner while Firebase auth is initializing
  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'var(--bg-app)', flexDirection: 'column', gap: '1.5rem'
      }}>
        <div style={{
          width: '48px', height: '48px', border: '3px solid var(--border-subtle)',
          borderTopColor: 'var(--dept-cse)', borderRadius: '50%',
          animation: 'spin 0.8s linear infinite'
        }} />
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>
          Initializing Student Hive…
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  if (!currentUser) {
    return <Login />;
  }

  const renderContent = () => {
    // Student Routes
    if (role === 'student') {
      switch (activeTab) {
        case 'dashboard': return <StudentDashboard onNavigate={setActiveTab} />;
        case 'attendance': return <StudentAttendance />;
        case 'marks': return <StudentMarks />;
        case 'assignments': return <StudentAssignments />;
        case 'materials': return <StudyMaterials />;
        case 'questions': return <StudentQuestions />;
        case 'syllabus': return <StudentSyllabus />;
        case 'timetable': return <StudentTimetable />;
        case 'calendar': return <AcademicCalendar />;
        case 'office-hours': return <OfficeHours />;
        case 'notices': return <StudentNotices />;
        case 'events': return <StudentEvents />;
        case 'map': return <CampusMap />;
        case 'contacts': return <CampusContacts />;
        case 'library': return <StudentLibrary />;
        case 'lost-found': return <LostFound />;
        case 'fees': return <StudentFees />;
        case 'leaves': return <StudentLeave />;
        case 'complaints': return <StudentComplaints />;
        case 'certificates': return <CertificateWallet />;
        case 'chats': return <GroupChats />;
        case 'alumni': return <AlumniDirectory />;
        case 'feedback': return <StudentFeedback />;
        default: return <StudentDashboard onNavigate={setActiveTab} />;
      }
    }

    // Faculty Routes
    if (role === 'faculty') {
      switch (activeTab) {
        case 'fac-dashboard': return <FacultyDashboard onNavigate={setActiveTab} />;
        case 'fac-attendance': return <FacultyAttendance />;
        case 'fac-marks': return <FacultyMarks />;
        case 'fac-assignments': return <FacultyAssignments />;
        case 'fac-materials': return <FacultyMaterials />;
        case 'fac-questions': return <FacultyQuestions />;
        case 'fac-syllabus': return <FacultySyllabus />;
        case 'fac-timetable': return <FacultyTimetable />;
        case 'fac-office-hours': return <FacultyOfficeHours />;
        case 'fac-complaints': return <FacultyComplaints />;
        default: return <FacultyDashboard onNavigate={setActiveTab} />;
      }
    }

    // Admin Routes
    if (role === 'admin') {
      switch (activeTab) {
        case 'adm-dashboard': return <AdminDashboard onNavigate={setActiveTab} />;
        case 'adm-departments': return <AdminDepartments />;
        case 'adm-users': return <AdminUsers />;
        case 'adm-notices': return <AdminNotices />;
        case 'adm-complaints': return <AdminComplaints />;
        case 'adm-feedback': return <AdminFeedback />;
        default: return <AdminDashboard onNavigate={setActiveTab} />;
      }
    }

    return <StudentDashboard onNavigate={setActiveTab} />;
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', background: 'var(--bg-app)' }}>
      {/* Top Navigation Bar */}
      <Navbar onToggleMobileSidebar={() => setMobileSidebarOpen(!mobileSidebarOpen)} />

      {/* Main Body Layout: Sidebar + Viewport */}
      <div style={{ display: 'flex', flex: 1, position: 'relative' }}>
        {/* Dark backdrop overlay for mobile sidebar drawer */}
        <div
          className={`sidebar-overlay ${mobileSidebarOpen ? 'active' : ''}`}
          onClick={() => setMobileSidebarOpen(false)}
        />

        <Sidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          mobileOpen={mobileSidebarOpen}
          onCloseMobile={() => setMobileSidebarOpen(false)}
        />

        <main
          className="app-main-content"
          style={{
            flex: 1,
            padding: '2rem 2.5rem',
            overflowY: 'auto',
            height: 'calc(100vh - var(--navbar-height))',
            background: 'var(--bg-app)'
          }}
        >
          {renderContent()}
        </main>
      </div>

      {/* Floating 1-Click Role Switcher */}
      <DemoSwitcher />
    </div>
  );
}
