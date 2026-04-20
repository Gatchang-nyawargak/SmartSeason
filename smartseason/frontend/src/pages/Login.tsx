import { useState, type FormEvent } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // Already logged in — redirect to correct dashboard
  if (user) {
    return <Navigate to={user.role === 'admin' ? '/admin' : '/dashboard'} replace />
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(email, password)
      // login sets user in context; navigate based on role from response
      const stored = JSON.parse(localStorage.getItem('user') || '{}')
      navigate(stored.role === 'admin' ? '/admin' : '/dashboard', { replace: true })
    } catch {
      setError('Invalid email or password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f8faf6] flex items-center justify-center px-4">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#164212] rounded-2xl mb-4 shadow-lg">
            <span className="material-symbols-outlined text-white text-3xl">potted_plant</span>
          </div>
          <h1 className="font-[Manrope] font-black text-3xl text-[#164212] tracking-tight">SmartSeason</h1>
          <p className="text-[#42493e] text-sm mt-1">Field Monitoring System</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h2 className="font-[Manrope] font-bold text-xl text-[#191c1a] mb-6">Sign in to your account</h2>

          {error && (
            <div className="bg-[#ffdad6] text-[#93000a] text-sm font-medium px-4 py-3 rounded-xl mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">error</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold text-[#42493e] tracking-wider uppercase mb-2">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@smartseason.com"
                className="w-full bg-[#f2f4f0] border-0 border-b-2 border-transparent focus:border-[#164212] rounded-t-xl px-4 py-3 text-[#191c1a] transition-all"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#42493e] tracking-wider uppercase mb-2">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#f2f4f0] border-0 border-b-2 border-transparent focus:border-[#164212] rounded-t-xl px-4 py-3 text-[#191c1a] transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-br from-[#164212] to-[#2e5a27] text-white font-bold py-4 rounded-xl shadow-lg hover:opacity-90 active:scale-95 transition-all disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <span className="material-symbols-outlined animate-spin text-xl">progress_activity</span>
              ) : (
                <>
                  <span className="material-symbols-outlined text-xl">login</span>
                  Sign In
                </>
              )}
            </button>
          </form>
        </div>

        {/* Demo credentials hint */}
        <div className="mt-6 bg-[#e2e5ca] rounded-xl p-4 text-sm text-[#42493e]">
          <p className="font-bold text-[#164212] mb-2 flex items-center gap-1">
            <span className="material-symbols-outlined text-base">info</span>
            Demo Credentials
          </p>
          <div className="space-y-1">
            <p><span className="font-semibold">Admin:</span> admin@smartseason.com</p>
            <p><span className="font-semibold">Agent:</span> alice@smartseason.com</p>
            <p><span className="font-semibold">Password:</span> password123</p>
          </div>
        </div>
      </div>
    </div>
  )
}
