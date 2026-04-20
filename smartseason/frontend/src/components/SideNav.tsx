import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const adminNav = [
  { to: '/admin', icon: 'dashboard', label: 'Overview' },
  { to: '/fields/new', icon: 'add_location', label: 'Register Field' },
  { to: '#', icon: 'group', label: 'Team Management' },
  { to: '#', icon: 'cloud_done', label: 'Climate Reports' },
]

const agentNav = [
  { to: '/dashboard', icon: 'dashboard', label: 'My Dashboard' },
  { to: '#', icon: 'assignment', label: 'Tasks' },
  { to: '#', icon: 'notifications', label: 'Alerts' },
]

export default function SideNav() {
  const { pathname } = useLocation()
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const navItems = user?.role === 'admin' ? adminNav : agentNav

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-72 z-[60] flex-col py-8 bg-[#f2f4f0] rounded-r-[24px] shadow-[12px_0px_32px_rgba(25,28,26,0.06)]">
      {/* User info */}
      <div className="px-8 mb-10 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#164212] flex items-center justify-center text-white shadow-inner flex-shrink-0">
          <span className="material-symbols-outlined">person</span>
        </div>
        <div className="min-w-0">
          <h2 className="font-[Manrope] font-bold text-[#164212] text-base truncate">{user?.name}</h2>
          <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${user?.role === 'admin' ? 'bg-[#164212] text-white' : 'bg-[#e2e5ca] text-[#42493e]'}`}>
            {user?.role}
          </span>
        </div>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(({ to, icon, label }) => {
          const active = pathname === to
          return (
            <Link key={label} to={to}
              className={`flex items-center px-4 py-3 mx-2 rounded-xl transition-all ${active ? 'bg-[#164212] text-white shadow-lg font-semibold' : 'text-stone-600 hover:bg-stone-200'}`}>
              <span className="material-symbols-outlined mr-4">{icon}</span>
              <span className="text-sm font-medium">{label}</span>
            </Link>
          )
        })}
      </nav>

      <div className="mt-auto px-2 border-t border-[#c2c9bb]/30 pt-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center text-[#ba1a1a] px-4 py-3 hover:bg-[#ffdad6] rounded-xl transition-all"
        >
          <span className="material-symbols-outlined mr-4">logout</span>
          <span className="text-sm font-medium">Sign Out</span>
        </button>
      </div>
    </aside>
  )
}
