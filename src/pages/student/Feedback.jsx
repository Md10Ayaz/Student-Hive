import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Star, Shield, CheckCircle2, Send } from 'lucide-react';

export default function StudentFeedback() {
  const { subjects, submitFeedback } = useData();
  const [selectedSubject, setSelectedSubject] = useState('FSD');
  const [ratings, setRatings] = useState({
    clarity: 5,
    communication: 4,
    knowledge: 5,
    organization: 4
  });
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleRatingChange = (key, val) => {
    setRatings((prev) => ({ ...prev, [key]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    submitFeedback('FAC-CSE-001', selectedSubject, ratings, comments);
    setSubmitted(true);
  };

  const renderStars = (key, currentVal) => (
    <div style={{ display: 'flex', gap: '6px' }}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => handleRatingChange(key, star)}
          className="btn-icon btn-ghost"
          style={{ width: '32px', height: '32px', cursor: 'pointer' }}
        >
          <Star
            size={22}
            fill={star <= currentVal ? '#f59e0b' : 'transparent'}
            color={star <= currentVal ? '#f59e0b' : 'var(--text-muted)'}
          />
        </button>
      ))}
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
      {/* Title */}
      <div>
        <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>End-Semester Faculty Feedback</h1>
        <p style={{ fontSize: '0.85rem' }}>
          Evaluate pedagogical clarity, course pacing, and mentorship. Your ratings are 100% confidential and aggregated for institutional quality improvement.
        </p>
      </div>

      {submitted ? (
        <div className="glass-panel" style={{ padding: '3rem 2rem', textAlign: 'center' }}>
          <CheckCircle2 size={48} color="var(--color-success)" style={{ margin: '0 auto 1rem' }} />
          <h2 style={{ fontSize: '1.4rem', marginBottom: '0.5rem' }}>Thank You for Your Feedback!</h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', maxWidth: '450px', margin: '0 auto 1.5rem' }}>
            Your anonymous response has been submitted to the Academic Dean’s Quality Assurance Council.
          </p>
          <button onClick={() => setSubmitted(false)} className="btn btn-secondary">
            Submit Feedback for Another Subject
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-panel" style={{ padding: '2rem' }}>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Select Course & Faculty</label>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="form-select"
            >
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.code}) — {s.facultyName}
                </option>
              ))}
            </select>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderRadius: '10px', background: 'var(--bg-surface)' }}>
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block' }}>Teaching Clarity & Delivery</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Explanation of complex technical principles</span>
              </div>
              {renderStars('clarity', ratings.clarity)}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderRadius: '10px', background: 'var(--bg-surface)' }}>
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block' }}>Communication & Approachability</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Student query resolution and mentorship</span>
              </div>
              {renderStars('communication', ratings.communication)}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderRadius: '10px', background: 'var(--bg-surface)' }}>
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block' }}>Subject Knowledge & Practical Depth</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Real-world code patterns and industry relevance</span>
              </div>
              {renderStars('knowledge', ratings.knowledge)}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 14px', borderRadius: '10px', background: 'var(--bg-surface)' }}>
              <div>
                <strong style={{ fontSize: '0.9rem', display: 'block' }}>Course Organization & Pacing</strong>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Syllabus adherence, timeliness of evaluations</span>
              </div>
              {renderStars('organization', ratings.organization)}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Constructive Suggestions & Comments</label>
            <textarea
              rows={4}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="form-textarea"
              placeholder="e.g. Would love additional live coding walkthroughs during practical sessions..."
            />
          </div>

          <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'var(--badge-bg)', border: '1px solid var(--border-subtle)', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={16} color="var(--dept-cse)" />
            <span>
              Per university governance regulations, feedback is aggregated so individual ratings cannot be linked back to individual students.
            </span>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.8rem' }}>
            <Send size={16} /> Submit Confidential Evaluation
          </button>
        </form>
      )}
    </div>
  );
}
