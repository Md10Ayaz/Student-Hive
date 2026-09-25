import React from 'react';
import { useData } from '../../context/DataContext';
import { Library, BookOpen, Clock, AlertTriangle, CheckCircle, RotateCw } from 'lucide-react';

export default function StudentLibrary() {
  const { library } = useData();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1000px', margin: '0 auto' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Library & Digital Circulation</h1>
          <p style={{ fontSize: '0.85rem' }}>Track issued volumes, return deadlines, and reference textbook catalog.</p>
        </div>
        <span className="badge badge-dept" style={{ padding: '0.4rem 0.8rem' }}>
          Card Limit: 4 Books
        </span>
      </div>

      {/* Book Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.25rem' }}>
        {library.map((book) => {
          const isDueSoon = book.daysRemaining <= 2;

          return (
            <div
              key={book.id}
              className="glass-card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                borderLeft: `4px solid ${isDueSoon ? 'var(--color-warning)' : 'var(--dept-cse)'}`
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                  <span className="badge" style={{ background: 'var(--badge-bg)', fontSize: '0.7rem' }}>
                    ISBN: {book.isbn}
                  </span>
                  {isDueSoon ? (
                    <span className="badge badge-warning">
                      ⚠️ Due in {book.daysRemaining} day{book.daysRemaining > 1 ? 's' : ''}
                    </span>
                  ) : (
                    <span className="badge badge-success">✓ Active Loan</span>
                  )}
                </div>

                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.4rem', lineHeight: 1.35 }}>{book.title}</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                  Author: {book.author}
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', padding: '10px', borderRadius: '8px', background: 'var(--bg-surface)', fontSize: '0.78rem', marginBottom: '1rem' }}>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Issued:</span>
                    <strong style={{ display: 'block' }}>{book.issuedDate}</strong>
                  </div>
                  <div>
                    <span style={{ color: 'var(--text-muted)' }}>Due Date:</span>
                    <strong style={{ display: 'block', color: isDueSoon ? 'var(--color-warning)' : 'var(--text-primary)' }}>
                      {book.dueDate}
                    </strong>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '8px', borderTop: '1px solid var(--border-subtle)', paddingTop: '0.75rem' }}>
                <button
                  onClick={() => alert(`Requested 14-day renewal extension for: ${book.title}. Your request is approved!`)}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                >
                  <RotateCw size={14} /> Renew Book (14 Days)
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
