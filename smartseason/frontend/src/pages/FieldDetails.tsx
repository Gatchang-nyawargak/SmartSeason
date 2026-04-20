import { useEffect, useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import TopBar from '../components/TopBar'
import SideNav from '../components/SideNav'
import BottomNav from '../components/BottomNav'
import { useAuth } from '../context/AuthContext'
import api from '../api'

interface Field {
  id: number
  name: string
  crop_type: string
  stage: string
  status: string
  planting_date: string
  agent_name: string
}

interface FieldUpdate {
  id: number
  stage: string
  notes: string
  agent_name: string
  created_at: string
}

const stageStyle: Record<string, string> = {
  planted: 'bg-[#bdf0ad] text-[#002201]',
  growing: 'bg-[#e2e5ca] text-[#636651]',
  ready: 'bg-[#cfe5ff] text-[#001d34]',
  harvested: 'bg-[#e1e3df] text-[#42493e]',
}

function formatDate(d: string) {
  return new Date(d).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' })
}

export default function FieldDetails() {
  const { id } = useParams()
  const { user } = useAuth()
  const [field, setField] = useState<Field | null>(null)
  const [history, setHistory] = useState<FieldUpdate[]>([])
  const [loading, setLoading] = useState(true)
  const [stage, setStage] = useState('growing')
  const [notes, setNotes] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function loadData() {
    try {
      const [fieldRes, updatesRes] = await Promise.all([
        api.get(`/fields/${id}`),
        api.get(`/fields/${id}/updates`),
      ])
      setField(fieldRes.data)
      setStage(fieldRes.data.stage)
      setHistory(updatesRes.data)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { loadData() }, [id])

  async function handleUpdate(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSuccess(false)
    setSubmitting(true)
    try {
      await api.post(`/fields/${id}/updates`, { stage, notes })
      setNotes('')
      setSuccess(true)
      await loadData()
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error
      setError(msg || 'Failed to log update')
    } finally {
      setSubmitting(false)
    }
  }

  const backTo = user?.role === 'admin' ? '/admin' : '/dashboard'

  if (loading) {
    return (
      <div className="flex min-h-screen bg-[#f8faf6]">
        <SideNav />
        <main className="md:ml-72 flex-1 flex items-center justify-center">
          <TopBar />
          <span className="material-symbols-outlined text-[#164212] text-5xl animate-spin">progress_activity</span>
        </main>
      </div>
    )
  }

  if (!field) {
    return (
      <div className="flex min-h-screen bg-[#f8faf6]">
        <SideNav />
        <main className="md:ml-72 flex-1 flex items-center justify-center">
          <TopBar />
          <div className="text-center">
            <span className="material-symbols-outlined text-6xl text-[#42493e] block mb-3">landscape</span>
            <p className="text-xl font-bold text-[#191c1a]">Field not found</p>
            <Link to={backTo} className="text-[#164212] hover:underline mt-2 block">← Back to Dashboard</Link>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#f8faf6]">
      <SideNav />
      <main className="md:ml-72 flex-1 pt-24 pb-32 md:pb-10 px-6 md:px-12 max-w-7xl mx-auto">
        <TopBar />
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Left: Hero + Update Form */}
          <section className="lg:col-span-8 flex flex-col gap-6">
            {/* Hero */}
            <div className="bg-white rounded-xl p-8 shadow-sm overflow-hidden relative">
              <div className="relative z-10">
                <nav className="flex items-center gap-2 text-[#42493e] text-sm mb-4 uppercase tracking-wider">
                  <Link to={backTo} className="hover:text-[#164212]">
                    {user?.role === 'admin' ? 'Dashboard' : 'My Fields'}
                  </Link>
                  <span className="material-symbols-outlined text-sm">chevron_right</span>
                  <span className="text-[#164212] font-bold">{field.name}</span>
                </nav>
                <h2 className="font-[Manrope] text-4xl md:text-5xl font-extrabold text-[#164212] tracking-tight mb-4">{field.name}</h2>
                <div className="flex flex-wrap gap-3 items-center">
                  <div className="flex items-center gap-2 bg-[#e2e5ca] text-[#636651] px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide">
                    <span className="material-symbols-outlined text-lg">agriculture</span>{field.crop_type}
                  </div>
                  <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide ${stageStyle[field.stage] || 'bg-[#e2e5ca] text-[#42493e]'}`}>
                    <span className="material-symbols-outlined text-lg">eco</span>{field.stage}
                  </div>
                  {field.status === 'at_risk' && (
                    <div className="flex items-center gap-1 bg-[#ffdad6] text-[#93000a] px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide">
                      <span className="material-symbols-outlined text-lg">warning</span>At Risk
                    </div>
                  )}
                  {field.agent_name && (
                    <div className="flex items-center gap-1 bg-[#f2f4f0] text-[#42493e] px-4 py-1.5 rounded-full text-sm font-medium">
                      <span className="material-symbols-outlined text-base">person</span>{field.agent_name}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Update Form */}
            <div className="bg-[#f2f4f0] rounded-xl p-8 flex flex-col gap-6">
              <h3 className="font-[Manrope] text-2xl font-bold text-[#191c1a]">Log Field Update</h3>

              {success && (
                <div className="bg-[#bdf0ad] text-[#002201] px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-medium">
                  <span className="material-symbols-outlined text-base">check_circle</span>
                  Update logged successfully!
                </div>
              )}
              {error && (
                <div className="bg-[#ffdad6] text-[#93000a] px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-medium">
                  <span className="material-symbols-outlined text-base">error</span>{error}
                </div>
              )}

              <form onSubmit={handleUpdate} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-bold text-[#164212] uppercase tracking-widest">Growth Stage</label>
                    <div className="relative">
                      <select
                        value={stage}
                        onChange={e => setStage(e.target.value)}
                        className="w-full bg-white border-none focus:ring-0 rounded-xl px-4 py-4 text-[#191c1a] appearance-none shadow-sm"
                      >
                        <option value="planted">Planted</option>
                        <option value="growing">Growing</option>
                        <option value="ready">Ready</option>
                        <option value="harvested">Harvested</option>
                      </select>
                      <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#42493e]">expand_more</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <label className="text-sm font-bold text-[#164212] uppercase tracking-widest">Planting Date</label>
                    <div className="bg-white rounded-xl px-4 py-4 shadow-sm text-[#42493e] text-sm">
                      {new Date(field.planting_date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-3">
                  <label className="text-sm font-bold text-[#164212] uppercase tracking-widest">Observation Notes</label>
                  <textarea
                    value={notes}
                    onChange={e => setNotes(e.target.value)}
                    className="w-full bg-white border-none focus:ring-0 rounded-xl px-4 py-4 text-[#191c1a] shadow-sm resize-none"
                    placeholder="Describe soil moisture, pest activity, or leaf health..."
                    rows={4}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="bg-gradient-to-br from-[#164212] to-[#2e5a27] text-white font-[Manrope] font-bold px-10 py-4 rounded-xl shadow-lg hover:scale-[1.02] transition-transform active:scale-95 disabled:opacity-60 flex items-center gap-2"
                  >
                    {submitting && <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>}
                    Log Update
                  </button>
                </div>
              </form>
            </div>
          </section>

          {/* Right: Sidebar */}
          <aside className="lg:col-span-4 flex flex-col gap-6">
            {/* Field Info */}
            <div className="bg-white rounded-xl p-6 shadow-sm space-y-3">
              <h4 className="font-[Manrope] text-lg font-bold text-[#191c1a] mb-4">Field Info</h4>
              {[
                { label: 'Field ID', value: `#${field.id}` },
                { label: 'Crop', value: field.crop_type },
                { label: 'Stage', value: field.stage },
                { label: 'Status', value: field.status.replace('_', ' ') },
                { label: 'Agent', value: field.agent_name || 'Unassigned' },
                { label: 'Planted', value: new Date(field.planting_date).toLocaleDateString() },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between text-sm border-b border-[#f2f4f0] pb-2 last:border-0">
                  <span className="text-[#42493e] font-medium">{label}</span>
                  <span className="font-bold text-[#191c1a] capitalize">{value}</span>
                </div>
              ))}
            </div>

            {/* Update History */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-[Manrope] text-lg font-bold text-[#191c1a]">Update History</h4>
                <span className="material-symbols-outlined text-[#164212]">history</span>
              </div>
              {history.length === 0 ? (
                <p className="text-sm text-[#42493e] text-center py-4">No updates logged yet.</p>
              ) : (
                <div className="flex flex-col gap-6">
                  {history.map((u, i) => (
                    <div key={u.id} className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-[calc(100%+1.5rem)] before:bg-[#e1e3df] last:before:hidden">
                      <div className={`absolute left-[-6px] top-1.5 w-4 h-4 rounded-full border-4 border-white ${i === 0 ? 'bg-[#164212]' : 'bg-[#e7e9e5]'}`} />
                      <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-bold text-[#42493e] uppercase tracking-widest">{formatDate(u.created_at)}</span>
                        <h5 className={`font-[Manrope] font-bold text-sm ${i === 0 ? 'text-[#164212]' : 'text-[#191c1a]'}`}>
                          {u.agent_name} → <span className="capitalize">{u.stage}</span>
                        </h5>
                        {u.notes && <p className="text-xs text-[#42493e] leading-relaxed">{u.notes}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </aside>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
