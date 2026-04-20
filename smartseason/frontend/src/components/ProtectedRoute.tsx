import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

interface Props {
  children: React.ReactNode
  role?: 'admin' | 'agent'
}

export default function ProtectedRoute({ children, role }: Props) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8faf6] flex items-center justify-center">
        <span className="material-symbols-outlined text-[#164212] text-5xl animate-spin">progress_activity</span>
      </div>
    )
  }

  if (!user) return <Navigate to="/login" replace />

  // If a specific role is required and user doesn't have it, redirect to their dashboard
  if (role && user.role !== role) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />
  }

  return <>{children}</>
}
