import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  Users,
  CheckCircle2,
  FileText,
  HelpCircle,
  Clock,
  Plus,
  ArrowRight,
  AlertTriangle,
  BookOpen
} from 'lucide-react';

export default function FacultyDashboard({ onNavigate }) {
  const { currentUser } = useAuth();
  const { assignments, questions, attendanceRoster } = useData();

  const pendingGrading = assignments.filter((a) => a.status === 'submitted' && a.marksAwarded === undefined);
  const openQuestions = questions.filter((q) => q.status === 'open');
  const lowAttendanceCount = attendanceRoster.filter((s) => s.status === 'warning').length;

  const getTimeGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) return 'Good Morning';
    if (hour >= 12 && hour < 17) return 'Good Afternoon';
    if (hour >= 17 && hour < 22) return 'Good Evening';
    return 'Good Evening';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '1.75rem 2rem',
          background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.12) 0%, rgba(245, 158, 11, 0.08) 100%)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--dept-mech)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Faculty Management Console
            </span>
            <span className="badge" style={{ background: 'var(--dept-mech-glow)', color: 'var(--dept-mech)' }}>
              {currentUser?.designation || 'Professor'}
            </span>
          </div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>
            {getTimeGreeting()}, {currentUser?.name || 'Dr. Rajesh Sharma'} 👨‍🏫
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            You have <strong>2 lectures</strong> scheduled today and <strong>{openQuestions.length} pending academic questions</strong> from students.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button onClick={() => onNavigate('fac-attendance')} className="btn btn-primary">
            <CheckCircle2 size={16} /> Mark Today's Attendance
          </button>
          <button onClick={() => onNavigate('fac-timetable')} className="btn btn-secondary">
            <Clock size={16} /> Reschedule Class
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        <div
          className="glass-card glass-panel-hover"
          onClick={() => onNavigate('fac-attendance')}
          style={{ cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Enrolled Students</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--dept-cse)' }}>64</h2>
            </div>
            <div style={{ padding: '10px', borderRadius: '12px', background: 'var(--dept-cse-glow)', color: 'var(--dept-cse)' }}>
              <Users size={22} />
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-danger)', fontWeight: 600 }}>
            {lowAttendanceCount} student(s) below 75% attendance threshold
          </p>
        </div>

        <div
          className="glass-card glass-panel-hover"
          onClick={() => onNavigate('fac-assignments')}
          style={{ cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Submissions to Review</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--dept-mech)' }}>
                {pendingGrading.length > 0 ? pendingGrading.length : '1'}
              </h2>
            </div>
            <div style={{ padding: '10px', borderRadius: '12px', background: 'var(--dept-mech-glow)', color: 'var(--dept-mech)' }}>
              <FileText size={22} />
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Coursework solutions awaiting grading & feedback
          </p>
        </div>

        <div
          className="glass-card glass-panel-hover"
          onClick={() => onNavigate('fac-questions')}
          style={{ cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Student Questions</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--dept-eee)' }}>
                {openQuestions.length}
              </h2>
            </div>
            <div style={{ padding: '10px', borderRadius: '12px', background: 'var(--dept-eee-glow)', color: 'var(--dept-eee)' }}>
              <HelpCircle size={22} />
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Direct conceptual queries submitted by 5th Sem students
          </p>
        </div>

        <div
          className="glass-card glass-panel-hover"
          onClick={() => onNavigate('fac-timetable')}
          style={{ cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Next Lecture</span>
              <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--dept-mme)' }}>2:00 PM</h2>
            </div>
            <div style={{ padding: '10px', borderRadius: '12px', background: 'var(--dept-mme-glow)', color: 'var(--dept-mme)' }}>
              <Clock size={22} />
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            FSD Practical Lab in <strong>Lab 3</strong> (Rescheduled)
          </p>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Faculty Action Shortcuts</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          <button
            onClick={() => onNavigate('fac-attendance')}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start', padding: '1rem' }}
          >
            <CheckCircle2 size={18} color="var(--dept-cse)" />
            <div style={{ textAlign: 'left' }}>
              <span style={{ display: 'block', fontWeight: 700 }}>Mark Attendance</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Trigger low attendance warnings</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate('fac-marks')}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start', padding: '1rem' }}
          >
            <CheckCircle2 size={18} color="var(--dept-mech)" />
            <div style={{ textAlign: 'left' }}>
              <span style={{ display: 'block', fontWeight: 700 }}>Update CIE Gradebook</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Enter internal & viva scores</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate('fac-assignments')}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start', padding: '1rem' }}
          >
            <FileText size={18} color="var(--dept-eee)" />
            <div style={{ textAlign: 'left' }}>
              <span style={{ display: 'block', fontWeight: 700 }}>Publish Assignment</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Set deadlines and rubrics</span>
            </div>
          </button>

          <button
            onClick={() => onNavigate('fac-materials')}
            className="btn btn-secondary"
            style={{ justifyContent: 'flex-start', padding: '1rem' }}
          >
            <BookOpen size={18} color="var(--dept-mme)" />
            <div style={{ textAlign: 'left' }}>
              <span style={{ display: 'block', fontWeight: 700 }}>Upload Study Notes</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Distribute PDFs and slides</span>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
