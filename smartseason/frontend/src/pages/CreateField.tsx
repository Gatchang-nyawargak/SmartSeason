import { useEffect, useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import TopBar from '../components/TopBar'
import SideNav from '../components/SideNav'
import BottomNav from '../components/BottomNav'
import api from '../api'

interface Agent {
  id: number
  name: string
  email: string
}

export default function CreateField() {
  const navigate = useNavigate()
  const [agents, setAgents] = useState<Agent[]>([])
  const [agentLoad, setAgentLoad] = useState<Record<number, number>>({})
  const [form, setForm] = useState({ name: '', crop_type: '', planting_date: '', agent_id: '' })
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/users/agents').then(r => {
      setAgents(r.data)
      // Get field counts per agent
      api.get('/fields').then(fr => {
        const counts: Record<number, number> = {}
        fr.data.forEach((f: { agent_id: number }) => {
          if (f.agent_id) counts[f.agent_id] = (counts[f.agent_id] || 0) + 1
        })
        setAgentLoad(counts)
      })
    })
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await api.post('/fields', {
        name: form.name,
        crop_type: form.crop_type,
        planting_date: form.planting_date,
        agent_id: form.agent_id ? Number(form.agent_id) : null,
      })
      navigate('/admin')
    } catch (err: unknown) {
      const msg = (err as { response?: { data?: { error?: string } } })?.response?.data?.error
      setError(msg || 'Failed to create field')
    } finally {
      setSubmitting(false)
    }
  }

  const maxLoad = 6

  return (
    <div className="flex min-h-screen bg-[#f8faf6]">
      <SideNav />
      <main className="md:ml-72 flex-1">
        <TopBar />
        <div className="pt-24 pb-32 md:pb-10 px-4 md:px-8 max-w-6xl mx-auto">

          <section className="mb-12">
            <nav className="flex items-center gap-2 mb-4 text-[#42493e] font-medium text-sm">
              <Link to="/admin" className="hover:text-[#164212]">Dashboard</Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-[#164212] font-bold">New Field Registration</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#164212] tracking-tight mb-2">Create New Field</h1>
            <p className="text-[#42493e] max-w-2xl text-lg">Register a new field and assign it to a field agent for monitoring.</p>
          </section>

          {error && (
            <div className="mb-6 bg-[#ffdad6] text-[#93000a] px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-medium">
              <span className="material-symbols-outlined text-base">error</span>{error}
            </div>
          )}

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Form */}
            <div className="lg:col-span-8 bg-[#f2f4f0] rounded-xl p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-10">

                {/* Field Identity */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-[#164212]" style={{ fontVariationSettings: "'FILL' 1" }}>dataset</span>
                    <h2 className="text-xl font-bold tracking-tight uppercase text-[#164212]">Field Identity</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-bold text-[#42493e] tracking-wider uppercase mb-2">Field Name *</label>
                      <input
                        required
                        value={form.name}
                        onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                        className="w-full bg-white border-0 border-b-2 border-[#c2c9bb]/30 py-3 px-0 text-lg font-medium transition-all focus:border-[#164212]"
                        placeholder="e.g. Kiambu Plot A"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#42493e] tracking-wider uppercase mb-2">Crop Type *</label>
                      <input
                        required
                        value={form.crop_type}
                        onChange={e => setForm(p => ({ ...p, crop_type: e.target.value }))}
                        className="w-full bg-white border-0 border-b-2 border-[#c2c9bb]/30 py-3 px-0 text-lg font-medium transition-all focus:border-[#164212]"
                        placeholder="e.g. Maize, Wheat, Beans"
                      />
                    </div>
                  </div>
                </div>

                {/* Logistics */}
                <div className="space-y-6 pt-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-[#164212]" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
                    <h2 className="text-xl font-bold tracking-tight uppercase text-[#164212]">Logistics &amp; Assignment</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-bold text-[#42493e] tracking-wider uppercase mb-2">Planting Date *</label>
                      <input
                        required
                        type="date"
                        value={form.planting_date}
                        onChange={e => setForm(p => ({ ...p, planting_date: e.target.value }))}
                        className="w-full bg-white border-0 border-b-2 border-[#c2c9bb]/30 py-3 px-0 text-lg font-medium transition-all focus:border-[#164212]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#42493e] tracking-wider uppercase mb-2">Assigned Field Agent</label>
                      <select
                        value={form.agent_id}
                        onChange={e => setForm(p => ({ ...p, agent_id: e.target.value }))}
                        className="w-full bg-white border-0 border-b-2 border-[#c2c9bb]/30 py-3 px-0 text-lg font-medium transition-all focus:border-[#164212]"
                      >
                        <option value="">Select Agent (optional)</option>
                        {agents.map(a => (
                          <option key={a.id} value={a.id}>{a.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <p className="text-xs text-[#42493e] italic max-w-xs">
                    Field will start at <strong>Planted</strong> stage. The assigned agent can update it from their dashboard.
                  </p>
                  <div className="flex gap-4 w-full sm:w-auto">
                    <Link to="/admin" className="flex-1 sm:flex-none px-8 py-4 bg-[#e1e3df] text-[#42493e] font-bold rounded-xl transition-all hover:bg-[#c2c9bb]/20 text-center">
                      Cancel
                    </Link>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-1 sm:flex-none px-12 py-4 bg-gradient-to-br from-[#164212] to-[#2e5a27] text-white font-bold rounded-xl shadow-lg transition-all hover:opacity-90 active:scale-95 disabled:opacity-60 flex items-center justify-center gap-2"
                    >
                      {submitting && <span className="material-symbols-outlined animate-spin text-lg">progress_activity</span>}
                      Initialize Field
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Agronomy Tip */}
              <div className="bg-[#e2e5ca] rounded-xl p-6 relative overflow-hidden">
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-[#636651] mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                  <h3 className="text-[#636651] font-bold text-lg mb-2">Agronomy Tip</h3>
                  <p className="text-[#636651]/80 text-sm leading-relaxed">
                    Fields are marked <strong>At Risk</strong> automatically if they stay in the same stage for more than 90 days.
                  </p>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <span className="material-symbols-outlined text-[120px]">potted_plant</span>
                </div>
              </div>

              {/* Agent Load */}
              <div className="bg-[#f2f4f0] rounded-xl p-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#42493e] mb-4">Current Agent Load</h3>
                {agents.length === 0 ? (
                  <p className="text-sm text-[#42493e]">Loading agents...</p>
                ) : (
                  <div className="space-y-4">
                    {agents.map((a, i) => {
                      const count = agentLoad[a.id] || 0
                      const pct = Math.min((count / maxLoad) * 100, 100)
                      const color = pct > 80 ? 'bg-[#ba1a1a]' : i % 2 === 0 ? 'bg-[#164212]' : 'bg-[#5d604b]'
                      return (
                        <div key={a.id}>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">{a.name}</span>
                            <span className={`text-[10px] ${color} text-white px-2 py-0.5 rounded font-bold`}>{count} FIELDS</span>
                          </div>
                          <div className="w-full bg-[#e1e3df] h-1 rounded-full overflow-hidden mt-2">
                            <div className={`${color} h-full transition-all`} style={{ width: `${pct}%` }} />
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
