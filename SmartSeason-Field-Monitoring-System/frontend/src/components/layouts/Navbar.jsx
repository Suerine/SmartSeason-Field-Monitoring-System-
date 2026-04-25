import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LOGO from '../../assets/shambaRecords-logo.svg';

export default function Navbar() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const links = [
    { to: '/', label: 'Dashboard'},
    { to: '/fields', label: 'Fields'},
    ...(user?.role === 'admin' ? [
      { to: '/agents', label: 'Agents'},
      { to: '/crops', label: 'Crops'},
    ] : user?.role === 'agent' ? [
      { to: '/crops', label: 'Crops'},
    ] : []),
  ];

  return (
    <>
      {/* Mobile Top Header (Logo + Logout) */}
      <div className="md:hidden fixed top-0 left-0 w-full bg-white border-b border-gray-100 z-40 px-5 py-3 flex items-center justify-between">
        <img src={LOGO} alt="Shamba Records Logo" className="h-6 w-auto" />
        <button
          onClick={logout}
          className="text-[11px] font-bold uppercase tracking-wide text-gray-400 hover:text-red-500 transition-colors bg-gray-50 px-3 py-1.5 rounded-full"
        >
          Sign out
        </button>
      </div>

      {/* Desktop Sidebar Navbar */}
      <aside className="hidden md:flex fixed top-0 left-0 h-screen w-56 bg-white border-r border-gray-100 flex-col z-30 px-4 py-6">
        {/* Logo */}
        <Link to="/" className="mb-8 flex items-center justify-center">
          <img src={LOGO} alt="Shamba Records Logo" className="h-12 w-auto" />
        </Link>

        {/* Nav links */}
        <nav className="flex-1 flex flex-col gap-4">
          {links.map(({ to, label }) => {
            const isActive = location.pathname === to || location.pathname === `${to}/`;
            return (
              <Link
                key={to}
                to={to}
                style={{ borderRadius: '9999px 16px 9999px 9999px' }}
                className={`
                  relative text-center text-white font-normal text-lg py-2 px-6
                  transition-all duration-100 select-none block
                  ${isActive
                    ? 'bg-green-500 translate-y-[3px] shadow-[0_2px_0_#15803d]'
                    : 'bg-green-500 shadow-[0_6px_0_#15803d] hover:translate-y-[2px] hover:shadow-[0_4px_0_#15803d] active:translate-y-[6px] active:shadow-none'
                  }
                `}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        {/* User info + logout */}
        <div className="border-t border-gray-100 pt-4 mt-4">
          <p className="text-sm font-semibold text-gray-700 truncate">{user?.name}</p>
          <span className="inline-block mt-0.5 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-800 capitalize">
            {user?.role}
          </span>
          <button
            onClick={logout}
            className="mt-3 w-full text-left text-sm text-gray-400 hover:text-gray-700 transition-colors font-medium"
          >
            Sign out →
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Tab Bar */}
      <aside className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 z-50 pb-safe">
        <nav className="flex items-center justify-around px-2 py-2">
          {links.map(({ to, label }) => {
            const isActive = location.pathname === to || location.pathname === `${to}/`;
            return (
              <Link
                key={to}
                to={to}
                className={`flex-1 text-center py-2.5 px-1 rounded-2xl mx-1 transition-all ${
                  isActive ? 'bg-green-50 text-green-600 font-bold' : 'text-gray-500 font-medium hover:bg-gray-50'
                }`}
              >
                <div className="text-[13px]">{label === 'Dashboard' ? 'Dash' : label}</div>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}