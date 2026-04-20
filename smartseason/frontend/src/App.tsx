import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import AdminDashboard from './pages/AdminDashboard'
import AgentDashboard from './pages/AgentDashboard'
import CreateField from './pages/CreateField'
import FieldDetails from './pages/FieldDetails'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* Admin only */}
          <Route path="/admin" element={
            <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>
          } />
          <Route path="/fields/new" element={
            <ProtectedRoute role="admin"><CreateField /></ProtectedRoute>
          } />

          {/* Agent only */}
          <Route path="/dashboard" element={
            <ProtectedRoute role="agent"><AgentDashboard /></ProtectedRoute>
          } />

          {/* Both roles can view field details */}
          <Route path="/fields/:id" element={
            <ProtectedRoute><FieldDetails /></ProtectedRoute>
          } />

          {/* Default: redirect to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}
