import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Mail,
  Send,
  Calendar,
  Clock,
  ShieldAlert,
  Users
} from 'lucide-react';

export default function FacultyAttendance() {
  const { attendanceRoster, markAttendance, sendAttendanceWarning, subjects } = useData();
  const [selectedSubject, setSelectedSubject] = useState('FSD');
  const [selectedDate, setSelectedDate] = useState('2026-09-24');
  const [sessionHours, setSessionHours] = useState(1);
  const [markedToday, setMarkedToday] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');

  const handleMark = (studentUid, status) => {
    markAttendance(studentUid, selectedSubject, selectedDate, status, sessionHours);
    setMarkedToday(true);
  };

  const handleSendWarning = (student) => {
    sendAttendanceWarning(
      student.studentUid,
      `Official Institutional Warning dispatched via SMS & College Email to ${student.studentName} (${student.usn}): Attendance in ${selectedSubject} is currently ${student.percentage}%, which is below the mandatory 75% cutoff.`
    );
    setWarningMessage(`✓ Attendance warning successfully transmitted via SMS Gateway & Email to ${student.studentName}!`);
    setTimeout(() => setWarningMessage(''), 5000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Attendance Register & Warning Control</h1>
          <p style={{ fontSize: '0.85rem' }}>
            Record class attendance per lecture session and issue official automated warning notices.
          </p>
        </div>
        <span className="badge badge-dept" style={{ padding: '0.4rem 0.8rem' }}>
          Computer Science • Section A
        </span>
      </div>

      {warningMessage && (
        <div
          style={{
            padding: '1rem 1.25rem',
            borderRadius: '12px',
            background: 'var(--color-success-bg)',
            border: '1px solid var(--color-success)',
            color: 'var(--color-success)',
            fontSize: '0.88rem',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <CheckCircle2 size={18} />
          <span>{warningMessage}</span>
        </div>
      )}

      {/* Session Controls: Subject, Date, Hours */}
      <div className="glass-panel" style={{ padding: '1.25rem 1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', alignItems: 'flex-end' }}>
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Subject</label>
          <select
            value={selectedSubject}
            onChange={(e) => setSelectedSubject(e.target.value)}
            className="form-select"
          >
            <option value="FSD">CS501 • Full Stack Development</option>
            <option value="DBMS">CS502 • Database Management Systems</option>
          </select>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Session Date</label>
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="form-input"
          />
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label">Lecture Duration</label>
          <select
            value={sessionHours}
            onChange={(e) => setSessionHours(Number(e.target.value))}
            className="form-select"
          >
            <option value={1}>1 Hour (Standard Theory)</option>
            <option value={2}>2 Hours (Lab Practical)</option>
          </select>
        </div>

        <div>
          <button
            onClick={() => {
              attendanceRoster.forEach((s) => markAttendance(s.studentUid, selectedSubject, selectedDate, 'present', sessionHours));
              setMarkedToday(true);
            }}
            className="btn btn-primary"
            style={{ width: '100%' }}
          >
            Mark All Present
          </button>
        </div>
      </div>

      {/* Roster Table */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem' }}>Section A Student Roster</h3>
            <p style={{ fontSize: '0.8rem' }}>Attendance percentages recalculate dynamically upon each attendance submission.</p>
          </div>
          {markedToday && <span className="badge badge-success">✓ Session Saved to Database</span>}
        </div>

        <div className="table-container">
          <table className="hive-table">
            <thead>
              <tr>
                <th>Student USN & Name</th>
                <th>Cumulative Attended</th>
                <th>Current %</th>
                <th>Status</th>
                <th>Today's Action</th>
                <th>Threshold Enforcement</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRoster.map((st) => {
                const isWarning = st.percentage < 75;

                return (
                  <tr key={st.studentUid}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{st.studentName}</div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                        {st.usn}
                      </span>
                    </td>
                    <td>
                      <strong>{st.attended}</strong> / {st.total} classes
                    </td>
                    <td>
                      <span
                        style={{
                          fontWeight: 800,
                          fontSize: '1rem',
                          color: isWarning ? 'var(--color-danger)' : 'var(--color-success)'
                        }}
                      >
                        {st.percentage}%
                      </span>
                    </td>
                    <td>
                      {isWarning ? (
                        <span className="badge badge-danger">
                          <AlertTriangle size={12} /> Below 75%
                        </span>
                      ) : (
                        <span className="badge badge-success">✓ Compliant</span>
                      )}
                    </td>
                    <td>
                      <div style={{ display: 'flex', gap: '6px' }}>
                        <button
                          onClick={() => handleMark(st.studentUid, 'present')}
                          className="btn btn-sm btn-success"
                          title="Mark Present"
                        >
                          <CheckCircle2 size={14} /> Present
                        </button>
                        <button
                          onClick={() => handleMark(st.studentUid, 'absent')}
                          className="btn btn-sm btn-danger"
                          title="Mark Absent"
                        >
                          <XCircle size={14} /> Absent
                        </button>
                      </div>
                    </td>
                    <td>
                      {isWarning ? (
                        <button
                          onClick={() => handleSendWarning(st)}
                          className="btn btn-sm btn-secondary"
                          style={{ borderColor: 'var(--color-danger)', color: 'var(--color-danger)', fontSize: '0.75rem' }}
                          title="Transmit SMS and Email alert to student & parents"
                        >
                          <Mail size={13} /> Send Warning (SMS/Email)
                        </button>
                      ) : (
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>No Action Needed</span>
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
