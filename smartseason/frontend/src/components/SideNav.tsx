import { Link, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/admin', icon: 'dashboard', label: 'Overview' },
  { to: '/fields', icon: 'potted_plant', label: 'Fields' },
  { to: '#', icon: 'group', label: 'Team Management' },
  { to: '#', icon: 'library_books', label: 'Resource Library' },
  { to: '#', icon: 'cloud_done', label: 'Climate Reports' },
]

export default function SideNav() {
  const { pathname } = useLocation()
  return (
    <aside className="hidden md:flex fixed left-0 top-0 h-full w-72 z-[60] flex-col py-8 bg-[#f2f4f0] rounded-r-[24px] shadow-[12px_0px_32px_rgba(25,28,26,0.06)]">
      <div className="px-8 mb-10 flex items-center gap-4">
        <div className="w-12 h-12 rounded-xl bg-[#164212] flex items-center justify-center text-white shadow-inner">
          <span className="material-symbols-outlined">analytics</span>
        </div>
        <div>
          <h2 className="font-[Manrope] font-bold text-[#164212] text-lg">AgriManager Admin</h2>
          <p className="text-xs font-medium text-stone-600">North Sector Lead</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map(({ to, icon, label }) => {
          const active = pathname === to
          return (
            <Link key={label} to={to}
              className={`flex items-center px-4 py-3 mx-2 rounded-xl transition-all ${active ? 'bg-[#164212] text-white shadow-lg font-semibold' : 'text-stone-600 hover:bg-stone-200'}`}>
              <span className="material-symbols-outlined mr-4">{icon}</span>
              <span className="text-md font-medium">{label}</span>
            </Link>
          )
        })}
      </nav>
      <div className="mt-auto px-2">
        <Link to="#" className="flex items-center text-stone-600 px-4 py-3 hover:bg-stone-200 rounded-xl transition-all">
          <span className="material-symbols-outlined mr-4">settings</span>
          <span className="text-md font-medium">Settings</span>
        </Link>
      </div>
    </aside>
  )
}
