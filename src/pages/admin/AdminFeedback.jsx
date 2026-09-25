import React from 'react';
import { useData } from '../../context/DataContext';
import { Star, ShieldCheck, TrendingUp, Users, Award } from 'lucide-react';

export default function AdminFeedback() {
  const { faculty, feedbackList } = useData();

  const mockFeedbackSummary = [
    {
      facultyId: 'FAC-CSE-001',
      name: 'Dr. Rajesh Sharma',
      department: 'Computer Science',
      overallRating: 4.8,
      totalResponses: 58,
      clarity: 4.9,
      communication: 4.7,
      knowledge: 5.0,
      organization: 4.6,
      topCompliment: 'Exceptional real-world software architecture demos and very accessible during lab sessions.'
    },
    {
      facultyId: 'FAC-CSE-002',
      name: 'Prof. Ananya Roy',
      department: 'Computer Science',
      overallRating: 4.6,
      totalResponses: 54,
      clarity: 4.6,
      communication: 4.8,
      knowledge: 4.7,
      organization: 4.5,
      topCompliment: 'Great concurrency examples and thorough code review feedback on programming assignments.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Institutional Faculty Appraisal & Analytics</h1>
        <p style={{ fontSize: '0.85rem' }}>
          Aggregated end-semester pedagogical metrics reviewed exclusively by the Academic Dean and Quality Council.
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {mockFeedbackSummary.map((f) => (
          <div key={f.facultyId} className="glass-panel" style={{ padding: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <span className="badge badge-dept" style={{ marginBottom: '4px' }}>{f.department}</span>
                <h2 style={{ fontSize: '1.3rem' }}>{f.name}</h2>
                <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>ID: {f.facultyId}</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '1.8rem', fontWeight: 900, color: '#f59e0b' }}>
                    <Star size={24} fill="#f59e0b" color="#f59e0b" />
                    <span>{f.overallRating}</span>
                  </div>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Based on {f.totalResponses} student submissions
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '10px', marginBottom: '1.25rem' }}>
              <div style={{ padding: '10px 12px', background: 'var(--bg-surface)', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Teaching Clarity</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '2px', color: 'var(--dept-cse)' }}>
                  ★ {f.clarity} / 5.0
                </div>
              </div>

              <div style={{ padding: '10px 12px', background: 'var(--bg-surface)', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Communication</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '2px', color: 'var(--dept-mech)' }}>
                  ★ {f.communication} / 5.0
                </div>
              </div>

              <div style={{ padding: '10px 12px', background: 'var(--bg-surface)', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Subject Knowledge</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '2px', color: 'var(--dept-eee)' }}>
                  ★ {f.knowledge} / 5.0
                </div>
              </div>

              <div style={{ padding: '10px 12px', background: 'var(--bg-surface)', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Course Organization</span>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, marginTop: '2px', color: 'var(--dept-mme)' }}>
                  ★ {f.organization} / 5.0
                </div>
              </div>
            </div>

            <div style={{ padding: '12px 14px', borderRadius: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
              <strong style={{ color: 'var(--dept-cse)' }}>Key Student Highlight: </strong>
              <span style={{ color: 'var(--text-primary)', fontStyle: 'italic' }}>"{f.topCompliment}"</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
