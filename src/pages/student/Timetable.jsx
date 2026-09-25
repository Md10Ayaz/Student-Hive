import React from 'react';
import { useData } from '../../context/DataContext';
import { Clock, AlertTriangle, Calendar, Bell, Sparkles } from 'lucide-react';

export default function StudentTimetable() {
  const { timetable, rescheduleAlerts } = useData();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Academic Timetable</h1>
          <p style={{ fontSize: '0.85rem' }}>Semester 5 • Section A • Computer Science and Engineering</p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span className="badge badge-dept">Room 204 & Lab 3</span>
        </div>
      </div>

      {/* Reschedule Alert Banner (PRD Section 13) */}
      {rescheduleAlerts && rescheduleAlerts.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {rescheduleAlerts.map((alert) => (
            <div
              key={alert.id}
              style={{
                padding: '1.25rem 1.5rem',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15) 0%, rgba(249, 115, 22, 0.1) 100%)',
                border: '1px solid var(--color-warning)',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '14px'
              }}
            >
              <div style={{ padding: '8px', borderRadius: '10px', background: 'var(--color-warning-bg)', color: 'var(--color-warning)' }}>
                <Bell size={20} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                  <h4 style={{ color: 'var(--color-warning)', fontSize: '0.95rem' }}>
                    🔔 Class Rescheduled: {alert.subject}
                  </h4>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{alert.date}</span>
                </div>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  Moved from <strong>{alert.originalTime}</strong> → <strong style={{ color: 'var(--dept-cse)' }}>{alert.newTime}</strong>
                </p>
                <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                  Instructor: {alert.faculty} • Reason: {alert.reason}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Timetable Matrix */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>Weekly Lecture & Practical Matrix</h3>

        <div className="table-container">
          <table className="hive-table" style={{ textAlign: 'center' }}>
            <thead>
              <tr>
                <th style={{ textAlign: 'left', width: '130px' }}>Time Slot</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
              </tr>
            </thead>
            <tbody>
              {timetable.slots.map((slot, index) => (
                <tr key={index}>
                  <td style={{ textAlign: 'left', fontWeight: 700, color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Clock size={14} color="var(--dept-cse)" />
                      <span>{slot.time}</span>
                    </div>
                  </td>
                  <td>
                    <span className="badge badge-dept" style={{ padding: '6px 10px', fontSize: '0.78rem' }}>
                      {slot.Mon}
                    </span>
                  </td>
                  <td>
                    <span className="badge" style={{ padding: '6px 10px', fontSize: '0.78rem', background: 'var(--badge-bg)' }}>
                      {slot.Tue}
                    </span>
                  </td>
                  <td>
                    <span className="badge" style={{ padding: '6px 10px', fontSize: '0.78rem', background: 'var(--badge-bg)' }}>
                      {slot.Wed}
                    </span>
                  </td>
                  <td>
                    <span className="badge" style={{ padding: '6px 10px', fontSize: '0.78rem', background: 'var(--badge-bg)' }}>
                      {slot.Thu}
                    </span>
                  </td>
                  <td>
                    <span className="badge" style={{ padding: '6px 10px', fontSize: '0.78rem', background: 'var(--badge-bg)' }}>
                      {slot.Fri}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
