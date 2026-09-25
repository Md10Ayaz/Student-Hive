import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { Award, Plus, Download, FileCheck, Calendar, ExternalLink } from 'lucide-react';

export default function CertificateWallet() {
  const { certificates, uploadCertificate } = useData();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [category, setCategory] = useState('Hackathon');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !issuer.trim()) return;
    uploadCertificate(title, issuer, category);
    setShowModal(false);
    setTitle('');
    setIssuer('');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Verified Certificate Wallet</h1>
          <p style={{ fontSize: '0.85rem' }}>Store and showcase hackathons, workshops, internships, and sports credentials.</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary">
          <Plus size={16} /> Upload Certificate
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        {certificates.map((cert) => (
          <div key={cert.id} className="glass-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span className="badge badge-dept">{cert.category}</span>
                <Award size={20} color="var(--dept-cse)" />
              </div>

              <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem', lineHeight: 1.35 }}>{cert.title}</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                Issued by: <strong>{cert.issuer}</strong>
              </p>

              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                <Calendar size={13} />
                <span>Issue Date: {cert.date}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
              <button
                onClick={() => alert(`Downloading verified digital PDF credential: ${cert.fileName}`)}
                className="btn btn-secondary btn-sm"
                style={{ flex: 1 }}
              >
                <Download size={14} /> Download PDF
              </button>
              <button
                onClick={() => alert(`Verifying cryptographic hash for ${cert.title} with university registrar... Status: Validated`)}
                className="btn btn-ghost btn-sm"
                title="Verify cryptographic authenticity"
              >
                <FileCheck size={14} /> Verify
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 style={{ fontSize: '1.2rem' }}>Add Certificate to Digital Wallet</h3>
              <button onClick={() => setShowModal(false)} className="btn btn-ghost btn-sm">✕</button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="form-group">
                  <label className="form-label">Certificate Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="form-input"
                    placeholder="e.g. AWS Certified Cloud Practitioner"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Issuing Authority / Organization</label>
                  <input
                    type="text"
                    required
                    value={issuer}
                    onChange={(e) => setIssuer(e.target.value)}
                    className="form-input"
                    placeholder="e.g. Amazon Web Services / IEEE"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="form-select"
                  >
                    <option value="Hackathon">Hackathon & Coding</option>
                    <option value="Workshop">Workshop & Bootcamp</option>
                    <option value="Internship">Internship Completion</option>
                    <option value="Sports">Athletics & Sports</option>
                    <option value="Seminar">Conference & Seminar</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Certificate File (PDF or Image)</label>
                  <input type="file" className="form-input" />
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" onClick={() => setShowModal(false)} className="btn btn-secondary">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save to Wallet
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
