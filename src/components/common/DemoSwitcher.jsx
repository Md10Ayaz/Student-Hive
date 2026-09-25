import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { GraduationCap, Briefcase, ShieldCheck, LogOut, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';

const ROLE_META = {
  student: { icon: GraduationCap, color: 'var(--dept-cse)', label: 'Student' },
  faculty: { icon: Briefcase, color: 'var(--dept-mech)', label: 'Faculty' },
  admin: { icon: ShieldCheck, color: 'var(--dept-eee)', label: 'Admin' }
};

export default function DemoSwitcher() {
  const { currentUser, role, logout } = useAuth();
  const { resetAllData } = useData();
  const [collapsed, setCollapsed] = useState(false);

  if (!currentUser) return null;

  const meta = ROLE_META[role] || ROLE_META.student;
  const RoleIcon = meta.icon;

  const handleLogout = () => {
    logout();
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '16px',
        right: '16px',
        zIndex: 9999,
        background: 'var(--glass-bg)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid var(--border-medium)',
        borderRadius: '16px',
        padding: collapsed ? '8px 14px' : '10px 16px',
        boxShadow: 'var(--shadow-lg)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        transition: 'all 200ms ease'
      }}
    >
      {/* Role indicator dot */}
      <div
        style={{
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: meta.color,
          boxShadow: `0 0 10px ${meta.color}`,
          flexShrink: 0
        }}
      />

      {!collapsed && (
        <>
          {/* Icon + name */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <RoleIcon size={14} style={{ color: meta.color }} />
            <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.02em' }}>
              {currentUser.name?.split(' ').slice(0, 2).join(' ')}
            </span>
            <span
              style={{
                fontSize: '0.7rem',
                fontWeight: 600,
                color: meta.color,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '1px 6px',
                borderRadius: '6px',
                background: `color-mix(in srgb, ${meta.color} 12%, transparent)`
              }}
            >
              {meta.label}
            </span>
          </div>

          <div style={{ width: '1px', height: '24px', background: 'var(--border-medium)' }} />

          {/* Reset data */}
          <button
            onClick={() => {
              if (window.confirm('Reset all demo records back to initial college seed state?')) {
                resetAllData();
              }
            }}
            className="btn btn-sm btn-ghost"
            title="Reset all demo data in localStorage"
            style={{ color: 'var(--color-warning)', padding: '4px 8px' }}
          >
            <RotateCcw size={13} />
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="btn btn-sm btn-ghost"
            title="Logout — return to Login page"
            style={{ color: 'var(--color-danger)', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            <LogOut size={13} />
            <span style={{ fontSize: '0.78rem', fontWeight: 600 }}>Logout</span>
          </button>
        </>
      )}

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="btn btn-icon btn-ghost btn-sm"
        style={{ width: '28px', height: '28px', padding: 0 }}
        title={collapsed ? 'Expand' : 'Collapse'}
      >
        {collapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
      </button>
    </div>
  );
}
