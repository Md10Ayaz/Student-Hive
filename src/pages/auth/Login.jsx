import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { INITIAL_DEPARTMENTS } from '../../data/mockData';
import collegeLogo from '../../assets/logo.png';
import {
  GraduationCap, Briefcase, ShieldCheck, Lock, User, ArrowRight,
  Sparkles, BookOpen, Calendar, AlertCircle, Mail, Hash, Building2,
  UserPlus, LogIn, Eye, EyeOff, ChevronDown, CheckCircle2
} from 'lucide-react';

const FACULTY_DESIGNATIONS = [
  'Professor', 'Associate Professor', 'Assistant Professor', 'Lecturer', 'Lab Instructor'
];
const ADMIN_DESIGNATIONS = [
  'Dean of Academic Affairs', 'Vice Principal', 'Registrar',
  'Controller of Examinations', 'Administrative Officer', 'Accounts Officer'
];

const iconBase = {
  position: 'absolute', left: '1rem', top: '50%',
  transform: 'translateY(-50%)', color: 'var(--text-muted)', pointerEvents: 'none'
};
const eyeBtn = {
  position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)',
  background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', padding: 0, lineHeight: 1
};
const selectStyle = { paddingLeft: '2.5rem', paddingRight: '2rem', appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer' };
const chevronStyle = { position: 'absolute', right: '0.75rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--text-muted)' };

// ── Reusable password field ──────────────────────────────────────────────────
function PwdField({ label, value, onChange, show, onToggle, required = true }) {
  return (
    <div className="form-group" style={{ marginBottom: '1rem' }}>
      <label className="form-label">{label}</label>
      <div style={{ position: 'relative' }}>
        <input
          type={show ? 'text' : 'password'}
          required={required}
          value={value}
          onChange={e => onChange(e.target.value)}
          className="form-input"
          placeholder="••••••••••••"
          style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
        />
        <Lock size={16} style={iconBase} />
        <button type="button" onClick={onToggle} style={eyeBtn}>
          {show ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
}

// ── Select field with icon ───────────────────────────────────────────────────
function SelectField({ label, value, onChange, options, Icon }) {
  return (
    <div className="form-group" style={{ marginBottom: '1rem' }}>
      <label className="form-label">{label}</label>
      <div style={{ position: 'relative' }}>
        <select value={value} onChange={e => onChange(e.target.value)} className="form-input" style={Icon ? selectStyle : { paddingRight: '2rem', appearance: 'none', cursor: 'pointer' }}>
          {options.map(o => (
            <option key={typeof o === 'string' ? o : o.value} value={typeof o === 'string' ? o : o.value}>
              {typeof o === 'string' ? o : o.label}
            </option>
          ))}
        </select>
        {Icon && <Icon size={16} style={iconBase} />}
        <ChevronDown size={15} style={chevronStyle} />
      </div>
    </div>
  );
}

export default function Login() {
  const { login, register, switchRole, isLiveMode } = useAuth();

  const [mode, setMode] = useState('signin');   // 'signin' | 'signup'
  const [roleTab, setRoleTab] = useState('student');

  // ── Sign In state ──────────────────────────────────────────────────────────
  const [identifier, setIdentifier] = useState('1XX23CS001');
  const [password, setPassword] = useState('password123');
  const [showPwd, setShowPwd] = useState(false);

  // ── Sign Up state ──────────────────────────────────────────────────────────
  const blank = {
    name: '', identifier: '', email: '',
    deptId: 'cse', deptName: 'Computer Science and Engineering',
    year: '1', semester: '1',
    designation: 'Assistant Professor',
    adminDesignation: 'Administrative Officer',
    password: '', confirmPassword: ''
  };
  const [signup, setSignup] = useState(blank);
  const [showSPwd, setShowSPwd] = useState(false);
  const [showCPwd, setShowCPwd] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // ── Helpers ────────────────────────────────────────────────────────────────
  const setField = (f, v) => setSignup(prev => ({ ...prev, [f]: v }));

  const handleTabChange = (role) => {
    setRoleTab(role);
    setError('');
    setIdentifier(role === 'student' ? '1XX23CS001' : role === 'faculty' ? 'FAC-CSE-001' : 'ADM-001');
    setPassword('password123');
    setSignup(blank);
  };

  const switchMode = (m) => { setMode(m); setError(''); };

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleSignIn = async (e) => {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      const res = await login(identifier, password, roleTab);
      setLoading(false);
      if (!res.success) setError(res.message);
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Login failed. Please try again.');
    }
  };

  const [successInfo, setSuccessInfo] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault(); setError(''); setSuccessInfo('');
    if (!signup.name.trim())       { setError('Full name is required.'); return; }
    if (!signup.identifier.trim()) { setError('ID / USN is required.'); return; }
    if (!signup.email.trim())      { setError('College email is required.'); return; }
    if (signup.password.length < 6){ setError('Password must be at least 6 characters.'); return; }
    if (signup.password !== signup.confirmPassword) { setError('Passwords do not match.'); return; }
    setLoading(true);
    try {
      const res = await register(signup, roleTab, false); // false = requires Admin verification
      setLoading(false);
      if (!res.success) {
        setError(res.message);
      } else {
        setSuccessInfo(res.message);
        setMode('signin');
        setSignup(blank);
      }
    } catch (err) {
      setLoading(false);
      setError(err.message || 'Registration failed. Please try again.');
    }
  };

  // ── Role tab config ────────────────────────────────────────────────────────
  const roles = [
    { id: 'student', label: 'Student', Icon: GraduationCap },
    { id: 'faculty', label: 'Faculty', Icon: Briefcase },
    { id: 'admin',   label: 'Admin',   Icon: ShieldCheck },
  ];

  const idLabel    = roleTab === 'student' ? 'Student USN' : roleTab === 'faculty' ? 'Faculty ID' : 'Admin ID';
  const idPlaceholder = roleTab === 'student' ? '1XX23CS001' : roleTab === 'faculty' ? 'FAC-CSE-001' : 'ADM-002';

  // ── Sign Up form ───────────────────────────────────────────────────────────
  const renderSignUp = () => (
    <form onSubmit={handleSignUp}>
      {/* Full Name */}
      <div className="form-group" style={{ marginBottom: '1rem' }}>
        <label className="form-label">Full Name</label>
        <div style={{ position: 'relative' }}>
          <input type="text" required value={signup.name} onChange={e => setField('name', e.target.value)}
            className="form-input" placeholder="e.g. Anas Aqsa" style={{ paddingLeft: '2.5rem' }} />
          <User size={16} style={iconBase} />
        </div>
      </div>

      {/* ID + Email — 2 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label className="form-label">{idLabel}</label>
          <div style={{ position: 'relative' }}>
            <input type="text" required value={signup.identifier} onChange={e => setField('identifier', e.target.value)}
              className="form-input" placeholder={idPlaceholder} style={{ paddingLeft: '2.5rem' }} />
            <Hash size={16} style={iconBase} />
          </div>
        </div>
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label className="form-label">College Email</label>
          <div style={{ position: 'relative' }}>
            <input type="email" required value={signup.email} onChange={e => setField('email', e.target.value)}
              className="form-input" placeholder="you@college.edu" style={{ paddingLeft: '2.5rem' }} />
            <Mail size={16} style={iconBase} />
          </div>
        </div>
      </div>

      {/* Department (student + faculty) */}
      {roleTab !== 'admin' && (
        <SelectField
          label="Department"
          value={signup.deptId}
          onChange={v => {
            const dept = INITIAL_DEPARTMENTS.find(d => d.id === v);
            setSignup(prev => ({ ...prev, deptId: v, deptName: dept?.name || v }));
          }}
          options={INITIAL_DEPARTMENTS.map(d => ({ value: d.id, label: d.name }))}
          Icon={Building2}
        />
      )}

      {/* Year + Semester (student) */}
      {roleTab === 'student' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
          <SelectField label="Year" value={signup.year} onChange={v => setField('year', v)}
            options={[1,2,3,4].map(y => ({ value: String(y), label: `Year ${y}` }))} />
          <SelectField label="Semester" value={signup.semester} onChange={v => setField('semester', v)}
            options={[1,2,3,4,5,6,7,8].map(s => ({ value: String(s), label: `Semester ${s}` }))} />
        </div>
      )}

      {/* Designation (faculty) */}
      {roleTab === 'faculty' && (
        <SelectField label="Designation" value={signup.designation} onChange={v => setField('designation', v)}
          options={FACULTY_DESIGNATIONS} />
      )}

      {/* Designation (admin) */}
      {roleTab === 'admin' && (
        <SelectField label="Designation" value={signup.adminDesignation} onChange={v => setField('adminDesignation', v)}
          options={ADMIN_DESIGNATIONS} />
      )}

      {/* Password + Confirm — 2 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
        <PwdField label="Password" value={signup.password} onChange={v => setField('password', v)} show={showSPwd} onToggle={() => setShowSPwd(!showSPwd)} />
        <PwdField label="Confirm Password" value={signup.confirmPassword} onChange={v => setField('confirmPassword', v)} show={showCPwd} onToggle={() => setShowCPwd(!showCPwd)} />
      </div>

      <button type="submit" disabled={loading} className="btn btn-primary"
        style={{ width: '100%', padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
        {loading
          ? 'Creating Account…'
          : `Create ${roleTab.charAt(0).toUpperCase() + roleTab.slice(1)} Account`}
        {!loading && <UserPlus size={16} />}
      </button>

      <p style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--text-muted)', marginTop: '1.25rem' }}>
        Already have an account?{' '}
        <button type="button" onClick={() => switchMode('signin')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--dept-cse)', fontWeight: 700, fontSize: '0.82rem' }}>
          Sign In
        </button>
      </p>
    </form>
  );

  // ── Sign In form ───────────────────────────────────────────────────────────
  const renderSignIn = () => (
    <>
      {/* 1-click demo chips */}
      <div style={{ marginBottom: '1.5rem' }}>
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', marginBottom: '8px' }}>
          ⚡ 1-CLICK INSTANT DEMO LOGIN:
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          <button type="button" onClick={() => switchRole('student')} className="badge badge-dept"
            style={{ cursor: 'pointer', padding: '0.4rem 0.8rem', border: '1px solid var(--dept-cse)' }}>
            👨‍🎓 Anas Aqsa (Student)
          </button>
          <button type="button" onClick={() => switchRole('faculty')} className="badge"
            style={{ cursor: 'pointer', padding: '0.4rem 0.8rem', background: 'var(--dept-mech-glow)', color: 'var(--dept-mech)', border: '1px solid var(--dept-mech)' }}>
            👨‍🏫 Dr. Sharma (Faculty)
          </button>
          <button type="button" onClick={() => switchRole('admin')} className="badge"
            style={{ cursor: 'pointer', padding: '0.4rem 0.8rem', background: 'var(--dept-eee-glow)', color: 'var(--dept-eee)', border: '1px solid var(--dept-eee)' }}>
            🛡️ Dr. Ramanathan (Admin)
          </button>
        </div>
      </div>

      <form onSubmit={handleSignIn}>
        {/* Identifier */}
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <label className="form-label">
            {roleTab === 'student' ? 'Student USN or College Email' : roleTab === 'faculty' ? 'Faculty ID or Email' : 'Admin ID or Email'}
          </label>
          <div style={{ position: 'relative' }}>
            <input type="text" required value={identifier} onChange={e => setIdentifier(e.target.value)}
              className="form-input"
              placeholder={roleTab === 'student' ? 'e.g. 1XX23CS001' : roleTab === 'faculty' ? 'e.g. FAC-CSE-001' : 'e.g. ADM-001'}
              style={{ paddingLeft: '2.5rem' }} />
            <User size={16} style={iconBase} />
          </div>
        </div>

        {/* Password */}
        <div className="form-group" style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <label className="form-label">Password</label>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{isLiveMode ? '' : 'Demo password is pre-filled'}</span>
          </div>
          <div style={{ position: 'relative' }}>
            <input type={showPwd ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)}
              className="form-input" placeholder="••••••••••••"
              style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }} />
            <Lock size={16} style={iconBase} />
            <button type="button" onClick={() => setShowPwd(!showPwd)} style={eyeBtn}>
              {showPwd ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary"
          style={{ width: '100%', marginTop: '0.5rem', padding: '0.8rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          {loading ? 'Authenticating…' : `Enter ${roleTab.charAt(0).toUpperCase() + roleTab.slice(1)} Hive`}
          {!loading && <ArrowRight size={16} />}
        </button>
      </form>

      <div style={{ padding: '0.85rem 1rem', borderRadius: '10px', background: 'rgba(2, 132, 199, 0.08)', border: '1px solid rgba(2, 132, 199, 0.2)', textAlign: 'center', marginTop: '1.5rem' }}>
        <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
          🎓 <strong>Student Sign-Up &amp; Admin Verification</strong><br />
          Students can register using the <strong>Sign Up</strong> tab. Registered accounts require <strong>Admin approval</strong> before login access is granted.
        </p>
      </div>
    </>
  );

  // ── Full render ────────────────────────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '2rem 1rem',
      background: 'radial-gradient(ellipse at 50% 10%, rgba(6, 182, 212, 0.12) 0%, var(--bg-app) 70%)'
    }}>
      <div
        className="glass-panel"
        style={{
          width: '100%', maxWidth: '1060px',
          display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          overflow: 'hidden', boxShadow: 'var(--shadow-lg)',
          maxHeight: '95vh'
        }}
      >
        {/* ── Left: Branding ────────────────────────────────────────────── */}
        <div style={{
          padding: '3rem 2.5rem',
          background: 'linear-gradient(145deg, rgba(29, 78, 216, 0.05) 0%, rgba(2, 132, 199, 0.03) 100%)',
          borderRight: '1px solid var(--border-subtle)',
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
          overflowY: 'auto'
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '1.5rem' }}>
              <div style={{
                width: '68px',
                height: '68px',
                borderRadius: '16px',
                background: '#ffffff',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 14px rgba(0,0,0,0.18)',
                flexShrink: 0
              }}>
                <img
                  src={collegeLogo}
                  alt="Sanjay Gandhi Polytechnic Logo"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div>
                <h1 style={{ fontSize: '1.45rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-primary)' }}>
                  Student Hive
                </h1>
                <p style={{ fontSize: '0.8rem', color: 'var(--dept-cse)', fontWeight: 700 }}>
                  Sanjay Gandhi Polytechnic, Bellary
                </p>
              </div>
            </div>

            <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
              Centralized digital campus ecosystem for Sanjay Gandhi Polytechnic — replacing paper notices with live attendance, marks gradebook, assignment submissions, timetables, and student affairs.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
              {[
                { Icon: Sparkles, color: 'var(--dept-cse)', title: 'Admin-Verified Access', desc: 'Secure student USN verification and approval workflow.' },
                { Icon: BookOpen, color: 'var(--dept-mech)', title: 'Academic Management', desc: 'Record-based 75% attendance tracking, internal marks, and study files.' },
                { Icon: Calendar, color: 'var(--dept-eee)', title: 'Smart Campus Services', desc: 'Live reschedule alerts, leave requests, complaint tracking & fees.' },
              ].map(({ Icon, color, title, desc }) => (
                <div key={title} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
                  <div style={{ padding: '8px', borderRadius: '8px', background: 'var(--badge-bg)', color, flexShrink: 0 }}>
                    <Icon size={18} />
                  </div>
                  <div>
                    <h4 style={{ fontSize: '0.9rem', marginBottom: '2px' }}>{title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ marginTop: '2.5rem', padding: '1rem', borderRadius: '12px', background: 'var(--badge-bg)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '4px', fontSize: '0.8rem' }}>🔒 Admin Approval Required</div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              New student sign-ups must be verified and approved by the college administrator before login is enabled.
            </p>
          </div>
        </div>

        {/* ── Right: Auth Form ──────────────────────────────────────────── */}
        <div style={{ padding: '2.5rem 2.5rem', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>

          {/* Sign In / Sign Up Mode Toggle */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', padding: '4px', background: 'var(--bg-surface)', borderRadius: '12px', marginBottom: '1.25rem', border: '1px solid var(--border-subtle)' }}>
            {[{ m: 'signin', label: 'Sign In', Icon: LogIn }, { m: 'signup', label: 'Sign Up', Icon: UserPlus }].map(({ m, label, Icon }) => (
              <button key={m} type="button" onClick={() => switchMode(m)}
                className={`btn btn-sm ${mode === m ? 'btn-primary' : 'btn-ghost'}`}
                style={{ fontSize: '0.82rem', padding: '0.55rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>

          {/* Heading */}
          <div style={{ marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.35rem', marginBottom: '0.2rem' }}>
              {mode === 'signin' ? 'Portal Sign In' : 'Student Registration'}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              {mode === 'signin'
                ? 'Select your role and enter your login credentials.'
                : 'Fill in your student USN & details. Requests require Admin approval.'}
            </p>
          </div>

          {/* Role tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px', padding: '4px', background: 'var(--bg-surface)', borderRadius: '12px', marginBottom: '1.25rem', border: '1px solid var(--border-subtle)' }}>
            {roles.map(({ id, label, Icon }) => (
              <button key={id} type="button" onClick={() => handleTabChange(id)}
                className={`btn btn-sm ${roleTab === id ? 'btn-primary' : 'btn-ghost'}`}
                style={{ fontSize: '0.8rem', padding: '0.45rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
                <Icon size={15} /> {label}
              </button>
            ))}
          </div>

          {/* Success Info Banner */}
          {successInfo && (
            <div style={{ padding: '0.85rem 1rem', borderRadius: '10px', background: 'var(--color-success-bg)', border: '1px solid var(--color-success)', color: 'var(--color-success)', fontSize: '0.84rem', display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '1.25rem' }}>
              <CheckCircle2 size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>{successInfo}</span>
            </div>
          )}

          {/* Error Banner */}
          {error && (
            <div style={{ padding: '0.75rem 1rem', borderRadius: '10px', background: 'var(--color-danger-bg)', border: '1px solid var(--color-danger)', color: 'var(--color-danger)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1.25rem' }}>
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          {/* Form */}
          {mode === 'signin' ? renderSignIn() : renderSignUp()}
        </div>
      </div>
    </div>
  );
}
