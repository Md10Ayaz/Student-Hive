import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { MessageSquare, Send, Users, Shield, Hash, CheckCheck } from 'lucide-react';

export default function GroupChats() {
  const { currentUser, role } = useAuth();
  const [activeChannel, setActiveChannel] = useState('CSE-5A-FSD');
  const [messages, setMessages] = useState([
    {
      id: 'm1',
      sender: 'Dr. Rajesh Sharma',
      role: 'faculty',
      text: 'Good morning everyone! Please ensure your React custom hooks assignment is pushed by tomorrow midnight. Review the specs carefully.',
      time: '09:15 AM'
    },
    {
      id: 'm2',
      sender: 'Mohammed Ayaz',
      role: 'student',
      text: 'Professor, will the practical lab on Thursday cover the same hooks architecture for the live viva?',
      time: '09:22 AM'
    },
    {
      id: 'm3',
      sender: 'Dr. Rajesh Sharma',
      role: 'faculty',
      text: 'Yes Ayaz, we will run the test suites live in Lab 3.',
      time: '09:25 AM'
    },
    {
      id: 'm4',
      sender: 'Priya Nair',
      role: 'student',
      text: 'Thanks sir! Started working on the useReducer implementation.',
      time: '09:40 AM'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const newMsg = {
      id: `m-${Date.now()}`,
      sender: currentUser?.name || 'Mohammed Ayaz',
      role: role || 'student',
      text: inputText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMsg]);
    setInputText('');
  };

  const channels = [
    { id: 'CSE-5A-FSD', name: 'CS501 • Full Stack Dev', sub: 'CSE / 5th Sem / Sec A' },
    { id: 'CSE-5A-DBMS', name: 'CS502 • Database Systems', sub: 'CSE / 5th Sem / Sec A' },
    { id: 'CSE-5A-GENERAL', name: 'Class Discussion & Notices', sub: 'Section A Official' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', maxWidth: '1100px', margin: '0 auto', height: 'calc(100vh - 160px)' }}>
      {/* Title */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Department & Subject Chatrooms</h1>
          <p style={{ fontSize: '0.85rem' }}>Scoped group discussions for coursework, queries, and project collaboration.</p>
        </div>
        <span className="badge badge-dept" style={{ padding: '0.4rem 0.8rem' }}>
          Scoped: CSE • Sem 5 • Sec A
        </span>
      </div>

      {/* Main Chat Interface Split */}
      <div
        className="glass-panel"
        style={{
          flex: 1,
          display: 'grid',
          gridTemplateColumns: '260px 1fr',
          overflow: 'hidden'
        }}
      >
        {/* Channels Sidebar */}
        <div style={{ borderRight: '1px solid var(--border-subtle)', background: 'var(--bg-surface)', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Course Channels
          </span>
          {channels.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setActiveChannel(ch.id)}
              className={`btn btn-sm ${activeChannel === ch.id ? 'btn-primary' : 'btn-ghost'}`}
              style={{ justifyContent: 'flex-start', textAlign: 'left', padding: '10px 12px', height: 'auto', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: 700, fontSize: '0.85rem' }}>
                <Hash size={14} />
                <span>{ch.name}</span>
              </div>
              <span style={{ fontSize: '0.7rem', opacity: 0.8, marginTop: '2px' }}>{ch.sub}</span>
            </button>
          ))}
        </div>

        {/* Message Viewport */}
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
          {/* Channel Header */}
          <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Hash size={18} color="var(--dept-cse)" />
              <h3 style={{ fontSize: '1.05rem' }}>{channels.find((c) => c.id === activeChannel)?.name}</h3>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>64 Students • 2 Faculty</span>
          </div>

          {/* Messages Stream */}
          <div style={{ flex: 1, padding: '1.25rem', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {messages.map((msg) => {
              const isMe = msg.sender === currentUser?.name;
              const isFaculty = msg.role === 'faculty';

              return (
                <div
                  key={msg.id}
                  style={{
                    alignSelf: isMe ? 'flex-end' : 'flex-start',
                    maxWidth: '75%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: isMe ? 'flex-end' : 'flex-start'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '2px', fontSize: '0.75rem' }}>
                    <span style={{ fontWeight: 700, color: isFaculty ? 'var(--dept-cse)' : 'var(--text-primary)' }}>
                      {msg.sender}
                    </span>
                    {isFaculty && <span className="badge badge-dept" style={{ fontSize: '0.62rem', padding: '1px 5px' }}>Faculty</span>}
                    <span style={{ color: 'var(--text-muted)' }}>{msg.time}</span>
                  </div>

                  <div
                    style={{
                      padding: '10px 14px',
                      borderRadius: '14px',
                      background: isMe ? 'var(--grad-primary)' : isFaculty ? 'var(--bg-elevated)' : 'var(--bg-surface)',
                      color: isMe ? '#ffffff' : 'var(--text-primary)',
                      border: isMe ? 'none' : '1px solid var(--border-subtle)',
                      fontSize: '0.88rem',
                      lineHeight: 1.45,
                      boxShadow: 'var(--shadow-sm)'
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Input Bar */}
          <form
            onSubmit={handleSendMessage}
            style={{
              padding: '1rem',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              gap: '10px',
              background: 'var(--bg-primary)'
            }}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="form-input"
              placeholder={`Message #${channels.find((c) => c.id === activeChannel)?.name}...`}
              style={{ flex: 1 }}
            />
            <button type="submit" className="btn btn-primary" style={{ padding: '0 1.25rem' }}>
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
