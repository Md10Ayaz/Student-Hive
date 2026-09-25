import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import {
  Users, GraduationCap, Briefcase, Search, Shield, Eye, EyeOff, Key,
  Lock, CheckCircle2, UserPlus, X, RefreshCw, UserCheck, UserX, AlertTriangle, Clock
} from 'lucide-react';

export default function AdminUsers() {
  const { students, faculty } = useData();
  const {
    getUserPassword, updateUserPassword, register,
    registeredUsers, approveUser, rejectUser
  } = useAuth();

  const [tab, setTab] = useState('pending'); // 'pending' | 'students' | 'faculty'
  const [search, setSearch] = useState('');

  // Password editing state
  const [editingUser, setEditingUser] = useState(null);
  const [newPassword, setNewPassword] = useState('');
  const [showPwdModal, setShowPwdModal] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  // Visible passwords toggle per user ID
  const [visiblePasswords, setVisiblePasswords] = useState({});

  // Issue new user modal state
  const [showIssueModal, setShowIssueModal] = useState(false);
  const [issueType, setIssueType] = useState('student');
  const [issueData, setIssueData] = useState({
    name: '', identifier: '', email: '', deptId: 'cse', deptName: 'Computer Science and Engineering',
    year: '1', semester: '1', designation: 'Assistant Professor', password: 'password123'
  });
  const [issueError, setIssueError] = useState('');

  const pendingList = registeredUsers.filter(u => u.status === 'pending');
  const approvedRegisteredStudents = registeredUsers.filter(u => u.role === 'student' && u.status === 'approved');
  const approvedRegisteredFaculty = registeredUsers.filter(u => u.role === 'faculty' && u.status === 'approved');

  // Combine mock students with approved registered students
  const allStudents = [
    ...students,
    ...approvedRegisteredStudents.map(st => ({
      uid: st.uid,
      usn: st.usn,
      publicId: st.publicId,
      name: st.name,
      department: st.department,
      semester: st.semester,
      section: st.section || 'A',
      email: st.email,
      cgpa: st.cgpa || 8.5
    }))
  ];

  // Combine mock faculty with approved registered faculty
  const allFaculty = [
    ...faculty,
    ...approvedRegisteredFaculty.map(fc => ({
      uid: fc.uid,
      facultyId: fc.facultyId,
      name: fc.name,
      department: fc.department,
      designation: fc.designation,
      email: fc.email,
      office: fc.office || 'TBD'
    }))
  ];

  const togglePasswordVisibility = (key) => {
    setVisiblePasswords(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const openPasswordEditor = (user, type) => {
    const id = type === 'student' ? user.usn : user.facultyId;
    setEditingUser({ id, name: user.name, type, identifier: id });
    setNewPassword(getUserPassword(id));
    setShowPwdModal(true);
  };

  const handleSavePassword = (e) => {
    e.preventDefault();
    if (!newPassword.trim()) return;
    updateUserPassword(editingUser.identifier, newPassword.trim());
    setShowPwdModal(false);
    setSuccessMsg(`Password successfully updated for ${editingUser.name} (${editingUser.identifier})`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const handleIssueAccount = (e) => {
    e.preventDefault();
    setIssueError('');
    if (!issueData.name.trim() || !issueData.identifier.trim() || !issueData.email.trim()) {
      setIssueError('Please fill in all required fields.');
      return;
    }
    const res = register(issueData, issueType, true); // true = auto approve
    if (!res.success) {
      setIssueError(res.message);
      return;
    }
    setShowIssueModal(false);
    setSuccessMsg(`Official ${issueType} account issued and approved for ${issueData.name} (${issueData.identifier})`);
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const handleApprove = (u) => {
    approveUser(u.uid);
    setSuccessMsg(`Account confirmed & verified for ${u.name} (${u.usn || u.facultyId})! They can now log in.`);
    setTimeout(() => setSuccessMsg(''), 5000);
  };

  const handleReject = (u) => {
    rejectUser(u.uid);
    setSuccessMsg(`Registration request for ${u.name} declined.`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  const filteredStudents = allStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.usn.toLowerCase().includes(search.toLowerCase()) ||
      (s.publicId && s.publicId.toLowerCase().includes(search.toLowerCase()))
  );

  const filteredFaculty = allFaculty.filter(
    (f) =>
      f.name.toLowerCase().includes(search.toLowerCase()) ||
      f.facultyId.toLowerCase().includes(search.toLowerCase())
  );

  const filteredPending = pendingList.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      (p.usn && p.usn.toLowerCase().includes(search.toLowerCase())) ||
      (p.facultyId && p.facultyId.toLowerCase().includes(search.toLowerCase())) ||
      p.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '1100px', margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 style={{ fontSize: '1.6rem', marginBottom: '0.2rem' }}>College User Accounts Directory</h1>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            Central administrative registry for Sanjay Gandhi Polytechnic — Student sign-up verification and password management.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', gap: '6px', background: 'var(--bg-surface)', padding: '3px', borderRadius: '10px', border: '1px solid var(--border-subtle)' }}>
            <button
              onClick={() => setTab('pending')}
              className={`btn btn-sm ${tab === 'pending' ? 'btn-primary' : 'btn-ghost'}`}
              style={{ position: 'relative' }}
            >
              <Clock size={15} /> Pending Approvals ({pendingList.length})
            </button>

            <button
              onClick={() => setTab('students')}
              className={`btn btn-sm ${tab === 'students' ? 'btn-primary' : 'btn-ghost'}`}
            >
              <GraduationCap size={15} /> Students ({allStudents.length})
            </button>

            <button
              onClick={() => setTab('faculty')}
              className={`btn btn-sm ${tab === 'faculty' ? 'btn-primary' : 'btn-ghost'}`}
            >
              <Briefcase size={15} /> Faculty ({allFaculty.length})
            </button>
          </div>

          <button
            onClick={() => {
              setIssueType(tab === 'faculty' ? 'faculty' : 'student');
              setIssueData({
                name: '', identifier: '', email: '', deptId: 'cse', deptName: 'Computer Science and Engineering',
                year: '1', semester: '1', designation: 'Assistant Professor', password: 'password123'
              });
              setIssueError('');
              setShowIssueModal(true);
            }}
            className="btn btn-sm btn-primary"
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <UserPlus size={15} /> Issue New Account
          </button>
        </div>
      </div>

      {/* Pending Banner Alert */}
      {pendingList.length > 0 && tab !== 'pending' && (
        <div
          onClick={() => setTab('pending')}
          style={{
            padding: '0.85rem 1.25rem', borderRadius: '12px',
            background: 'var(--color-warning-bg)', border: '1px solid var(--color-warning)',
            color: 'var(--color-warning)', fontSize: '0.88rem',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <AlertTriangle size={18} />
            <span>
              <strong>{pendingList.length} Student Sign-Up Request(s) Pending Verification!</strong> Click to review and confirm their access.
            </span>
          </div>
          <span className="badge badge-warning">Review Requests →</span>
        </div>
      )}

      {/* Success Notification Banner */}
      {successMsg && (
        <div style={{ padding: '0.85rem 1.25rem', borderRadius: '12px', background: 'var(--color-success-bg)', border: '1px solid var(--color-success)', color: 'var(--color-success)', fontSize: '0.88rem', display: 'flex', alignItems: 'center', gap: '10px', boxShadow: 'var(--shadow-sm)' }}>
          <CheckCircle2 size={18} />
          <span>{successMsg}</span>
        </div>
      )}

      {/* Search Input */}
      <div style={{ position: 'relative' }}>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="form-input"
          placeholder="Search by student name, USN, faculty ID, or email..."
          style={{ paddingLeft: '2.5rem' }}
        />
        <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
      </div>

      {/* Main Panel Content */}
      <div className="glass-panel" style={{ padding: '1.5rem' }}>

        {/* TAB 1: PENDING SIGN-UP APPROVALS */}
        {tab === 'pending' && (
          <div>
            <div style={{ marginBottom: '1.25rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontSize: '1.15rem', marginBottom: '0.2rem' }}>Pending Student Sign-Up Requests</h3>
                <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  Verify official student USNs and confirm registration before login access is granted.
                </p>
              </div>
            </div>

            {filteredPending.length === 0 ? (
              <div style={{ padding: '3rem 1.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
                <CheckCircle2 size={42} color="var(--color-success)" style={{ marginBottom: '0.75rem' }} />
                <p style={{ fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
                  All Sign-Up Requests Processed!
                </p>
                <p style={{ fontSize: '0.84rem' }}>No student sign-up requests currently pending verification.</p>
              </div>
            ) : (
              <div className="table-container">
                <table className="hive-table">
                  <thead>
                    <tr>
                      <th>Requested Role</th>
                      <th>Student Name</th>
                      <th>Official USN / ID</th>
                      <th>Department &amp; Sem</th>
                      <th>College Email</th>
                      <th>Requested On</th>
                      <th style={{ textAlign: 'right' }}>Admin Verification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPending.map((u) => (
                      <tr key={u.uid}>
                        <td>
                          <span className="badge badge-dept" style={{ textTransform: 'uppercase' }}>
                            {u.role}
                          </span>
                        </td>
                        <td style={{ fontWeight: 700 }}>{u.name}</td>
                        <td style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--dept-cse)' }}>
                          {u.usn || u.facultyId}
                        </td>
                        <td>{u.department} {u.semester ? `• Sem ${u.semester}` : ''}</td>
                        <td style={{ color: 'var(--text-secondary)' }}>{u.email}</td>
                        <td style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                          {u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'Recent'}
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px' }}>
                            <button
                              onClick={() => handleApprove(u)}
                              className="btn btn-xs btn-success"
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '5px 10px', fontSize: '0.78rem' }}
                            >
                              <UserCheck size={14} /> Verify &amp; Confirm
                            </button>
                            <button
                              onClick={() => handleReject(u)}
                              className="btn btn-xs btn-danger"
                              style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '5px 10px', fontSize: '0.78rem' }}
                            >
                              <UserX size={14} /> Decline
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 2: ACTIVE STUDENTS */}
        {tab === 'students' && (
          <div className="table-container">
            <table className="hive-table">
              <thead>
                <tr>
                  <th>Official USN</th>
                  <th>Anonymous Public ID</th>
                  <th>Student Name</th>
                  <th>Department &amp; Section</th>
                  <th>College Email</th>
                  <th>Login Password</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((st) => {
                  const pwd = getUserPassword(st.usn);
                  const isVisible = visiblePasswords[st.usn];
                  return (
                    <tr key={st.uid}>
                      <td style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--dept-cse)' }}>
                        {st.usn}
                      </td>
                      <td>
                        <span className="badge badge-dept" style={{ fontFamily: 'monospace' }}>
                          {st.publicId}
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>{st.name}</td>
                      <td>{st.department} • Sem {st.semester} ({st.section})</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{st.email}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontFamily: 'monospace', fontSize: '0.85rem', fontWeight: 600, background: 'var(--bg-surface)', padding: '2px 8px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                            {isVisible ? pwd : '••••••••'}
                          </span>
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(st.usn)}
                            className="btn btn-icon btn-ghost btn-sm"
                            title={isVisible ? 'Hide Password' : 'View Password'}
                          >
                            {isVisible ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => openPasswordEditor(st, 'student')}
                          className="btn btn-xs btn-secondary"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}
                        >
                          <Key size={13} color="var(--dept-cse)" /> Set Password
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* TAB 3: FACULTY ROSTER */}
        {tab === 'faculty' && (
          <div className="table-container">
            <table className="hive-table">
              <thead>
                <tr>
                  <th>Faculty ID</th>
                  <th>Name &amp; Title</th>
                  <th>Department</th>
                  <th>Designation</th>
                  <th>Email</th>
                  <th>Login Password</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFaculty.map((fc) => {
                  const pwd = getUserPassword(fc.facultyId);
                  const isVisible = visiblePasswords[fc.facultyId];
                  return (
                    <tr key={fc.uid}>
                      <td style={{ fontFamily: 'monospace', fontWeight: 800, color: 'var(--dept-mech)' }}>
                        {fc.facultyId}
                      </td>
                      <td style={{ fontWeight: 600 }}>{fc.name}</td>
                      <td>{fc.department}</td>
                      <td>{fc.designation}</td>
                      <td style={{ color: 'var(--text-secondary)' }}>{fc.email}</td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontFamily: 'monospace', fontSize: '0.85rem', fontWeight: 600, background: 'var(--bg-surface)', padding: '2px 8px', borderRadius: '6px', border: '1px solid var(--border-subtle)' }}>
                            {isVisible ? pwd : '••••••••'}
                          </span>
                          <button
                            type="button"
                            onClick={() => togglePasswordVisibility(fc.facultyId)}
                            className="btn btn-icon btn-ghost btn-sm"
                            title={isVisible ? 'Hide Password' : 'View Password'}
                          >
                            {isVisible ? <EyeOff size={14} /> : <Eye size={14} />}
                          </button>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => openPasswordEditor(fc, 'faculty')}
                          className="btn btn-xs btn-secondary"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem' }}
                        >
                          <Key size={13} color="var(--dept-mech)" /> Set Password
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Password Reset Modal */}
      {showPwdModal && editingUser && (
        <div className="modal-overlay" onClick={() => setShowPwdModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '440px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Key size={18} color="var(--dept-cse)" />
                <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>Update Password</span>
              </div>
              <button onClick={() => setShowPwdModal(false)} className="btn btn-icon btn-ghost btn-sm">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSavePassword}>
              <div className="modal-body">
                <div style={{ marginBottom: '1.25rem', padding: '0.85rem', borderRadius: '10px', background: 'var(--badge-bg)', border: '1px solid var(--border-subtle)' }}>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{editingUser.name}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                    ID/USN: {editingUser.identifier}
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">New Password for Account</label>
                  <input
                    type="text"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="form-input"
                    placeholder="Enter new password"
                  />
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px', display: 'block' }}>
                    Share this password securely with the student or faculty member.
                  </span>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowPwdModal(false)} className="btn btn-ghost">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Save Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Issue New Account Modal */}
      {showIssueModal && (
        <div className="modal-overlay" onClick={() => setShowIssueModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '500px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserPlus size={18} color="var(--dept-cse)" />
                <span style={{ fontWeight: 700, fontSize: '1.05rem' }}>Issue Official Account</span>
              </div>
              <button onClick={() => setShowIssueModal(false)} className="btn btn-icon btn-ghost btn-sm">
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleIssueAccount}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {issueError && (
                  <div style={{ padding: '0.65rem 0.85rem', borderRadius: '8px', background: 'var(--color-danger-bg)', border: '1px solid var(--color-danger)', color: 'var(--color-danger)', fontSize: '0.82rem' }}>
                    {issueError}
                  </div>
                )}

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => setIssueType('student')}
                    className={`btn btn-sm ${issueType === 'student' ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    Student Account
                  </button>
                  <button
                    type="button"
                    onClick={() => setIssueType('faculty')}
                    className={`btn btn-sm ${issueType === 'faculty' ? 'btn-primary' : 'btn-secondary'}`}
                  >
                    Faculty Account
                  </button>
                </div>

                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <input
                    type="text"
                    required
                    value={issueData.name}
                    onChange={(e) => setIssueData({ ...issueData, name: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Rahul Sharma"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div className="form-group">
                    <label className="form-label">{issueType === 'student' ? 'Student USN' : 'Faculty ID'}</label>
                    <input
                      type="text"
                      required
                      value={issueData.identifier}
                      onChange={(e) => setIssueData({ ...issueData, identifier: e.target.value })}
                      className="form-input"
                      placeholder={issueType === 'student' ? 'e.g. 1XX23CS099' : 'e.g. FAC-CSE-099'}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">College Email</label>
                    <input
                      type="email"
                      required
                      value={issueData.email}
                      onChange={(e) => setIssueData({ ...issueData, email: e.target.value })}
                      className="form-input"
                      placeholder="user@college.edu"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Initial Password Provided by Admin</label>
                  <input
                    type="text"
                    required
                    value={issueData.password}
                    onChange={(e) => setIssueData({ ...issueData, password: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" onClick={() => setShowIssueModal(false)} className="btn btn-ghost">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create &amp; Issue Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
