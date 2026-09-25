import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { BookOpen, Plus, UploadCloud, Download, FileText, CheckCircle2 } from 'lucide-react';

export default function FacultyMaterials() {
  const { materials } = useData();
  const [items, setItems] = useState(materials);
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [subjectId, setSubjectId] = useState('FSD');
  const [topic, setTopic] = useState('');
  const [fileType, setFileType] = useState('PDF');

  const handleUpload = (e) => {
    e.preventDefault();
    if (!title.trim() || !topic.trim()) return;

    const newMat = {
      id: `mat-${Date.now()}`,
      deptId: 'cse',
      semester: 5,
      subjectId,
      subjectName: subjectId === 'FSD' ? 'Full Stack Development' : 'Database Management Systems',
      topic,
      title,
      fileType,
      size: '3.8 MB',
      downloads: 0,
      uploadedBy: 'Dr. Rajesh Sharma',
      uploadDate: new Date().toISOString().split('T')[0]
    };

    setItems([newMat, ...items]);
    setShowModal(false);
    setTitle('');
    setTopic('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Curriculum Materials Distribution</h1>
          <p style={{ fontSize: '0.85rem' }}>Upload lecture notes, presentation decks, and laboratory manuals for enrolled students.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={16} /> Upload Study Material
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {items.map((mat) => (
          <div key={mat.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                <span className="badge badge-dept">{mat.subjectId}</span>
                <span className="badge" style={{ background: 'var(--badge-bg)' }}>{mat.fileType}</span>
              </div>
              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem' }}>{mat.title}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                Topic: <strong>{mat.topic}</strong> • Size: {mat.size}
              </p>
            </div>
            <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Uploaded on {mat.uploadDate} • {mat.downloads} student downloads
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem' }}>Upload Course Material</h3>
              <button onClick={() => setShowModal(false)} className="btn btn-ghost btn-sm">✕</button>
            </div>
            <form onSubmit={handleUpload}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Subject</label>
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
                  <label className="form-label">Topic / Unit</label>
                  <input
                    type="text"
                    required
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    className="form-input"
                    placeholder="e.g. Firebase Firestore Integration"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Resource Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input"
                    placeholder="e.g. Unit 5 Firestore Security Rules Architecture"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">File Format</label>
                  <select
                    value={fileType}
                    onChange={(e) => setFileType(e.target.value)}
                    className="form-select"
                  >
                    <option value="PDF">PDF Document</option>
                    <option value="PPTX">PowerPoint Deck (PPTX)</option>
                    <option value="DOCX">Word Document (DOCX)</option>
                    <option value="ZIP">Code Archive (ZIP)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Select File</label>
                  <input type="file" className="form-input" />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Upload & Distribute
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
