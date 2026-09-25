import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  BookOpen,
  FileText,
  Download,
  Search,
  Filter,
  Bookmark,
  BookmarkCheck,
  FolderTree,
  ExternalLink
} from 'lucide-react';

export default function StudyMaterials() {
  const { materials, subjects } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [bookmarkedIds, setBookmarkedIds] = useState(new Set(['mat-001']));

  const toggleBookmark = (id) => {
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filteredMaterials = materials.filter((m) => {
    const matchesSubject = selectedSubject === 'ALL' || m.subjectId === selectedSubject;
    const matchesSearch =
      m.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.topic.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSubject && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Academic Study Materials</h1>
          <p style={{ fontSize: '0.85rem' }}>
            Curated lecture notes, slide decks, and question banks categorized by department and topic.
          </p>
        </div>

        {/* Hierarchy Breadcrumb Pill */}
        <div style={{ padding: '6px 12px', borderRadius: '10px', background: 'var(--badge-bg)', border: '1px solid var(--border-subtle)', fontSize: '0.78rem' }}>
          <span style={{ color: 'var(--dept-cse)', fontWeight: 600 }}>CSE</span> → <span>Semester 5</span> → <span>Curriculum Repository</span>
        </div>
      </div>

      {/* Search & Subject Filters */}
      <div className="glass-panel" style={{ padding: '1rem 1.25rem', display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ position: 'relative', flex: '1', minWidth: '240px' }}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-input"
            placeholder="Search by topic, keyword, or chapter title..."
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        </div>

        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
          <button
            onClick={() => setSelectedSubject('ALL')}
            className={`btn btn-sm ${selectedSubject === 'ALL' ? 'btn-primary' : 'btn-secondary'}`}
          >
            All Courses
          </button>
          {subjects.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelectedSubject(s.id)}
              className={`btn btn-sm ${selectedSubject === s.id ? 'btn-primary' : 'btn-secondary'}`}
            >
              {s.id}
            </button>
          ))}
        </div>
      </div>

      {/* Materials Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {filteredMaterials.map((mat) => {
          const isBookmarked = bookmarkedIds.has(mat.id);

          return (
            <div
              key={mat.id}
              className="glass-card glass-panel-hover"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span className="badge badge-dept">{mat.subjectId}</span>
                    <span className="badge" style={{ background: 'var(--badge-bg)', fontSize: '0.7rem' }}>
                      Topic: {mat.topic}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleBookmark(mat.id)}
                    className="btn btn-icon btn-ghost btn-sm"
                    title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Material'}
                  >
                    {isBookmarked ? <BookmarkCheck size={18} color="var(--dept-cse)" /> : <Bookmark size={18} />}
                  </button>
                </div>

                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', lineHeight: 1.35 }}>{mat.title}</h3>

                <div style={{ display: 'flex', gap: '12px', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                  <span>Format: <strong>{mat.fileType}</strong></span>
                  <span>Size: {mat.size}</span>
                  <span>{mat.downloads} downloads</span>
                </div>

                <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                  Uploaded by: <strong>{mat.uploadedBy}</strong> on {mat.uploadDate}
                </div>
              </div>

              {/* Download / Open Action */}
              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem', marginTop: '1rem' }}>
                <button
                  onClick={() => alert(`Downloading "${mat.title}" (${mat.size})...`)}
                  className="btn btn-primary btn-sm"
                  style={{ flex: 1 }}
                >
                  <Download size={14} /> Download File
                </button>
                <button
                  onClick={() => alert(`Opening in-app PDF preview for: ${mat.title}`)}
                  className="btn btn-secondary btn-sm"
                  title="Preview in browser"
                >
                  <ExternalLink size={14} /> Preview
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
