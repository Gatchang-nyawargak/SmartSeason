import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import AdminDashboard from './pages/AdminDashboard'
import AgentDashboard from './pages/AgentDashboard'
import CreateField from './pages/CreateField'
import FieldDetails from './pages/FieldDetails'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/fields" element={<AgentDashboard />} />
        <Route path="/fields/new" element={<CreateField />} />
        <Route path="/fields/:id" element={<FieldDetails />} />
      </Routes>
    </BrowserRouter>
  )
}
