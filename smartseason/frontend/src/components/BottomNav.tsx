import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/admin', icon: 'dashboard', label: 'Dashboard' },
  { to: '/fields', icon: 'potted_plant', label: 'Fields' },
  { to: '#', icon: 'assignment', label: 'Tasks' },
  { to: '#', icon: 'notifications', label: 'Alerts' },
]

export default function BottomNav() {
  const { pathname } = useLocation()
  return (
    <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 pb-6 pt-3 bg-[#f8faf6]/60 backdrop-blur-xl shadow-[0px_-12px_32px_rgba(25,28,26,0.06)] rounded-t-[24px]">
      {navItems.map(({ to, icon, label }) => {
        const active = pathname === to
        return (
          <Link key={label} to={to}
            className={`flex flex-col items-center justify-center transition-all duration-300 ease-out ${active ? 'bg-[#164212] text-white rounded-[18px] px-5 py-2 shadow-lg' : 'text-stone-500 p-2 hover:text-[#2e5a27]'}`}>
            <span className="material-symbols-outlined">{icon}</span>
            <span className="text-[11px] font-semibold tracking-wide uppercase mt-1">{label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
