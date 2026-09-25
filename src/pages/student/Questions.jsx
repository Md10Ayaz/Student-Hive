import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  HelpCircle,
  MessageSquare,
  CheckCircle,
  Clock,
  Send,
  Plus,
  Sparkles,
  Search,
  UserCheck
} from 'lucide-react';

export default function StudentQuestions() {
  const { currentUser } = useAuth();
  const { questions, subjects, askQuestion, toggleQuestionResolved } = useData();
  const [showAskModal, setShowAskModal] = useState(false);
  const [subjectId, setSubjectId] = useState('FSD');
  const [topic, setTopic] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  const handleAskSubmit = (e) => {
    e.preventDefault();
    if (!questionText.trim()) return;
    askQuestion(subjectId, topic || 'General Concept', questionText, currentUser);
    setShowAskModal(false);
    setTopic('');
    setQuestionText('');
  };

  const filteredQuestions = questions.filter((q) => {
    const term = searchTerm.toLowerCase();
    return (
      q.question.toLowerCase().includes(term) ||
      q.topic.toLowerCase().includes(term) ||
      q.subjectName.toLowerCase().includes(term)
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Title & Ask Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Academic Q&A Forum</h1>
          <p style={{ fontSize: '0.85rem' }}>Ask curriculum doubts directly to subject professors and explore peer solutions.</p>
        </div>
        <button onClick={() => setShowAskModal(true)} className="btn btn-primary">
          <Plus size={16} /> Ask a Question
        </button>
      </div>

      {/* Search Input */}
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="form-input"
          placeholder="Search questions by keyword, topic, or concept (e.g. useReducer, B-Tree)..."
          style={{ paddingLeft: '2.5rem' }}
        />
        <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
      </div>

      {/* Question Threads */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredQuestions.map((q) => {
          const isResolved = q.status === 'resolved';

          return (
            <div key={q.id} className="glass-panel" style={{ padding: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span className="badge badge-dept">{q.subjectName}</span>
                  <span className="badge" style={{ background: 'var(--badge-bg)' }}>{q.topic}</span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  {isResolved ? (
                    <span className="badge badge-success">✓ Answered & Resolved</span>
                  ) : (
                    <span className="badge badge-warning">Awaiting Professor Answer</span>
                  )}
                  <button
                    onClick={() => toggleQuestionResolved(q.id)}
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: '0.75rem', padding: '2px 8px' }}
                  >
                    Mark {isResolved ? 'Open' : 'Resolved'}
                  </button>
                </div>
              </div>

              {/* Question Text */}
              <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', lineHeight: 1.4 }}>
                "{q.question}"
              </h3>

              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '1.25rem' }}>
                Asked by <strong>{q.studentName}</strong> (ID: {q.publicId}) • {new Date(q.createdAt).toLocaleDateString()}
              </div>

              {/* Professor's Response */}
              {q.answer ? (
                <div
                  style={{
                    padding: '1.2rem',
                    borderRadius: '12px',
                    background: 'var(--bg-surface)',
                    borderLeft: '4px solid var(--dept-cse)',
                    border: '1px solid var(--border-subtle)',
                    borderLeftWidth: '4px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '0.5rem' }}>
                    <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'var(--dept-cse-glow)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <UserCheck size={14} color="var(--dept-cse)" />
                    </div>
                    <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--dept-cse)' }}>
                      {q.answer.facultyName} (Course Instructor)
                    </span>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      • {new Date(q.answer.answeredAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)', lineHeight: 1.55 }}>
                    {q.answer.text}
                  </p>
                </div>
              ) : (
                <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'var(--badge-bg)', fontSize: '0.8rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
                  Pending response from course faculty. You can review relevant textbook materials in the Study Materials section.
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Ask Question Modal */}
      {showAskModal && (
        <div className="modal-overlay" onClick={() => setShowAskModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem' }}>Post an Academic Question</h3>
              <button onClick={() => setShowAskModal(false)} className="btn btn-ghost btn-sm">✕</button>
            </div>
            <form onSubmit={handleAskSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Course Subject</label>
                  <select
                    value={subjectId}
                    onChange={(e) => setSubjectId(e.target.value)}
                    className="form-select"
                  >
                    {subjects.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} ({s.id})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Topic / Unit</label>
                  <input
                    type="text"
                    required
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="form-input"
                    placeholder="e.g. React useReducer or B+ Tree Splitting"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Your Question & Doubts</label>
                  <textarea
                    rows={4}
                    required
                    value={questionText}
                    onChange={(e) => setQuestionText(e.target.value)}
                    className="form-textarea"
                    placeholder="State your conceptual question clearly..."
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowAskModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Send size={15} /> Publish Question
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
