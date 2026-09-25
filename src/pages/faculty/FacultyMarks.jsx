import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Award, Save, CheckCircle2 } from 'lucide-react';

export default function FacultyMarks() {
  const { marks, saveMarks } = useData();
  const [selectedSubject, setSelectedSubject] = useState('FSD');
  const [internal, setInternal] = useState(38);
  const [activity, setActivity] = useState(9);
  const [assignment, setAssignment] = useState(18);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const currentCourse = marks.find((m) => m.subjectId === selectedSubject) || marks[0];

  const handleSave = (e) => {
    e.preventDefault();
    saveMarks(selectedSubject, Number(internal), Number(activity), Number(assignment));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Continuous Internal Assessment (CIE) Gradebook</h1>
        <p style={{ fontSize: '0.85rem' }}>Input and update internal examination, classroom activity, and assignment components.</p>
      </div>

      {savedSuccess && (
        <div style={{ padding: '0.85rem 1.25rem', borderRadius: '10px', background: 'var(--color-success-bg)', border: '1px solid var(--color-success)', color: 'var(--color-success)', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={18} />
          <span>✓ Student CIE records updated and synchronized to student portal!</span>
        </div>
      )}

      {/* Subject Selector & Edit Form */}
      <div className="glass-panel" style={{ padding: '1.75rem' }}>
        <form onSubmit={handleSave}>
          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Course Subject</label>
            <select
              value={selectedSubject}
              onChange={(e) => {
                const sub = e.target.value;
                setSelectedSubject(sub);
                const found = marks.find((m) => m.subjectId === sub);
                if (found) {
                  setInternal(found.internalMarks);
                  setActivity(found.activityMarks);
                  setAssignment(found.assignmentMarks);
                }
              }}
              className="form-select"
            >
              <option value="FSD">CS501 • Full Stack Development</option>
              <option value="DBMS">CS502 • Database Management Systems</option>
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
            <div className="form-group">
              <label className="form-label">Internal Exam Score (Max 40)</label>
              <input
                type="number"
                min={0}
                max={40}
                required
                value={internal}
                onChange={(e) => setInternal(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Activity & Viva Score (Max 10)</label>
              <input
                type="number"
                min={0}
                max={10}
                required
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Assignment Score (Max 20)</label>
              <input
                type="number"
                min={0}
                max={20}
                required
                value={assignment}
                onChange={(e) => setAssignment(e.target.value)}
                className="form-input"
              />
            </div>
          </div>

          <div style={{ padding: '12px 16px', borderRadius: '10px', background: 'var(--bg-surface)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Computed Total CIE</span>
              <div style={{ fontSize: '1.4rem', fontWeight: 900, color: 'var(--dept-cse)' }}>
                {Number(internal) + Number(activity) + Number(assignment)} / 70
              </div>
            </div>
            <span className="badge badge-success" style={{ fontSize: '0.9rem', padding: '0.35rem 0.8rem' }}>
              Projected Grade: {Number(internal) + Number(activity) + Number(assignment) >= 65 ? 'A+' : 'A'}
            </span>
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
            <Save size={16} /> Save & Publish Marks to Student Portal
          </button>
        </form>
      </div>
    </div>
  );
}
