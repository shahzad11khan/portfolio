import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  FolderOpen,
  PlusCircle,
  User,
  Settings,
  LogOut,
  Globe,
  ExternalLink,
  Briefcase,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { projectApi } from '../../api/projectApi';
import { getAssetUrl } from '../../utils/helpers';
import Modal from '../common/Modal';

var NAV_ITEMS = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/projects', icon: FolderOpen, label: 'Projects', end: true },
  { to: '/projects/new', icon: PlusCircle, label: 'Add Project', end: true },
  { divider: true },
  { to: '/profile', icon: User, label: 'Profile', end: true },
  { to: '/settings', icon: Settings, label: 'Settings', end: true },
];

function SidebarNav(props) {
  var collapsed = props.collapsed;
  var onMobileClose = props.onMobileClose;
  var onLogoutClick = props.onLogoutClick;

  var { user } = useAuth();
  var [projectCount, setProjectCount] = useState(null);

  useEffect(function () {
    projectApi
      .getStats()
      .then(function (res) {
        if (res.data && res.data.success && res.data.data) {
          setProjectCount(res.data.data.total != null ? res.data.data.total : 0);
        }
      })
      .catch(function () {});
  }, []);

  var displayName = user && user.name ? user.name : 'Portfolio';
  var displayRole = user && user.role ? user.role : 'Admin Panel';
  var avatarUrl = getAssetUrl(user && user.avatar ? user.avatar : null);
  var initials = displayName
    .split(' ')
    .filter(Boolean)
    .map(function (p) {
      return p[0];
    })
    .slice(0, 2)
    .join('')
    .toUpperCase() || 'P';

  return (
    <div className="h-full flex flex-col">
      {/* Dynamic Header Brand */}
      <div className="flex items-center gap-3 px-4 h-16 border-b border-slate-100 flex-shrink-0">
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={displayName}
            className="w-9 h-9 rounded-xl object-cover ring-2 ring-blue-100 flex-shrink-0 shadow-sm"
            onError={function (e) {
              e.target.style.display = 'none';
            }}
          />
        ) : (
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-blue-500/20 flex-shrink-0">
            {initials}
          </div>
        )}

        <AnimatePresence>
          {!collapsed && (
            <motion.span
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: 'auto' }}
              exit={{ opacity: 0, width: 0 }}
              className="text-base font-bold text-slate-900 tracking-tight overflow-hidden whitespace-nowrap"
            >
              Admin Panel
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 py-4 overflow-y-auto space-y-1">
        {NAV_ITEMS.map(function (item, i) {
          if (item.divider) {
            return <div key={i} className="mx-4 my-2 border-t border-slate-100" />;
          }

          return (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              onClick={onMobileClose}
              className={function ({ isActive }) {
                return (
                  'flex items-center gap-3 mx-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 ' +
                  (isActive
                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900')
                );
              }}
              title={item.label}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <AnimatePresence>
                {!collapsed && (
                  <motion.div
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: 'auto' }}
                    exit={{ opacity: 0, width: 0 }}
                    className="flex-1 flex items-center justify-between overflow-hidden whitespace-nowrap"
                  >
                    <span>{item.label}</span>
                    {item.to === '/projects' && projectCount !== null && (
                      <span className="ml-2 text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-100/80 text-blue-700">
                        {projectCount}
                      </span>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </NavLink>
          );
        })}

        {/* View Public Website Link */}
        <div className="mx-4 my-2 border-t border-slate-100" />
        <Link
          to="/"
          target="_blank"
          rel="noopener noreferrer"
          onClick={onMobileClose}
          className="flex items-center gap-3 mx-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-emerald-600 hover:bg-emerald-50 transition-all duration-200"
          title="View Live Portfolio"
        >
          <Globe className="w-5 h-5 flex-shrink-0 text-emerald-500" />
          <AnimatePresence>
            {!collapsed && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1 flex items-center justify-between overflow-hidden whitespace-nowrap"
              >
                <span>Live Website</span>
                <ExternalLink className="w-3.5 h-3.5 text-emerald-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </nav>

      {/* Dynamic Footer with User Details & Logout */}
      <div className="border-t border-slate-100 p-3 flex-shrink-0 space-y-2">
        <AnimatePresence>
          {!collapsed && user && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="px-3 py-2 rounded-xl bg-slate-50 border border-slate-100/80 overflow-hidden"
            >
              <p className="text-xs font-semibold text-slate-800 truncate">{displayName}</p>
              <p className="text-[11px] text-slate-400 truncate">{user.email}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={onLogoutClick}
          className="flex items-center gap-3 w-full px-3.5 py-2.5 rounded-xl text-sm font-medium text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200"
          title="Sign Out"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                className="overflow-hidden whitespace-nowrap"
              >
                Sign Out
              </motion.span>
            )}
          </AnimatePresence>
        </button>
      </div>
    </div>
  );
}

export default function Sidebar(props) {
  var collapsed = props.collapsed;
  var mobileOpen = props.mobileOpen;
  var onMobileClose = props.onMobileClose;
  var toast = useToast();
  var logout = useAuth().logout;

  var modalState = useState(false);
  var showLogoutModal = modalState[0];
  var setShowLogoutModal = modalState[1];

  var handleLogout = function () {
    logout();
    toast.success('Signed out successfully');
    setShowLogoutModal(false);
    onMobileClose();
  };

  return (
    <>
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className="hidden md:block fixed top-0 left-0 bottom-0 bg-white border-r border-slate-200 z-40 overflow-hidden"
      >
        <SidebarNav
          collapsed={collapsed}
          onMobileClose={function () {}}
          onLogoutClick={function () {
            setShowLogoutModal(true);
          }}
        />
      </motion.aside>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="md:hidden fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
              onClick={onMobileClose}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
              className="md:hidden fixed top-0 left-0 bottom-0 w-[280px] bg-white border-r border-slate-200 z-50"
            >
              <SidebarNav
                collapsed={false}
                onMobileClose={onMobileClose}
                onLogoutClick={function () {
                  setShowLogoutModal(true);
                }}
              />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <Modal
        open={showLogoutModal}
        title="Sign Out"
        message="Are you sure you want to sign out of your account?"
        confirmText="Sign Out"
        type="warning"
        onConfirm={handleLogout}
        onCancel={function () {
          setShowLogoutModal(false);
        }}
      />
    </>
  );
}
