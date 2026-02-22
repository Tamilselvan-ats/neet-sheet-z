import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, BookOpen, ClipboardList, Settings, Menu, X, GraduationCap } from 'lucide-react';
import { cn } from '../lib/utils';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/', icon: LayoutDashboard },
    { name: 'Syllabus Tracker', path: '/tracker', icon: BookOpen },
    { name: 'Mock Tests', path: '/quiz', icon: ClipboardList },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transition-transform duration-300 lg:relative lg:translate-x-0",
        !isSidebarOpen && "-translate-x-full lg:hidden"
      )}>
        <div className="h-full flex flex-col">
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
                <GraduationCap size={24} />
              </div>
              <div>
                <h1 className="font-bold text-slate-900 leading-tight">NEET 2026</h1>
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wider">Master Tracker</p>
              </div>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-slate-100 rounded-lg lg:hidden text-slate-500"
            >
              <X size={20} />
            </button>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setIsSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-emerald-50 text-emerald-700"
                    : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="p-4 border-t border-slate-100">
            <div className="bg-slate-900 rounded-2xl p-4 text-white">
              <p className="text-xs font-semibold text-emerald-400 mb-1">PRO TIP</p>
              <p className="text-xs leading-relaxed opacity-80">Consistent revision is the key to cracking NEET. Track your progress daily!</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-bottom border-slate-200 flex items-center justify-between px-6 sticky top-0 z-40">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-2 hover:bg-slate-100 rounded-lg lg:hidden"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-right">
              <p className="text-sm font-semibold text-slate-900">Aspirant Mode</p>
              <p className="text-xs text-slate-500">NEET UG 2026</p>
            </div>
            <div className="w-10 h-10 bg-slate-200 rounded-full border-2 border-white shadow-sm" />
          </div>
        </header>

        <main className="flex-1 p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};
