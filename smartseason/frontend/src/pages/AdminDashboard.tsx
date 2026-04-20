import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
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
  agent_name: string
  planting_date: string
}

interface Update {
  id: number
  agent_name: string
  field_id: number
  stage: string
  notes: string
  created_at: string
}

const stageBorderColor: Record<string, string> = {
  planted: 'border-[#bdf0ad]',
  growing: 'border-[#164212]',
  ready: 'border-[#003c63]',
  harvested: 'border-[#c2c9bb]',
}

function timeAgo(dateStr: string) {
  const diff = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000)
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const [fields, setFields] = useState<Field[]>([])
  const [updates, setUpdates] = useState<Update[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      try {
        const { data: fieldsData } = await api.get('/fields')
        setFields(fieldsData)
        // Fetch recent updates from all fields (first 5 fields)
        const updatePromises = fieldsData.slice(0, 5).map((f: Field) =>
          api.get(`/fields/${f.id}/updates`).then(r => r.data).catch(() => [])
        )
        const allUpdates = (await Promise.all(updatePromises)).flat()
        allUpdates.sort((a: Update, b: Update) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
        setUpdates(allUpdates.slice(0, 5))
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const active = fields.filter(f => f.status === 'active').length
  const atRisk = fields.filter(f => f.status === 'at_risk').length
  const completed = fields.filter(f => f.status === 'completed').length

  return (
    <div className="flex min-h-screen bg-[#f8faf6]">
      <SideNav />
      <main className="md:ml-72 flex-1 flex flex-col">
        <TopBar />
        <div className="pt-24 pb-32 md:pb-10 px-6 md:px-10 max-w-7xl mx-auto w-full space-y-8">

          {/* Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <section className="lg:col-span-8 bg-[#f2f4f0] rounded-xl p-10 flex flex-col justify-between relative overflow-hidden min-h-[260px]">
              <div className="relative z-10">
                <span className="text-xs font-bold text-[#164212] tracking-widest uppercase mb-2 block">Agricultural Inventory</span>
                <h2 className="text-5xl lg:text-6xl font-[Manrope] font-black text-[#191c1a] tracking-tighter">
                  {loading ? '—' : fields.length}
                </h2>
                <p className="text-[#42493e] max-w-xs mt-3 leading-relaxed">
                  Total fields managed. Welcome back, <span className="font-bold text-[#164212]">{user?.name}</span>.
                </p>
              </div>
              <div className="relative z-10 flex gap-4 mt-8">
                <Link to="/fields/new" className="bg-gradient-to-br from-[#164212] to-[#2e5a27] text-white px-6 py-3 rounded-xl font-bold text-sm tracking-widest uppercase shadow-lg hover:opacity-90 transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">add_location</span>Register Field
                </Link>
              </div>
              <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#164212]/5 rounded-full blur-3xl" />
            </section>

            {/* Gauge */}
            <div className="lg:col-span-4 bg-[#f2f4f0] rounded-xl p-8 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#42493e] mb-6">Field Status Overview</span>
              <div className="relative w-40 h-40 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="80" cy="80" fill="transparent" r="64" stroke="#e7e9e5" strokeWidth="12" />
                  <circle cx="80" cy="80" fill="transparent" r="64" stroke="#164212"
                    strokeDasharray={`${fields.length ? (active / fields.length) * 402 : 0} 402`}
                    strokeWidth="12" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-[Manrope] font-bold">{fields.length ? Math.round((active / fields.length) * 100) : 0}%</span>
                  <span className="text-xs text-[#42493e]">ACTIVE</span>
                </div>
              </div>
              <p className="text-sm text-[#42493e] mt-4">{active} active · {atRisk} at risk · {completed} done</p>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Active', count: active, icon: 'potted_plant', bg: 'bg-[#bdf0ad]', text: 'text-[#002201]', sub: 'Fields in growth phase' },
              { label: 'At Risk', count: atRisk, icon: 'warning', bg: 'bg-[#ffdad6]', text: 'text-[#93000a]', sub: 'Require attention' },
              { label: 'Completed', count: completed, icon: 'task_alt', bg: 'bg-[#cfe5ff]', text: 'text-[#001d34]', sub: 'Harvest cycles finished' },
            ].map(({ label, count, icon, bg, text, sub }) => (
              <div key={label} className="bg-white p-6 rounded-xl shadow-sm flex items-start gap-5 group hover:bg-[#164212] transition-all duration-300">
                <div className={`p-3 ${bg} rounded-full`}>
                  <span className={`material-symbols-outlined ${text}`}>{icon}</span>
                </div>
                <div>
                  <h3 className="text-[#42493e] text-xs uppercase tracking-widest font-bold group-hover:text-[#bdf0ad]">{label}</h3>
                  <p className="text-3xl font-[Manrope] font-bold text-[#191c1a] mt-1 group-hover:text-white">{loading ? '—' : count}</p>
                  <p className="text-xs text-[#42493e] mt-2 group-hover:text-[#bdf0ad]/80">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Fields Table + Updates */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* All Fields Table */}
            <div className="lg:col-span-8 bg-[#f2f4f0] rounded-xl p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-[Manrope] font-bold text-[#191c1a]">All Fields</h2>
                <Link to="/fields/new" className="text-[#164212] font-bold text-sm flex items-center gap-1 hover:underline">
                  + Add Field
                </Link>
              </div>
              {loading ? (
                <div className="flex justify-center py-12">
                  <span className="material-symbols-outlined text-[#164212] text-4xl animate-spin">progress_activity</span>
                </div>
              ) : fields.length === 0 ? (
                <div className="text-center py-12 text-[#42493e]">
                  <span className="material-symbols-outlined text-5xl block mb-2">landscape</span>
                  No fields registered yet.
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-[#c2c9bb]/30">
                        <th className="text-left py-3 px-2 text-xs font-bold text-[#42493e] uppercase tracking-wider">Field</th>
                        <th className="text-left py-3 px-2 text-xs font-bold text-[#42493e] uppercase tracking-wider">Crop</th>
                        <th className="text-left py-3 px-2 text-xs font-bold text-[#42493e] uppercase tracking-wider">Stage</th>
                        <th className="text-left py-3 px-2 text-xs font-bold text-[#42493e] uppercase tracking-wider">Status</th>
                        <th className="text-left py-3 px-2 text-xs font-bold text-[#42493e] uppercase tracking-wider">Agent</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#c2c9bb]/20">
                      {fields.map((f) => (
                        <tr key={f.id} className="hover:bg-white/60 transition-colors">
                          <td className="py-3 px-2 font-medium text-[#191c1a]">{f.name}</td>
                          <td className="py-3 px-2 text-[#42493e]">{f.crop_type}</td>
                          <td className="py-3 px-2">
                            <span className="capitalize px-2 py-1 rounded-full text-xs font-bold bg-[#e2e5ca] text-[#42493e]">{f.stage}</span>
                          </td>
                          <td className="py-3 px-2">
                            {f.status === 'at_risk' && <span className="px-2 py-1 rounded-full text-xs font-bold bg-[#ffdad6] text-[#93000a]">At Risk</span>}
                            {f.status === 'active' && <span className="px-2 py-1 rounded-full text-xs font-bold bg-[#bdf0ad] text-[#002201]">Active</span>}
                            {f.status === 'completed' && <span className="px-2 py-1 rounded-full text-xs font-bold bg-[#cfe5ff] text-[#001d34]">Completed</span>}
                          </td>
                          <td className="py-3 px-2 text-[#42493e]">{f.agent_name || '—'}</td>
                          <td className="py-3 px-2">
                            <Link to={`/fields/${f.id}`} className="text-[#164212] hover:underline font-bold text-xs">View →</Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

            {/* Recent Updates */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#f2f4f0] rounded-xl p-6">
                <h3 className="font-[Manrope] font-bold text-[#191c1a] mb-4">Recent Updates</h3>
                {updates.length === 0 ? (
                  <p className="text-sm text-[#42493e]">No updates yet.</p>
                ) : (
                  <div className="space-y-4">
                    {updates.map((u) => (
                      <div key={u.id} className={`bg-white p-4 rounded-xl border-l-4 ${stageBorderColor[u.stage] || 'border-[#c2c9bb]'}`}>
                        <div className="flex justify-between items-start mb-1">
                          <span className="font-bold text-sm text-[#191c1a]">{u.agent_name}</span>
                          <span className="text-[10px] text-[#42493e]/60 font-bold uppercase">{timeAgo(u.created_at)}</span>
                        </div>
                        <span className="text-[10px] font-bold bg-[#e2e5ca] text-[#42493e] px-2 py-0.5 rounded-full capitalize">{u.stage}</span>
                        {u.notes && <p className="text-xs text-[#42493e] mt-2 leading-relaxed">{u.notes}</p>}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Climate widget */}
              <div className="bg-gradient-to-br from-[#003c63] to-[#005488] text-white p-6 rounded-xl">
                <span className="material-symbols-outlined text-4xl">cloud_queue</span>
                <p className="text-3xl font-[Manrope] font-bold mt-2">24°C</p>
                <p className="text-sm opacity-80">Expect light rain at 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
