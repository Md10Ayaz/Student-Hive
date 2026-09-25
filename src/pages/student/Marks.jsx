import React from 'react';
import { useData } from '../../context/DataContext';
import { Award, TrendingUp, CheckCircle, FileText, Activity } from 'lucide-react';

export default function StudentMarks() {
  const { marks } = useData();

  const totalPossible = marks.reduce((sum, m) => sum + m.maxTotal, 0);
  const totalScored = marks.reduce((sum, m) => sum + m.totalScored, 0);
  const aggregatePercentage = ((totalScored / totalPossible) * 100).toFixed(1);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Continuous Internal Assessment (CIE)</h1>
          <p style={{ fontSize: '0.85rem' }}>
            Official breakdown of Internal Exams, Classroom Activities, and Assignment evaluations.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <span className="badge badge-dept" style={{ padding: '0.4rem 0.9rem', fontSize: '0.85rem' }}>
            Aggregate CIE: {aggregatePercentage}% ({totalScored}/{totalPossible})
          </span>
        </div>
      </div>

      {/* Featured Subject Highlight Card (PRD Example: Full Stack Development 65/70) */}
      <div
        className="glass-panel"
        style={{
          padding: '1.5rem',
          background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
          border: '1px solid var(--border-medium)'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--dept-cse)', textTransform: 'uppercase' }}>
              Core Specialization Track
            </span>
            <h2 style={{ fontSize: '1.4rem', marginTop: '2px' }}>Full Stack Development (CS501)</h2>
          </div>
          <span className="badge badge-success" style={{ fontSize: '0.9rem', padding: '0.35rem 0.8rem' }}>
            Grade: A+ (Outstanding)
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px', marginBottom: '1.25rem' }}>
          <div style={{ padding: '12px', background: 'var(--bg-surface)', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Internal Exam</span>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              38 <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ 40</span>
            </div>
          </div>

          <div style={{ padding: '12px', background: 'var(--bg-surface)', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Activity & Lab Viva</span>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              9 <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ 10</span>
            </div>
          </div>

          <div style={{ padding: '12px', background: 'var(--bg-surface)', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Assignment Marks</span>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '2px' }}>
              18 <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ 20</span>
            </div>
          </div>

          <div style={{ padding: '12px', background: 'var(--bg-surface)', borderRadius: '10px', border: '1px solid var(--dept-cse)' }}>
            <span style={{ fontSize: '0.75rem', color: 'var(--dept-cse)', fontWeight: 700 }}>Total Scored</span>
            <div style={{ fontSize: '1.3rem', fontWeight: 900, color: 'var(--dept-cse)', marginTop: '2px' }}>
              65 <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 500 }}>/ 70 (92.8%)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Comprehensive Semester Marks Table */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>
        <h3 style={{ fontSize: '1.1rem', marginBottom: '1.25rem' }}>All Registered Semester 5 Courses</h3>

        <div className="table-container">
          <table className="hive-table">
            <thead>
              <tr>
                <th>Subject Name & Code</th>
                <th>Internal (40)</th>
                <th>Activity (10)</th>
                <th>Assignments (20)</th>
                <th>Total CIE (70)</th>
                <th>Grade</th>
                <th>Performance</th>
              </tr>
            </thead>
            <tbody>
              {marks.map((sub) => {
                const percentage = ((sub.totalScored / sub.maxTotal) * 100).toFixed(1);
                return (
                  <tr key={sub.subjectId}>
                    <td>
                      <div style={{ fontWeight: 600 }}>{sub.subjectName}</div>
                      <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{sub.code}</span>
                    </td>
                    <td style={{ fontWeight: 700 }}>{sub.internalMarks} / {sub.maxInternal}</td>
                    <td style={{ fontWeight: 700 }}>{sub.activityMarks} / {sub.maxActivity}</td>
                    <td style={{ fontWeight: 700 }}>{sub.assignmentMarks} / {sub.maxAssignment}</td>
                    <td>
                      <span style={{ fontWeight: 900, fontSize: '0.95rem', color: 'var(--dept-cse)' }}>
                        {sub.totalScored}
                      </span>{' '}
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>/ {sub.maxTotal}</span>
                    </td>
                    <td>
                      <span className="badge badge-success">{sub.grade}</span>
                    </td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '0.82rem', fontWeight: 700, width: '40px' }}>{percentage}%</span>
                        <div style={{ width: '80px', height: '6px', background: 'var(--bg-elevated)', borderRadius: '3px', overflow: 'hidden' }}>
                          <div
                            style={{
                              width: `${percentage}%`,
                              height: '100%',
                              background: 'var(--grad-primary)'
                            }}
                          />
                        </div>
                      </div>
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
