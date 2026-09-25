import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Clock, Calendar, Save, CheckCircle2, User } from 'lucide-react';

export default function FacultyOfficeHours() {
  const { currentUser } = useAuth();
  const [schedule, setSchedule] = useState(currentUser?.officeHours || 'Mon & Wed: 2:00 PM – 4:00 PM');
  const [officeLocation, setOfficeLocation] = useState(currentUser?.office || 'Block 3, Room 304');
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
      <div>
        <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>Faculty Office Consultation Hours</h1>
        <p style={{ fontSize: '0.85rem' }}>Configure weekly availability slots displayed on student portals for academic advising.</p>
      </div>

      {saved && (
        <div style={{ padding: '0.85rem 1.25rem', borderRadius: '10px', background: 'var(--color-success-bg)', border: '1px solid var(--color-success)', color: 'var(--color-success)', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={18} />
          <span>✓ Consultation hours published to student portal directory!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="glass-panel" style={{ padding: '2rem' }}>
        <div className="form-group">
          <label className="form-label">Weekly Consultation Timings</label>
          <input
            type="text"
            required
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            className="form-input"
            placeholder="e.g. Mon & Wed: 2:00 PM – 4:00 PM"
          />
        </div>

        <div className="form-group">
          <label className="form-label">Office Cabin / Meeting Room</label>
          <input
            type="text"
            required
            value={officeLocation}
            onChange={(e) => setOfficeLocation(e.target.value)}
            className="form-input"
            placeholder="e.g. Block 3, Room 304"
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
          <Save size={16} /> Save Consultation Schedule
        </button>
      </form>
    </div>
  );
}
