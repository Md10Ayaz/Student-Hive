import React from 'react';
import { useData } from '../../context/DataContext';
import {
  CheckCircle2,
  AlertTriangle,
  Clock,
  Calendar,
  BookOpen,
  ArrowUpRight,
  ShieldAlert
} from 'lucide-react';

export default function StudentAttendance() {
  const { attendanceSummary, attendanceRoster } = useData();

  const isBelowThreshold = attendanceSummary.percentage < 75;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Page Title & Breadcrumb */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Attendance Performance</h1>
          <p style={{ fontSize: '0.85rem' }}>
            Official institutional attendance tracking calculated per individual lecture session.
          </p>
        </div>
        <span className="badge badge-dept" style={{ padding: '0.4rem 0.9rem', fontSize: '0.8rem' }}>
          Minimum Requirement: 75%
        </span>
      </div>

      {/* Warning Alert Banner (if applicable or simulated) */}
      {isBelowThreshold && (
        <div
          style={{
            padding: '1.25rem 1.5rem',
            borderRadius: '14px',
            background: 'var(--color-danger-bg)',
            border: '1px solid var(--color-danger)',
            display: 'flex',
            alignItems: 'center',
            gap: '14px'
          }}
        >
          <div style={{ padding: '10px', borderRadius: '10px', background: 'rgba(239, 68, 68, 0.2)' }}>
            <ShieldAlert size={24} color="var(--color-danger)" />
          </div>
          <div>
            <h4 style={{ color: 'var(--color-danger)', marginBottom: '2px' }}>⚠️ Attendance Warning Notice</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
              Your aggregate attendance has fallen below the university mandatory minimum of 75%. You risk detention from
              semester examinations. Please contact your HOD immediately.
            </p>
          </div>
        </div>
      )}

      {/* Metrics Row: Total Classes + Total Working Hours */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {/* Classes Attended Card */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>
                Class Attendance
              </span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--dept-cse)', marginTop: '4px' }}>
                {attendanceSummary.percentage}%
              </h2>
            </div>
            <div style={{ padding: '12px', borderRadius: '12px', background: 'var(--dept-cse-glow)', color: 'var(--dept-cse)' }}>
              <CheckCircle2 size={24} />
            </div>
          </div>

          <div style={{ width: '100%', height: '10px', background: 'var(--bg-elevated)', borderRadius: '5px', overflow: 'hidden', marginBottom: '1rem' }}>
            <div
              style={{
                width: `${attendanceSummary.percentage}%`,
                height: '100%',
                background: 'var(--grad-primary)',
                borderRadius: '5px'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', textAlign: 'center' }}>
            <div style={{ padding: '8px', background: 'var(--bg-surface)', borderRadius: '8px' }}>
              <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 800 }}>{attendanceSummary.totalClasses}</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Total Held</span>
            </div>
            <div style={{ padding: '8px', background: 'var(--bg-surface)', borderRadius: '8px' }}>
              <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-success)' }}>
                {attendanceSummary.classesAttended}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Attended</span>
            </div>
            <div style={{ padding: '8px', background: 'var(--bg-surface)', borderRadius: '8px' }}>
              <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-danger)' }}>
                {attendanceSummary.classesMissed}
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Missed</span>
            </div>
          </div>
        </div>

        {/* Working Hours Card */}
        <div className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase' }}>
                Academic Working Hours
              </span>
              <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--dept-mech)', marginTop: '4px' }}>
                {attendanceSummary.hoursPercentage}%
              </h2>
            </div>
            <div style={{ padding: '12px', borderRadius: '12px', background: 'var(--dept-mech-glow)', color: 'var(--dept-mech)' }}>
              <Clock size={24} />
            </div>
          </div>

          <div style={{ width: '100%', height: '10px', background: 'var(--bg-elevated)', borderRadius: '5px', overflow: 'hidden', marginBottom: '1rem' }}>
            <div
              style={{
                width: `${attendanceSummary.hoursPercentage}%`,
                height: '100%',
                background: 'var(--grad-amber)',
                borderRadius: '5px'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', textAlign: 'center' }}>
            <div style={{ padding: '8px', background: 'var(--bg-surface)', borderRadius: '8px' }}>
              <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 800 }}>{attendanceSummary.totalWorkingHours} hrs</span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Total Working Hours</span>
            </div>
            <div style={{ padding: '8px', background: 'var(--bg-surface)', borderRadius: '8px' }}>
              <span style={{ display: 'block', fontSize: '1.1rem', fontWeight: 800, color: 'var(--dept-mech)' }}>
                {attendanceSummary.hoursAttended} hrs
              </span>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>Hours Attended</span>
            </div>
          </div>
        </div>
      </div>

      {/* Subject-Wise Attendance Breakdown Table */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem' }}>Subject-Wise Attendance Matrix</h3>
            <p style={{ fontSize: '0.8rem' }}>Direct synchronization with faculty lecture logs.</p>
          </div>
        </div>

        <div className="table-container">
          <table className="hive-table">
            <thead>
              <tr>
                <th>Subject Code & Name</th>
                <th>Assigned Faculty</th>
                <th>Attended Classes</th>
                <th>Total Held</th>
                <th>Percentage</th>
                <th>Status / Margin</th>
              </tr>
            </thead>
            <tbody>
              {attendanceSummary.subjectWise.map((sub) => {
                const isSubLow = sub.percentage < 75;
                const canMiss = Math.floor((sub.attended - 0.75 * sub.total) / 0.75);
                const needToAttend = Math.ceil((0.75 * sub.total - sub.attended) / 0.25);

                return (
                  <tr key={sub.subjectId}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{sub.subjectName}</div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{sub.subjectId}</span>
                    </td>
                    <td style={{ color: 'var(--text-secondary)' }}>{sub.faculty}</td>
                    <td style={{ fontWeight: 700, color: isSubLow ? 'var(--color-danger)' : 'var(--color-success)' }}>
                      {sub.attended}
                    </td>
                    <td>{sub.total}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontWeight: 800, width: '45px' }}>{sub.percentage}%</span>
                        <div style={{ width: '80px', height: '6px', background: 'var(--bg-elevated)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div
                            style={{
                              width: `${sub.percentage}%`,
                              height: '100%',
                              background: isSubLow ? 'var(--color-danger)' : 'var(--color-success)'
                            }}
                          />
                        </div>
                      </div>
                    </td>
                    <td>
                      {isSubLow ? (
                        <span className="badge badge-danger">
                          ⚠️ Below 75% (Attend next {needToAttend} classes)
                        </span>
                      ) : (
                        <span className="badge badge-success">
                          ✓ On Track ({canMiss > 0 ? `Can miss ${canMiss}` : 'Safe'})
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
