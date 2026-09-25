import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  CheckCircle2,
  Award,
  FileText,
  Library,
  Clock,
  Bell,
  Sparkles,
  CheckSquare,
  Square,
  ArrowRight,
  AlertTriangle,
  Flame,
  Calendar
} from 'lucide-react';

export default function StudentDashboard({ onNavigate }) {
  const { currentUser } = useAuth();
  const {
    attendanceSummary,
    assignments,
    library,
    notices,
    quotes,
    checklist,
    toggleChecklistItem,
    examTargetDate
  } = useData();

  // Exam Countdown State
  const [timeLeft, setTimeLeft] = useState({ days: 32, hours: 8, minutes: 42, seconds: 15 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(examTargetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [examTargetDate]);

  const pendingAssignments = assignments.filter((a) => a.status === 'pending');
  const dueBooks = library.filter((b) => b.status === 'due-soon' || b.daysRemaining <= 2);
  const latestNotice = notices[0];
  const activeQuote = quotes[0];

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 4 && hour < 12) {
      return { text: 'Good Morning', emoji: '🌅', desc: 'morning academic overview' };
    } else if (hour >= 12 && hour < 17) {
      return { text: 'Good Afternoon', emoji: '☀️', desc: 'afternoon academic update' };
    } else if (hour >= 17 && hour < 22) {
      return { text: 'Good Evening', emoji: '🌆', desc: 'evening academic summary' };
    } else {
      return { text: 'Good Evening', emoji: '🌙', desc: 'nightly academic overview' };
    }
  };

  const timeGreeting = getTimeBasedGreeting();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Header Greeting Banner */}
      <div
        className="glass-panel"
        style={{
          padding: '1.75rem 2rem',
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(59, 130, 246, 0.08) 100%)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--dept-cse)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Academic Portal 2026
            </span>
            <span className="badge badge-dept">Sem 5 • Section A</span>
          </div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>
            {timeGreeting.text}, {currentUser?.name?.split(' ')[0] || 'Student'} {timeGreeting.emoji}
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Here is your {timeGreeting.desc}. You have <strong>{pendingAssignments.length} assignments</strong> pending for submission.
          </p>
        </div>

        {/* Public Protected ID Pill */}
        <div
          style={{
            padding: '0.75rem 1.25rem',
            borderRadius: '12px',
            background: 'var(--bg-surface)',
            border: '1px solid var(--border-medium)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end'
          }}
        >
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
            Protected Public ID
          </span>
          <span style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'monospace', color: 'var(--dept-cse)' }}>
            {currentUser?.publicId || 'SH-7F29K4'}
          </span>
        </div>
      </div>

      {/* 4 Core PRD KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
        {/* Attendance Card */}
        <div
          className="glass-card glass-panel-hover"
          onClick={() => onNavigate('attendance')}
          style={{ cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Overall Attendance</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '2px', color: 'var(--dept-cse)' }}>
                {attendanceSummary.percentage}%
              </h2>
            </div>
            <div style={{ padding: '10px', borderRadius: '12px', background: 'var(--dept-cse-glow)', color: 'var(--dept-cse)' }}>
              <CheckCircle2 size={22} />
            </div>
          </div>
          <div style={{ width: '100%', height: '8px', background: 'var(--bg-elevated)', borderRadius: '4px', overflow: 'hidden', marginBottom: '0.5rem' }}>
            <div
              style={{
                width: `${attendanceSummary.percentage}%`,
                height: '100%',
                background: 'var(--grad-primary)',
                borderRadius: '4px'
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            <span>{attendanceSummary.classesAttended} / {attendanceSummary.totalClasses} classes</span>
            <span>{attendanceSummary.hoursAttended} / {attendanceSummary.totalWorkingHours} hrs</span>
          </div>
        </div>

        {/* CGPA / Marks Card */}
        <div
          className="glass-card glass-panel-hover"
          onClick={() => onNavigate('marks')}
          style={{ cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Current CGPA</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '2px', color: 'var(--dept-mech)' }}>
                {currentUser?.cgpa || 8.9}
              </h2>
            </div>
            <div style={{ padding: '10px', borderRadius: '12px', background: 'var(--dept-mech-glow)', color: 'var(--dept-mech)' }}>
              <Award size={22} />
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Ranked in top 5% of CSE department across all internal assessments.
          </p>
          <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--dept-mech)', fontWeight: 600 }}>
            <span>View Marks Breakdown</span>
            <ArrowRight size={13} />
          </div>
        </div>

        {/* Assignments Card */}
        <div
          className="glass-card glass-panel-hover"
          onClick={() => onNavigate('assignments')}
          style={{ cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Assignments</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '2px', color: 'var(--color-warning)' }}>
                {pendingAssignments.length} Pending
              </h2>
            </div>
            <div style={{ padding: '10px', borderRadius: '12px', background: 'var(--color-warning-bg)', color: 'var(--color-warning)' }}>
              <FileText size={22} />
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            Next due: <strong>FSD React Hooks</strong> due tomorrow at 23:59.
          </p>
          <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--color-warning)', fontWeight: 600 }}>
            <span>Submit Assignments</span>
            <ArrowRight size={13} />
          </div>
        </div>

        {/* Library Activity Card */}
        <div
          className="glass-card glass-panel-hover"
          onClick={() => onNavigate('library')}
          style={{ cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Library Books</span>
              <h2 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '2px', color: 'var(--dept-eee)' }}>
                {dueBooks.length} Due Soon
              </h2>
            </div>
            <div style={{ padding: '10px', borderRadius: '12px', background: 'var(--dept-eee-glow)', color: 'var(--dept-eee)' }}>
              <Library size={22} />
            </div>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
            <strong>Operating System Concepts</strong> due tomorrow. Return or renew to avoid fines.
          </p>
          <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.75rem', color: 'var(--dept-eee)', fontWeight: 600 }}>
            <span>Renew Books</span>
            <ArrowRight size={13} />
          </div>
        </div>
      </div>

      {/* Main Grid: Exam Countdown, Daily Quote, Notice Board & Next Class */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {/* Left Column: Exam Countdown + Daily Quote */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* PRD Section 28: Exam Countdown Widget */}
          <div
            className="glass-panel"
            style={{
              padding: '1.5rem',
              background: 'radial-gradient(ellipse at 80% 20%, rgba(239, 68, 68, 0.15) 0%, var(--glass-bg) 70%)',
              border: '1px solid rgba(239, 68, 68, 0.25)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Clock size={18} color="var(--color-danger)" />
                <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Semester Final Exams
                </h3>
              </div>
              <span className="badge badge-danger">Official Schedule</span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', textAlign: 'center' }}>
              <div style={{ padding: '12px 6px', background: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  {timeLeft.days}
                </span>
                <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Days
                </span>
              </div>
              <div style={{ padding: '12px 6px', background: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Hours
                </span>
              </div>
              <div style={{ padding: '12px 6px', background: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--text-primary)' }}>
                  {String(timeLeft.minutes).padStart(2, '0')}
                </span>
                <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Minutes
                </span>
              </div>
              <div style={{ padding: '12px 6px', background: 'var(--bg-surface)', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
                <span style={{ fontSize: '1.8rem', fontWeight: 900, fontFamily: 'var(--font-display)', color: 'var(--color-danger)' }}>
                  {String(timeLeft.seconds).padStart(2, '0')}
                </span>
                <span style={{ display: 'block', fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', fontWeight: 700 }}>
                  Seconds
                </span>
              </div>
            </div>
          </div>

          {/* PRD Section 27: Daily Quote & Study Tip */}
          <div className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.75rem', color: 'var(--dept-cse)' }}>
              <Sparkles size={18} />
              <h3 style={{ fontSize: '0.95rem' }}>Daily Academic Inspiration</h3>
            </div>
            <blockquote style={{ fontSize: '0.95rem', fontStyle: 'italic', color: 'var(--text-primary)', marginBottom: '0.5rem', lineHeight: 1.5 }}>
              "{activeQuote?.quote}"
            </blockquote>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'right', marginBottom: '1rem' }}>
              — {activeQuote?.author}
            </p>
            <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'var(--badge-bg)', borderLeft: '3px solid var(--dept-cse)', fontSize: '0.8rem' }}>
              {activeQuote?.tip}
            </div>
          </div>
        </div>

        {/* Right Column: Next Class Pill, Latest Notice & Checklist */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Next Class Widget with Live Room info */}
          <div className="glass-panel" style={{ padding: '1.25rem 1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                📅 Next Class Scheduled
              </span>
              <span className="badge badge-dept">Today at 2:00 PM</span>
            </div>
            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.25rem' }}>Full Stack Development (FSD Lab)</h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
              Instructor: <strong>Dr. Rajesh Sharma</strong> • Venue: <strong>Lab 3 (Moved from Room 204)</strong>
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="badge badge-warning" style={{ fontSize: '0.72rem' }}>
                Rescheduled Room (Lab 3)
              </span>
              <button
                onClick={() => onNavigate('timetable')}
                className="btn btn-ghost btn-sm"
                style={{ fontSize: '0.75rem', padding: '2px 8px' }}
              >
                View Full Timetable →
              </button>
            </div>
          </div>

          {/* PRD Section 19: Latest Notice Preview */}
          <div className="glass-panel" style={{ padding: '1.25rem 1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Bell size={16} color="var(--dept-cse)" />
                <h3 style={{ fontSize: '0.95rem' }}>📢 Latest College Notice</h3>
              </div>
              <button
                onClick={() => onNavigate('notices')}
                className="btn btn-ghost btn-sm"
                style={{ fontSize: '0.75rem', padding: '2px 8px' }}
              >
                Notice Board →
              </button>
            </div>
            {latestNotice && (
              <div style={{ padding: '10px 12px', borderRadius: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                  <h4 style={{ fontSize: '0.88rem' }}>{latestNotice.title}</h4>
                  <span className="badge badge-danger" style={{ fontSize: '0.65rem' }}>{latestNotice.urgency}</span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4, marginBottom: '6px' }}>
                  {latestNotice.body}
                </p>
                <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                  By {latestNotice.publishedBy} • {latestNotice.date}
                </span>
              </div>
            )}
          </div>

          {/* PRD Section 29: First-Day Checklist */}
          <div className="glass-panel" style={{ padding: '1.25rem 1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '0.95rem' }}>Semester Checklist</h3>
              <span style={{ fontSize: '0.75rem', color: 'var(--dept-cse)', fontWeight: 600 }}>
                {checklist.filter((c) => c.done).length} / {checklist.length} Completed
              </span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '180px', overflowY: 'auto' }}>
              {checklist.map((item) => (
                <div
                  key={item.id}
                  onClick={() => toggleChecklistItem(item.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '6px 8px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '0.82rem',
                    color: item.done ? 'var(--text-muted)' : 'var(--text-primary)',
                    textDecoration: item.done ? 'line-through' : 'none',
                    transition: 'background var(--transition-fast)'
                  }}
                >
                  {item.done ? (
                    <CheckSquare size={16} color="var(--color-success)" />
                  ) : (
                    <Square size={16} color="var(--text-muted)" />
                  )}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
