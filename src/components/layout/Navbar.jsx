import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import collegeLogo from '../../assets/logo.png';
import {
  Sun,
  Moon,
  Bell,
  LogOut,
  Download,
  CheckCircle,
  Clock,
  Shield,
  GraduationCap,
  Sparkles,
  Menu,
  X
} from 'lucide-react';

export default function Navbar({ onToggleMobileSidebar }) {
  const { currentUser, role, theme, toggleTheme, logout } = useAuth();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useData();
  const [showNotifications, setShowNotifications] = useState(false);
  const [installPrompt, setInstallPrompt] = useState(null);

  const unreadCount = notifications.filter((n) => !n.read).length;

  useEffect(() => {
    const handleBeforeInstall = (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallClick = () => {
    if (installPrompt) {
      installPrompt.prompt();
      installPrompt.userChoice.then(() => setInstallPrompt(null));
    } else {
      alert('PWA is installed or ready! On mobile or desktop Chrome, click the install icon in your address bar.');
    }
  };

  return (
    <header
      style={{
        height: 'var(--navbar-height)',
        background: 'var(--glass-bg)',
        backdropFilter: 'var(--glass-blur)',
        WebkitBackdropFilter: 'var(--glass-blur)',
        borderBottom: '1px solid var(--border-subtle)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 1.5rem',
        transition: 'background var(--transition-normal)'
      }}
    >
      {/* Left: Mobile Menu Trigger + Brand Info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <button
          onClick={onToggleMobileSidebar}
          className="btn btn-icon btn-ghost"
          style={{ display: 'none' }}
          id="mobile-sidebar-toggle"
          title="Toggle Navigation Menu"
        >
          <Menu size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '42px',
            height: '42px',
            borderRadius: '10px',
            background: '#ffffff',
            padding: '3px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 2px 8px rgba(0,0,0,0.25)',
            flexShrink: 0
          }}>
            <img
              src={collegeLogo}
              alt="Sanjay Gandhi Polytechnic Logo"
              style={{
                height: '100%',
                width: '100%',
                objectFit: 'contain'
              }}
            />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontFamily: 'var(--font-display)', fontWeight: 800, fontSize: '1.15rem' }}>
                Student Hive
              </span>
              <span
                className="badge"
                style={{
                  background:
                    role === 'student'
                      ? 'var(--dept-cse-glow)'
                      : role === 'faculty'
                      ? 'var(--dept-mech-glow)'
                      : 'var(--dept-eee-glow)',
                  color:
                    role === 'student'
                      ? 'var(--dept-cse)'
                      : role === 'faculty'
                      ? 'var(--dept-mech)'
                      : 'var(--dept-eee)',
                  textTransform: 'uppercase',
                  fontSize: '0.68rem',
                  fontWeight: 700
                }}
              >
                {role}
              </span>
            </div>
            {role === 'student' && currentUser && (
              <span className="hide-mobile" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {currentUser.department} • Sem {currentUser.semester} ({currentUser.section})
              </span>
            )}
            {role === 'faculty' && currentUser && (
              <span className="hide-mobile" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                {currentUser.department} • {currentUser.designation}
              </span>
            )}
            {role === 'admin' && (
              <span className="hide-mobile" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                Central Administration & Academic Affairs
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Right: Actions (PWA install, Theme toggle, Notifications, User pill) */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* PWA Install Button */}
        <button
          onClick={handleInstallClick}
          className="btn btn-sm btn-secondary"
          title="Install Student Hive PWA"
          style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
        >
          <Download size={14} color="var(--dept-cse)" />
          <span className="hide-mobile" style={{ fontSize: '0.78rem' }}>Install App</span>
        </button>

        {/* Theme Switcher */}
        <button
          onClick={toggleTheme}
          className="btn btn-icon btn-ghost"
          title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} mode`}
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={18} color="#f59e0b" /> : <Moon size={18} color="#6366f1" />}
        </button>

        {/* Notification Bell Dropdown */}
        <div style={{ position: 'relative' }}>
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="btn btn-icon btn-ghost"
            title="Notifications & Reschedule Alerts"
            style={{ position: 'relative' }}
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span
                style={{
                  position: 'absolute',
                  top: '6px',
                  right: '6px',
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--color-danger)',
                  boxShadow: '0 0 8px var(--color-danger)'
                }}
              />
            )}
          </button>

          {showNotifications && (
            <div
              className="glass-panel"
              style={{
                position: 'absolute',
                top: '120%',
                right: 0,
                width: '340px',
                maxHeight: '420px',
                overflowY: 'auto',
                padding: '1rem',
                zIndex: 100,
                boxShadow: 'var(--shadow-lg)'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '0.75rem',
                  paddingBottom: '0.5rem',
                  borderBottom: '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Bell size={15} color="var(--dept-cse)" />
                  <span style={{ fontWeight: 700, fontSize: '0.88rem' }}>Campus Alerts</span>
                  <span className="badge badge-dept">{unreadCount} new</span>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="btn btn-ghost btn-sm"
                    style={{ fontSize: '0.72rem', padding: '2px 6px' }}
                  >
                    Mark all read
                  </button>
                )}
              </div>

              {notifications.length === 0 ? (
                <p style={{ fontSize: '0.8rem', textAlign: 'center', padding: '1.5rem 0' }}>No notifications</p>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => markNotificationRead(notif.id)}
                      style={{
                        padding: '10px',
                        borderRadius: '10px',
                        background: notif.read ? 'transparent' : 'var(--badge-bg)',
                        border: '1px solid var(--border-subtle)',
                        cursor: 'pointer',
                        transition: 'background var(--transition-fast)'
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.82rem',
                          fontWeight: notif.read ? 600 : 700,
                          color: notif.type === 'warning' ? 'var(--color-warning)' : 'var(--text-primary)',
                          marginBottom: '4px'
                        }}
                      >
                        {notif.title}
                      </div>
                      <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                        {notif.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* User Pill with Public ID Protection */}
        {currentUser && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '4px 10px',
              borderRadius: '12px',
              background: 'var(--bg-surface)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <img
              src={currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150'}
              alt={currentUser.name}
              style={{ width: '32px', height: '32px', borderRadius: '50%', objectFit: 'cover' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: 700, lineHeight: 1.2 }}>{currentUser.name}</span>
              {role === 'student' && (
                <span className="hide-mobile" style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>
                  ID: <span style={{ color: 'var(--dept-cse)', fontWeight: 600 }}>{currentUser.publicId}</span>
                </span>
              )}
              {role === 'faculty' && (
                <span className="hide-mobile" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{currentUser.facultyId}</span>
              )}
              {role === 'admin' && (
                <span className="hide-mobile" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{currentUser.adminId}</span>
              )}
            </div>

            <button
              onClick={logout}
              className="btn btn-icon btn-ghost btn-sm"
              title="Logout"
              style={{ marginLeft: '4px', width: '28px', height: '28px' }}
            >
              <LogOut size={14} color="var(--color-danger)" />
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
