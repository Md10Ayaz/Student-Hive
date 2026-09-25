import React from 'react';
import { Calendar, Clock, Flag, Award, BookOpen } from 'lucide-react';

export default function AcademicCalendar() {
  const milestones = [
    { date: 'Aug 01, 2026', title: 'Commencement of Semester 5 Classes', category: 'Academic', color: 'var(--dept-cse)' },
    { date: 'Aug 25 - Aug 28, 2026', title: 'First Continuous Internal Assessment (CIE-1)', category: 'Exam', color: 'var(--dept-mech)' },
    { date: 'Sep 25, 2026', title: 'Mid-Term Lab Submissions Deadline', category: 'Submission', color: 'var(--color-warning)' },
    { date: 'Oct 02, 2026', title: 'Gandhi Jayanti (Holiday)', category: 'Holiday', color: 'var(--color-danger)' },
    { date: 'Oct 10 - Oct 12, 2026', title: 'Tarang 2026 — Annual College Festival', category: 'Event', color: 'var(--dept-eee)' },
    { date: 'Oct 20, 2026', title: 'Last Working Day & Syllabus Completion', category: 'Academic', color: 'var(--dept-cse)' },
    { date: 'Oct 26, 2026', title: 'Semester-End Theory Examinations Begin', category: 'Exam', color: 'var(--color-danger)' },
    { date: 'Nov 18, 2026', title: 'Winter Vacation & Internship Period Begins', category: 'Academic', color: 'var(--color-success)' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Academic Calendar 2026-2027</h1>
        <p style={{ fontSize: '0.85rem' }}>Official university timeline for semester progression, examinations, and holidays.</p>
      </div>

      <div className="glass-panel" style={{ padding: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', position: 'relative' }}>
          {milestones.map((m, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div
                style={{
                  width: '14px',
                  height: '14px',
                  borderRadius: '50%',
                  background: m.color,
                  marginTop: '4px',
                  boxShadow: `0 0 10px ${m.color}`,
                  flexShrink: 0
                }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2px' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: m.color }}>{m.date}</span>
                  <span className="badge" style={{ background: 'var(--badge-bg)', fontSize: '0.68rem' }}>
                    {m.category}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 600 }}>{m.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
