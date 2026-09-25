import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { isLiveFirebaseMode } from '../../firebase/config';
import { seedAllData } from '../../firebase/seedData';
import {
  Users,
  ShieldCheck,
  Building,
  CheckCircle2,
  AlertTriangle,
  FileCheck2,
  Clock,
  ArrowRight,
  TrendingUp,
  CreditCard,
  Database,
  RefreshCw
} from 'lucide-react';

export default function AdminDashboard({ onNavigate }) {
  const { complaints, leaves, fees, departments, resetAllData } = useData();
  const [seeding, setSeeding] = useState(false);
  const [seedSuccess, setSeedSuccess] = useState(false);

  const handleSeedFirebase = async () => {
    if (!window.confirm('Populate Firestore with all mock departments, courses, students, and timetable data?')) return;
    try {
      setSeeding(true);
      setSeedSuccess(false);
      await seedAllData();
      setSeeding(false);
      setSeedSuccess(true);
      setTimeout(() => setSeedSuccess(false), 5000);
    } catch (err) {
      setSeeding(false);
      alert('Firestore seeding failed: ' + err.message);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      {/* Executive Header */}
      <div
        className="glass-panel"
        style={{
          padding: '1.75rem 2rem',
          background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.12) 0%, rgba(59, 130, 246, 0.08) 100%)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.4rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--dept-eee)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              University Administration & Governance
            </span>
            <span className="badge" style={{ background: 'var(--dept-eee-glow)', color: 'var(--dept-eee)' }}>
              Dean of Academic Affairs
            </span>
            <span
              className="badge"
              style={{
                background: isLiveFirebaseMode ? 'rgba(34, 197, 94, 0.15)' : 'rgba(234, 179, 8, 0.15)',
                color: isLiveFirebaseMode ? '#22c55e' : '#eab308',
                border: `1px solid ${isLiveFirebaseMode ? 'rgba(34, 197, 94, 0.3)' : 'rgba(234, 179, 8, 0.3)'}`,
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <Database size={12} />
              {isLiveFirebaseMode ? 'Live Firebase Mode' : 'Local Demo Mode'}
            </span>
          </div>
          <h1 style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>
            College Executive Overview 🛡️
          </h1>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
            Institutional governance across 5 departments, 1,248 enrolled students, and academic curriculum delivery.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
          <button
            onClick={handleSeedFirebase}
            disabled={seeding}
            className="btn btn-secondary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              borderColor: seedSuccess ? 'rgba(34, 197, 94, 0.4)' : undefined,
              color: seedSuccess ? '#22c55e' : undefined
            }}
            title="Seed all mock college data into Firestore"
          >
            {seeding ? (
              <>
                <RefreshCw size={15} style={{ animation: 'spin 1s linear infinite' }} />
                <span>Seeding Firestore...</span>
              </>
            ) : seedSuccess ? (
              <>
                <CheckCircle2 size={15} />
                <span>Firestore Synced!</span>
              </>
            ) : (
              <>
                <Database size={15} />
                <span>Seed Firestore</span>
              </>
            )}
          </button>
          <button onClick={() => onNavigate('adm-notices')} className="btn btn-primary">
            Publish Campus Notice
          </button>
          <button
            onClick={() => {
              if (window.confirm('Reset all demo state back to default college seed?')) {
                resetAllData();
              }
            }}
            className="btn btn-secondary"
          >
            Reset Demo Data
          </button>
        </div>
      </div>

      {/* PRD Section 39: The 7 Core Admin Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="glass-card">
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Total Students</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--dept-cse)', marginTop: '2px' }}>1,248</h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Across 3 Years / 6 Semesters</span>
        </div>

        <div className="glass-card">
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Active Faculty</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--dept-mech)', marginTop: '2px' }}>87</h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Professors & Lecturers</span>
        </div>

        <div className="glass-card">
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Departments</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--dept-civil)', marginTop: '2px' }}>5</h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>CSE, Mech, Civil, EEE, MME</span>
        </div>

        <div className="glass-card">
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Today's Attendance</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-success)', marginTop: '2px' }}>91%</h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>University aggregate</span>
        </div>

        <div
          className="glass-card glass-panel-hover"
          onClick={() => onNavigate('adm-complaints')}
          style={{ cursor: 'pointer' }}
        >
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Pending Complaints</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-warning)', marginTop: '2px' }}>
            {complaints.filter((c) => c.status !== 'Resolved').length || 12}
          </h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-warning)' }}>Action Required →</span>
        </div>

        <div className="glass-card">
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Pending Leave Requests</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--dept-eee)', marginTop: '2px' }}>
            {leaves.filter((l) => l.status === 'Pending').length || 18}
          </h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Sanction Queue</span>
        </div>

        <div className="glass-card">
          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>Upcoming Exams</span>
          <h2 style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--color-danger)', marginTop: '2px' }}>32 Days</h2>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Semester-End Final Exams</span>
        </div>
      </div>

      {/* College Structure & Departments Breakdown */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem' }}>Department Curriculum & Faculty Allocation</h3>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
          {departments.map((dept) => (
            <div
              key={dept.id}
              style={{
                padding: '14px',
                borderRadius: '12px',
                background: 'var(--bg-surface)',
                border: '1px solid var(--border-subtle)',
                borderLeft: `4px solid ${dept.color}`
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <strong style={{ fontSize: '0.95rem' }}>{dept.name}</strong>
                <span className="badge badge-dept" style={{ borderColor: dept.color, color: dept.color }}>
                  {dept.code}
                </span>
              </div>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                HOD: <strong>{dept.hod}</strong>
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <span>3 Years / 6 Semesters</span>
                <span>Sections A, B, C</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
