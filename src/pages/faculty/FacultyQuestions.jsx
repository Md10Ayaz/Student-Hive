import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { HelpCircle, MessageSquare, Send, CheckCircle2 } from 'lucide-react';

export default function FacultyQuestions() {
  const { currentUser } = useAuth();
  const { questions, answerQuestion } = useData();
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [answerText, setAnswerText] = useState('');

  const handleAnswerSubmit = (e) => {
    e.preventDefault();
    if (!selectedQuestion || !answerText.trim()) return;
    answerQuestion(selectedQuestion.id, answerText, currentUser?.name);
    setSelectedQuestion(null);
    setAnswerText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Student Academic Doubts & Queries</h1>
        <p style={{ fontSize: '0.85rem' }}>Review student conceptual inquiries and provide authoritative explanations.</p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {questions.map((q) => (
          <div key={q.id} className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge badge-dept">{q.subjectName}</span>
                <span className="badge" style={{ background: 'var(--badge-bg)' }}>{q.topic}</span>
              </div>
              <span className={`badge ${q.status === 'resolved' ? 'badge-success' : 'badge-warning'}`}>
                {q.status === 'resolved' ? '✓ Answered' : 'Awaiting Faculty Response'}
              </span>
            </div>

            <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem' }}>"{q.question}"</h3>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'block', marginBottom: '1rem' }}>
              Submitted by: {q.studentName} ({q.publicId}) • {new Date(q.createdAt).toLocaleDateString()}
            </span>

            {q.answer ? (
              <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'var(--bg-surface)', borderLeft: '4px solid var(--dept-cse)' }}>
                <strong style={{ fontSize: '0.85rem', color: 'var(--dept-cse)', display: 'block', marginBottom: '4px' }}>
                  Your Answer ({q.answer.facultyName}):
                </strong>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-primary)' }}>{q.answer.text}</p>
              </div>
            ) : (
              <button
                onClick={() => {
                  setSelectedQuestion(q);
                  setAnswerText('');
                }}
                className="btn btn-primary btn-sm"
              >
                <MessageSquare size={14} /> Answer This Doubt
              </button>
            )}
          </div>
        ))}
      </div>

      {selectedQuestion && (
        <div className="modal-overlay" onClick={() => setSelectedQuestion(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem' }}>Provide Faculty Answer</h3>
              <button onClick={() => setSelectedQuestion(null)} className="btn btn-ghost btn-sm">✕</button>
            </div>
            <form onSubmit={handleAnswerSubmit}>
              <div className="modal-body">
                <div style={{ marginBottom: '1rem' }}>
                  <span className="badge badge-dept">{selectedQuestion.subjectName}</span>
                  <h4 style={{ marginTop: '6px' }}>"{selectedQuestion.question}"</h4>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Student: {selectedQuestion.studentName}
                  </span>
                </div>

                <div className="form-group">
                  <label className="form-label">Explanation & Solution</label>
                  <textarea
                    rows={5}
                    required
                    value={answerText}
                    onChange={(e) => setAnswerText(e.target.value)}
                    className="form-textarea"
                    placeholder="Provide clear technical conceptual explanation..."
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setSelectedQuestion(null)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Publish Answer to Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
