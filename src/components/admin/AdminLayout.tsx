import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Sparkles,
  Layers,
  FolderKanban,
  FileSpreadsheet,
  ListOrdered,
  MessageSquareQuote,
  Images,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Bell
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { Seo } from '../seo/Seo';

const navItems = [
  { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { name: 'Hero CMS', path: '/admin/hero', icon: Sparkles },
  { name: 'Studio CMS', path: '/admin/studio', icon: Layers },
  { name: 'Projects', path: '/admin/projects', icon: FolderKanban },
  { name: 'Services', path: '/admin/services', icon: FileSpreadsheet },
  { name: 'Process', path: '/admin/process', icon: ListOrdered },
  { name: 'Testimonials', path: '/admin/testimonials', icon: MessageSquareQuote },
  { name: 'Visual Gallery', path: '/admin/gallery', icon: Images },
  { name: 'Inquiries', path: '/admin/messages', icon: Inbox },
  { name: 'Settings', path: '/admin/settings', icon: Settings },
];

export const AdminLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { signOut, user } = useAuth();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  return (
    <>
      <Seo
        title="Admin | Manvvi Design Studio"
        description="Private administration area for Manvvi Design Studio."
        noIndex
      />
      <div className="min-h-screen bg-[#F7F6F3] text-neutral-900 flex font-sans antialiased">
      {/* Sidebar for Desktop */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-neutral-200 fixed inset-y-0 z-30 shadow-sm">
        {/* Brand Banner */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-neutral-200">
          <Link to="/admin" className="font-serif text-lg tracking-wider text-neutral-900 font-semibold">
            MANVVI <span className="text-[#C8A97E]">CMS</span>
          </Link>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-neutral-100 text-neutral-600 rounded">
            v2.4
          </span>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path === '/admin'
                ? location.pathname === '/admin'
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-[#C8A97E]' : 'text-neutral-500'}`} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer / User Session */}
        <div className="p-4 border-t border-neutral-200 space-y-3 bg-neutral-50/50">
          <div className="flex items-center justify-between">
            <div className="truncate">
              <p className="text-xs font-semibold text-neutral-900 truncate">
                {user?.email || 'Admin'}
              </p>
              <p className="text-[10px] text-neutral-500 font-mono">
                Supabase Authenticated
              </p>
            </div>
            <button
              onClick={handleSignOut}
              className="p-1.5 text-neutral-400 hover:text-red-600 rounded-md hover:bg-neutral-100 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>

          <Link
            to="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-center space-x-2 w-full py-2 px-3 bg-white border border-neutral-200 rounded-md text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <span>View Live Site</span>
            <ExternalLink className="w-3.5 h-3.5 text-neutral-400" />
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6 sticky top-0 z-20 shadow-sm">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="lg:hidden p-2 text-neutral-600 hover:text-neutral-900 rounded-md hover:bg-neutral-100"
            >
              <Menu className="w-5 h-5" />
            </button>
            <h1 className="text-sm font-semibold text-neutral-800">
              Manvvi Design Studio — Editorial Management System
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mr-1.5 animate-pulse" />
              Live System Active
            </span>
          </div>
        </header>

        {/* Content Outlet */}
        <main className="flex-1 p-6 sm:p-8 md:p-10 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>

      {/* Mobile Drawer */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-neutral-900/60 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <div className="relative flex flex-col w-72 max-w-[80vw] bg-white h-full z-10 p-6 shadow-2xl">
            <div className="flex items-center justify-between pb-6 border-b border-neutral-200">
              <span className="font-serif text-lg font-bold">MANVVI CMS</span>
              <button onClick={() => setMobileSidebarOpen(false)} className="p-1 text-neutral-500">
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileSidebarOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-2.5 rounded-md text-sm font-medium ${
                      isActive ? 'bg-neutral-900 text-white' : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-neutral-200">
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-sm text-red-600 font-medium py-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </>
  );
};
