import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  FileText,
  UploadCloud,
  CheckCircle,
  Clock,
  AlertCircle,
  FileCheck,
  Download,
  Calendar,
  MessageSquare
} from 'lucide-react';

export default function StudentAssignments() {
  const { assignments, submitAssignment } = useData();
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [file, setFile] = useState(null);
  const [comments, setComments] = useState('');
  const [filter, setFilter] = useState('all'); // 'all' | 'pending' | 'submitted' | 'late'

  const filteredAssignments = assignments.filter((asg) => {
    if (filter === 'all') return true;
    return asg.status === filter;
  });

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!selectedAssignment) return;
    submitAssignment(selectedAssignment.id, file, comments);
    setSelectedAssignment(null);
    setFile(null);
    setComments('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Title & Filter Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Assignments & Submissions</h1>
          <p style={{ fontSize: '0.85rem' }}>Upload coursework deliverables and review faculty evaluations.</p>
        </div>

        <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-surface)', padding: '4px', borderRadius: '12px', border: '1px solid var(--border-subtle)' }}>
          <button
            onClick={() => setFilter('all')}
            className={`btn btn-sm ${filter === 'all' ? 'btn-primary' : 'btn-ghost'}`}
          >
            All ({assignments.length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`btn btn-sm ${filter === 'pending' ? 'btn-primary' : 'btn-ghost'}`}
          >
            Pending ({assignments.filter((a) => a.status === 'pending').length})
          </button>
          <button
            onClick={() => setFilter('submitted')}
            className={`btn btn-sm ${filter === 'submitted' ? 'btn-primary' : 'btn-ghost'}`}
          >
            Submitted ({assignments.filter((a) => a.status === 'submitted').length})
          </button>
        </div>
      </div>

      {/* Assignment Cards List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredAssignments.map((asg) => {
          const isPending = asg.status === 'pending';
          const isSubmitted = asg.status === 'submitted';
          const isLate = asg.status === 'late';

          return (
            <div
              key={asg.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: `4px solid ${
                  isSubmitted ? 'var(--color-success)' : isPending ? 'var(--color-warning)' : 'var(--color-danger)'
                }`
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <span className="badge badge-dept">{asg.subjectName}</span>
                  {isSubmitted && <span className="badge badge-success">🟢 Submitted</span>}
                  {isPending && <span className="badge badge-warning">🟡 Pending Submission</span>}
                  {isLate && <span className="badge badge-danger">🔴 Late Evaluated</span>}
                </div>

                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.5rem', lineHeight: 1.3 }}>{asg.title}</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem', lineHeight: 1.5 }}>
                  {asg.description}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} />
                    <span>Due: {new Date(asg.deadline).toLocaleDateString()}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FileText size={14} />
                    <span>Max Marks: {asg.maxMarks}</span>
                  </div>
                </div>

                {asg.attachmentName && (
                  <div
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      background: 'var(--bg-surface)',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '1rem',
                      fontSize: '0.78rem'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Download size={14} color="var(--dept-cse)" />
                      <span>{asg.attachmentName}</span>
                    </div>
                    <span style={{ color: 'var(--dept-cse)', fontWeight: 600, cursor: 'pointer' }}>Download Specs</span>
                  </div>
                )}

                {/* Submission Details & Faculty Feedback */}
                {asg.submission && (
                  <div
                    style={{
                      padding: '10px 12px',
                      borderRadius: '10px',
                      background: 'var(--badge-bg)',
                      border: '1px solid var(--border-subtle)',
                      marginBottom: '1rem'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: 600, marginBottom: '4px' }}>
                      <span>Your File: {asg.submission.fileName}</span>
                      <span style={{ color: 'var(--color-success)' }}>✓ Received</span>
                    </div>
                    {asg.marksAwarded !== undefined && (
                      <div style={{ marginTop: '6px', fontSize: '0.85rem' }}>
                        <span style={{ fontWeight: 700, color: 'var(--dept-cse)' }}>
                          Awarded Marks: {asg.marksAwarded} / {asg.maxMarks}
                        </span>
                        {asg.facultyFeedback && (
                          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '4px', fontStyle: 'italic' }}>
                            "{asg.facultyFeedback}"
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', marginTop: '0.5rem' }}>
                {isPending ? (
                  <button
                    onClick={() => setSelectedAssignment(asg)}
                    className="btn btn-primary"
                    style={{ width: '100%', fontSize: '0.85rem' }}
                  >
                    <UploadCloud size={16} /> Submit Assignment
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedAssignment(asg)}
                    className="btn btn-secondary"
                    style={{ width: '100%', fontSize: '0.85rem' }}
                  >
                    <FileCheck size={16} /> Update Submission
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Submission Modal */}
      {selectedAssignment && (
        <div className="modal-overlay" onClick={() => setSelectedAssignment(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <h3 style={{ fontSize: '1.2rem' }}>Upload Assignment Solution</h3>
                <span style={{ fontSize: '0.78rem', color: 'var(--dept-cse)' }}>
                  {selectedAssignment.subjectName} • {selectedAssignment.title}
                </span>
              </div>
              <button onClick={() => setSelectedAssignment(null)} className="btn btn-ghost btn-sm">
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className="modal-body">
                {/* Drag and Drop Upload Area */}
                <div
                  style={{
                    border: '2px dashed var(--border-strong)',
                    borderRadius: '12px',
                    padding: '2rem 1.5rem',
                    textAlign: 'center',
                    background: 'var(--bg-surface)',
                    marginBottom: '1.25rem',
                    cursor: 'pointer'
                  }}
                  onClick={() => document.getElementById('file-upload-input').click()}
                >
                  <UploadCloud size={38} color="var(--dept-cse)" style={{ margin: '0 auto 0.75rem' }} />
                  <p style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                    {file ? file.name : 'Click to select or drag and drop your report/code file'}
                  </p>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    Accepted formats: PDF, DOC, DOCX, ZIP (Max 25MB)
                  </span>
                  <input
                    id="file-upload-input"
                    type="file"
                    style={{ display: 'none' }}
                    onChange={handleFileChange}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Submission Notes / Git Repository Link</label>
                  <textarea
                    rows={3}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    className="form-textarea"
                    placeholder="e.g. Includes unit tests and Dockerfile instructions."
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button
                  type="button"
                  onClick={() => setSelectedAssignment(null)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Confirm Submission
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
