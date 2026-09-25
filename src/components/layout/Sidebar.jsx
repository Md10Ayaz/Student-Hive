import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import collegeLogo from '../../assets/logo.png';
import {
  Home,
  CheckCircle2,
  Award,
  FileText,
  BookOpen,
  HelpCircle,
  ListChecks,
  Calendar,
  Clock,
  BellRing,
  MapPin,
  PhoneCall,
  Library,
  Search,
  CreditCard,
  FileCheck2,
  AlertTriangle,
  FileBadge,
  MessageSquare,
  Users,
  Star,
  ChevronDown,
  ChevronRight,
  ShieldCheck,
  Building,
  GraduationCap,
  X
} from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab, mobileOpen, onCloseMobile }) {
  const { role, currentUser } = useAuth();

  // Accordion open/close state for student categories
  const [openSections, setOpenSections] = useState({
    academics: true,
    schedule: true,
    campus: false,
    finance: false,
    services: false,
    community: false
  });

  const toggleSection = (section) => {
    setOpenSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const navItem = (id, label, icon, badge = null) => {
    const isActive = activeTab === id;
    const IconComponent = icon;
    return (
      <button
        key={id}
        onClick={() => {
          setActiveTab(id);
          if (onCloseMobile) onCloseMobile();
        }}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.6rem 0.85rem',
          borderRadius: '10px',
          background: isActive ? 'var(--bg-elevated)' : 'transparent',
          color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
          border: isActive ? '1px solid var(--border-medium)' : '1px solid transparent',
          fontWeight: isActive ? 600 : 500,
          fontSize: '0.85rem',
          cursor: 'pointer',
          textAlign: 'left',
          transition: 'all var(--transition-fast)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <IconComponent
            size={17}
            color={isActive ? 'var(--dept-cse)' : 'currentColor'}
            style={{ flexShrink: 0 }}
          />
          <span>{label}</span>
        </div>
        {badge && (
          <span
            className="badge badge-dept"
            style={{ fontSize: '0.65rem', padding: '1px 6px' }}
          >
            {badge}
          </span>
        )}
      </button>
    );
  };

  const categoryHeader = (key, label, icon) => {
    const isOpen = openSections[key];
    const IconComponent = icon;
    return (
      <button
        onClick={() => toggleSection(key)}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0.65rem 0.5rem',
          background: 'transparent',
          border: 'none',
          color: 'var(--text-muted)',
          fontSize: '0.74rem',
          fontWeight: 700,
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          cursor: 'pointer',
          marginTop: '0.75rem',
          transition: 'color var(--transition-fast)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <IconComponent size={14} />
          <span>{label}</span>
        </div>
        {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
      </button>
    );
  };

  return (
    <aside
      className={`app-sidebar ${mobileOpen ? 'mobile-open' : ''}`}
      style={{
        width: 'var(--sidebar-width)',
        background: 'var(--bg-primary)',
        borderRight: '1px solid var(--border-subtle)',
        display: 'flex',
        flexDirection: 'column',
        height: 'calc(100vh - var(--navbar-height))',
        position: 'sticky',
        top: 'var(--navbar-height)',
        padding: '1.25rem 0.75rem',
        overflowY: 'auto'
      }}
    >
      {/* Mobile Header (Shown on small screens via CSS) */}
      <div
        className="sidebar-mobile-header"
        style={{
          display: 'none',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '1rem',
          paddingBottom: '0.75rem',
          borderBottom: '1px solid var(--border-subtle)'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '8px',
            background: '#ffffff',
            padding: '3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            <img src={collegeLogo} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <span style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
            Student Hive Menu
          </span>
        </div>
        <button
          onClick={onCloseMobile}
          className="btn btn-icon btn-ghost"
          style={{ padding: '6px' }}
          title="Close Navigation Menu"
        >
          <X size={20} />
        </button>
      </div>
      {/* ----------------- STUDENT ROLE NAVIGATION ----------------- */}
      {role === 'student' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItem('dashboard', 'Home Overview', Home)}

          {/* Academics Category */}
          {categoryHeader('academics', 'Academics', GraduationCap)}
          {openSections.academics && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', paddingLeft: '4px' }}>
              {navItem('attendance', 'Attendance', CheckCircle2, '82%')}
              {navItem('marks', 'Internal Marks', Award, '8.9')}
              {navItem('assignments', 'Assignments', FileText, '2 Due')}
              {navItem('materials', 'Study Materials', BookOpen)}
              {navItem('questions', 'Ask a Question', HelpCircle)}
              {navItem('syllabus', 'Syllabus Progress', ListChecks, '65%')}
            </div>
          )}

          {/* Schedule Category */}
          {categoryHeader('schedule', 'Schedule', Calendar)}
          {openSections.schedule && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', paddingLeft: '4px' }}>
              {navItem('timetable', 'Timetable', Clock)}
              {navItem('calendar', 'Academic Calendar', Calendar)}
              {navItem('office-hours', 'Faculty Office Hours', Users)}
            </div>
          )}

          {/* Campus Services Category */}
          {categoryHeader('campus', 'Campus', Building)}
          {openSections.campus && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', paddingLeft: '4px' }}>
              {navItem('notices', 'Notice Board', BellRing)}
              {navItem('events', 'Upcoming Events', Calendar)}
              {navItem('map', 'Interactive Map', MapPin)}
              {navItem('contacts', 'Campus Directory', PhoneCall)}
              {navItem('library', 'Library & Dues', Library, '1 Due')}
              {navItem('lost-found', 'Lost & Found', Search)}
            </div>
          )}

          {/* Finance Category */}
          {categoryHeader('finance', 'Finance', CreditCard)}
          {openSections.finance && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', paddingLeft: '4px' }}>
              {navItem('fees', 'Tuition Fees & Dues', CreditCard, 'Dues')}
            </div>
          )}

          {/* Services Category */}
          {categoryHeader('services', 'Services', FileCheck2)}
          {openSections.services && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', paddingLeft: '4px' }}>
              {navItem('leaves', 'Leave Requests', FileCheck2)}
              {navItem('complaints', 'Complaint Box', AlertTriangle)}
              {navItem('certificates', 'Certificate Wallet', FileBadge)}
            </div>
          )}

          {/* Community Category */}
          {categoryHeader('community', 'Community', MessageSquare)}
          {openSections.community && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', paddingLeft: '4px' }}>
              {navItem('chats', 'Group Chats', MessageSquare)}
              {navItem('alumni', 'Alumni Directory', Users)}
              {navItem('feedback', 'Faculty Feedback', Star)}
            </div>
          )}
        </div>
      )}

      {/* ----------------- FACULTY ROLE NAVIGATION ----------------- */}
      {role === 'faculty' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItem('fac-dashboard', 'Faculty Dashboard', Home)}
          {navItem('fac-attendance', 'Mark Attendance & Alerts', CheckCircle2, 'Roster')}
          {navItem('fac-marks', 'Update Marks Gradebook', Award)}
          {navItem('fac-assignments', 'Manage Assignments', FileText)}
          {navItem('fac-materials', 'Upload Notes & Slides', BookOpen)}
          {navItem('fac-questions', 'Academic Q&A Answers', HelpCircle)}
          {navItem('fac-syllabus', 'Update Syllabus Progress', ListChecks)}
          {navItem('fac-timetable', 'Timetable & Reschedule', Clock)}
          {navItem('fac-office-hours', 'Office Hours Schedule', Calendar)}
          {navItem('fac-complaints', 'Student Complaints', AlertTriangle)}
        </div>
      )}

      {/* ----------------- ADMIN ROLE NAVIGATION ----------------- */}
      {role === 'admin' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItem('adm-dashboard', 'Admin Overview', ShieldCheck)}
          {navItem('adm-departments', 'Departments & Curriculum', Building)}
          {navItem('adm-users', 'Students & Faculty Roster', Users)}
          {navItem('adm-notices', 'Publish Notices', BellRing)}
          {navItem('adm-complaints', 'Institutional Complaints', AlertTriangle)}
          {navItem('adm-feedback', 'Faculty Feedback Reports', Star)}
        </div>
      )}
    </aside>
  );
}
