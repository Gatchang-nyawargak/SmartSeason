import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function TopBar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login')
  }

  return (
    <header className="bg-[#f8faf6] flex justify-between items-center w-full px-6 py-4 fixed top-0 z-50 border-b border-[#e7e9e5]">
      <div className="flex items-center gap-4">
        <div className="w-8 h-8 bg-[#164212] rounded-lg flex items-center justify-center">
          <span className="material-symbols-outlined text-white text-lg">potted_plant</span>
        </div>
        <Link to={user?.role === 'admin' ? '/admin' : '/dashboard'} className="font-[Manrope] font-black tracking-widest text-[#164212] uppercase text-xl">
          SmartSeason
        </Link>
      </div>
      <div className="flex items-center gap-3">
        {user && (
          <div className="hidden md:flex items-center gap-2 text-sm text-[#42493e]">
            <span className="material-symbols-outlined text-base">person</span>
            <span className="font-medium">{user.name}</span>
            <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${user.role === 'admin' ? 'bg-[#164212] text-white' : 'bg-[#e2e5ca] text-[#42493e]'}`}>
              {user.role}
            </span>
          </div>
        )}
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 text-sm text-[#42493e] hover:text-[#ba1a1a] transition-colors px-3 py-2 rounded-xl hover:bg-[#ffdad6]"
        >
          <span className="material-symbols-outlined text-base">logout</span>
          <span className="hidden md:inline font-medium">Logout</span>
        </button>
      </div>
    </header>
  )
}
