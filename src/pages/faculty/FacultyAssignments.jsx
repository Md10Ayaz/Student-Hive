import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  FileText,
  Plus,
  CheckCircle,
  Download,
  Calendar,
  Award,
  MessageSquare,
  Sparkles
} from 'lucide-react';

export default function FacultyAssignments() {
  const { assignments, createAssignment, gradeAssignment } = useData();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [marksGiven, setMarksGiven] = useState(19);
  const [feedbackText, setFeedbackText] = useState('');

  // Form states for creating assignment
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subjectId, setSubjectId] = useState('FSD');
  const [deadline, setDeadline] = useState('2026-09-30T23:59');
  const [maxMarks, setMaxMarks] = useState(20);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    createAssignment({
      title,
      description,
      subjectId,
      subjectName: subjectId === 'FSD' ? 'Full Stack Development' : 'Database Management Systems',
      deadline,
      maxMarks: Number(maxMarks),
      facultyName: 'Dr. Rajesh Sharma',
      attachmentName: 'Assignment_Specs.pdf'
    });

    setShowCreateModal(false);
    setTitle('');
    setDescription('');
  };

  const handleGrade = (e) => {
    e.preventDefault();
    if (!selectedSubmission) return;
    gradeAssignment(selectedSubmission.id, marksGiven, feedbackText);
    setSelectedSubmission(null);
    setFeedbackText('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Title & Create Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Assignment Publishing & Grading Desk</h1>
          <p style={{ fontSize: '0.85rem' }}>Create coursework specifications, review student submissions, and assign rubrics.</p>
        </div>
        <button onClick={() => setShowCreateModal(true)} className="btn btn-primary">
          <Plus size={16} /> Create Assignment
        </button>
      </div>

      {/* Assignments & Submissions List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {assignments.map((asg) => (
          <div key={asg.id} className="glass-panel" style={{ padding: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
              <div>
                <span className="badge badge-dept" style={{ marginBottom: '4px' }}>{asg.subjectName}</span>
                <h3 style={{ fontSize: '1.2rem' }}>{asg.title}</h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span className="badge" style={{ background: 'var(--badge-bg)' }}>
                  Max Marks: {asg.maxMarks}
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Due: {new Date(asg.deadline).toLocaleDateString()}
                </span>
              </div>
            </div>

            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              {asg.description}
            </p>

            {/* Submissions Section */}
            {asg.submission ? (
              <div
                style={{
                  padding: '12px 16px',
                  borderRadius: '12px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{ fontWeight: 700, fontSize: '0.85rem' }}>Mohammed Ayaz (1XX23CS001)</span>
                    <span className="badge badge-success" style={{ fontSize: '0.68rem' }}>Submitted</span>
                  </div>
                  <span style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                    File: <strong>{asg.submission.fileName}</strong> ({asg.submission.fileSize}) • {asg.submission.comments}
                  </span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    onClick={() => alert(`Downloading student file: ${asg.submission.fileName}`)}
                    className="btn btn-secondary btn-sm"
                  >
                    <Download size={14} /> Download File
                  </button>

                  <button
                    onClick={() => {
                      setSelectedSubmission(asg);
                      setMarksGiven(asg.marksAwarded || 19);
                      setFeedbackText(asg.facultyFeedback || 'Good effort.');
                    }}
                    className="btn btn-primary btn-sm"
                  >
                    <Award size={14} /> {asg.marksAwarded !== undefined ? 'Update Grade' : 'Grade Submission'}
                  </button>
                </div>
              </div>
            ) : (
              <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'var(--badge-bg)', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Waiting for student submissions prior to deadline.
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Create Assignment Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem' }}>Create Coursework Assignment</h3>
              <button onClick={() => setShowCreateModal(false)} className="btn btn-ghost btn-sm">✕</button>
            </div>
            <form onSubmit={handleCreate}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Course Subject</label>
                  <select
                    value={subjectId}
                    onChange={(e) => setSubjectId(e.target.value)}
                    className="form-select"
                  >
                    <option value="FSD">Full Stack Development</option>
                    <option value="DBMS">Database Management Systems</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Assignment Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input"
                    placeholder="e.g. Redux Toolkit vs Zustand Architecture"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Problem Statement / Instructions</label>
                  <textarea
                    rows={4}
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="form-textarea"
                    placeholder="Detailed rubric and submission instructions..."
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div className="form-group">
                    <label className="form-label">Submission Deadline</label>
                    <input
                      type="datetime-local"
                      required
                      value={deadline}
                      onChange={(e) => setDeadline(e.target.value)}
                      className="form-input"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Maximum Marks</label>
                    <input
                      type="number"
                      required
                      min={5}
                      max={50}
                      value={maxMarks}
                      onChange={(e) => setMaxMarks(e.target.value)}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowCreateModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Publish to Students
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Grade Modal */}
      {selectedSubmission && (
        <div className="modal-overlay" onClick={() => setSelectedSubmission(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem' }}>Grade Student Deliverable</h3>
              <button onClick={() => setSelectedSubmission(null)} className="btn btn-ghost btn-sm">✕</button>
            </div>
            <form onSubmit={handleGrade}>
              <div className="modal-body">
                <div style={{ marginBottom: '1rem' }}>
                  <strong>{selectedSubmission.title}</strong>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                    Student: Mohammed Ayaz (1XX23CS001)
                  </p>
                </div>

                <div className="form-group">
                  <label className="form-label">Awarded Score (Out of {selectedSubmission.maxMarks})</label>
                  <input
                    type="number"
                    min={0}
                    max={selectedSubmission.maxMarks}
                    required
                    value={marksGiven}
                    onChange={(e) => setMarksGiven(e.target.value)}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Constructive Feedback Comments</label>
                  <textarea
                    rows={3}
                    required
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="form-textarea"
                    placeholder="Provide specific feedback on code quality, testing, or documentation..."
                  />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setSelectedSubmission(null)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save & Notify Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
