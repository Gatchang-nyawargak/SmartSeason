import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import TopBar from '../components/TopBar'
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
}

const stageStyle: Record<string, string> = {
  planted: 'bg-[#bdf0ad] text-[#002201]',
  growing: 'bg-[#e2e5ca] text-[#636651]',
  ready: 'bg-[#cfe5ff] text-[#001d34]',
  harvested: 'bg-[#e1e3df] text-[#42493e]',
}

const fieldImages = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBzAjhBO09vM_rMsmPkEbFBw3CdBcCF9YgfhuOxytq591-m1yVShXtcFauKtUyckdVoI_xrCH4T9EUGLAgn0H4ygrkPRkUF6MpKpAOaRaN0vNvgsHgKcoPO02mN5buSkl5pzI7MLd49zdSXjLDDQAZG9BVs1Ikbzx7qLgxhyWGoHE8JFt5nuDOxT4bqen6yJzXdDaUtYIIW4X4OOk-7RvRsMbzs-6zlwgwR7C0Lskl406jDxEqmm3xjcG3il6raJKdCYHkCrrMkSHw',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBllKbx5iPrm7x1Bfipj5JxPVwfGQi2rK1VfZv6h-KUYXuOideGeJCoQtSGHKtyq6wBAiXVr1qrskSdBU0URx0TW26kvoeC49DWudZVSAqBO4Cn-ocaVVYAk6YVvUHdn9Q9HZLCdOuwqHrMcv-huW8yPy_btdJeKDFv6r3VridKt5GR-mFwCYIiwTORQ8iA1ouRLmj_ezUSwTbdiRbCa6fxOABue__Jo6jPXTkKXYLmWm69rrjyxmsukXe9JjEKibdW3uzVCuC1juA',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuAreBrTumPGNwFgAUgxHZDNq2pyoUynsxj40SxcxC8EdcLgUclRQb7q-Yscka-JGAuxNoa0bxQSu4z7W-sHVe2Gn6BVvyrEWRfdCYv44ukq5WPXGGqr-2a6bNAPauN_8qL6eYl6ZGuZ4G0rGv6Djl81iiG4vdYMR15lr9HAn6ZXrypI3BV388wsn-UqinZv7FNClhfTAC5WbMiUwhU1axjuNC_jf639Le8bWDxqa1Y_lIFtvzJsxw7a0aIHqpNX7aOgVMeNTDq9Pa4',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCOsuy2d8VSFhGel1yIeQlHzqxx4UyFnIV6McKAUy7BjZRABq2RJf1Xonu7t-sq25Z-2T7Ra__SbAltMnW7MN609xbnznaZwTl6QPayL74VHUQWTG_lOIegDLlHgbX3NJ-APyGjSh3JLe1R46ZaJC2q8RJRlH2sCTlCt1ylwMgNTwHcWSe2Bd7gjwF1GJtoSfxxS8ZucVzhWoeddkGmNDlUl7-Ydlzgij2sagMo6zYuWARXSLhwWQ9_KSW90P5pgoc6Nv7TjkXCO-k',
]

export default function AgentDashboard() {
  const { user } = useAuth()
  const [fields, setFields] = useState<Field[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/fields')
      .then(r => setFields(r.data))
      .finally(() => setLoading(false))
  }, [])

  const atRisk = fields.filter(f => f.status === 'at_risk').length

  return (
    <div className="bg-[#f8faf6] min-h-screen pb-32">
      <TopBar />
      <main className="px-6 pt-24 max-w-7xl mx-auto">

        {/* Greeting */}
        <section className="mb-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <h2 className="font-[Manrope] text-4xl font-extrabold tracking-tight text-[#164212] mb-2">
              Welcome, {user?.name?.split(' ')[0]}.
            </h2>
            <p className="text-[#42493e] text-lg max-w-md">
              You have <span className="font-bold text-[#164212]">{fields.length}</span> assigned fields.
              {atRisk > 0 && (
                <> <span className="text-[#ba1a1a] font-semibold">{atRisk} require immediate attention</span> due to risk conditions.</>
              )}
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="bg-[#f2f4f0] p-6 rounded-xl flex items-center justify-between shadow-sm">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#42493e] mb-1">My Fields</p>
                <p className="font-[Manrope] text-2xl font-bold">{loading ? '—' : fields.length} Total</p>
              </div>
              <div className="h-12 w-12 bg-[#2e5a27] rounded-xl flex items-center justify-center">
                <span className="material-symbols-outlined text-[#9ed090]">potted_plant</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-sm flex flex-col justify-between min-h-[140px]">
            <span className="material-symbols-outlined text-[#164212] text-3xl">potted_plant</span>
            <p className="text-4xl font-bold font-[Manrope] text-[#164212]">
              {loading ? '—' : fields.length}
              <span className="text-lg font-medium text-[#42493e] ml-2">Fields Assigned</span>
            </p>
          </div>
          <div className="bg-[#ffdad6] p-8 rounded-xl flex flex-col justify-between min-h-[140px]">
            <span className="material-symbols-outlined text-[#93000a] text-3xl">warning</span>
            <div>
              <p className="text-3xl font-bold font-[Manrope] text-[#93000a]">{loading ? '—' : atRisk}</p>
              <p className="text-xs uppercase tracking-widest font-bold text-[#93000a]">At Risk</p>
            </div>
          </div>
          <div className="bg-[#164212] p-8 rounded-xl flex flex-col justify-between min-h-[140px] text-white">
            <span className="material-symbols-outlined text-[#bdf0ad] text-3xl">eco</span>
            <div>
              <p className="text-3xl font-bold font-[Manrope]">{loading ? '—' : fields.filter(f => f.stage === 'growing').length}</p>
              <p className="text-xs uppercase tracking-widest font-medium opacity-80">Growing</p>
            </div>
          </div>
        </section>

        {/* Fields Header */}
        <div className="flex justify-between items-baseline mb-8">
          <h3 className="font-[Manrope] text-2xl font-bold text-[#164212]">My Assigned Fields</h3>
        </div>

        {/* Field Cards */}
        {loading ? (
          <div className="flex justify-center py-20">
            <span className="material-symbols-outlined text-[#164212] text-5xl animate-spin">progress_activity</span>
          </div>
        ) : fields.length === 0 ? (
          <div className="text-center py-20 text-[#42493e]">
            <span className="material-symbols-outlined text-6xl block mb-3">landscape</span>
            <p className="text-lg font-medium">No fields assigned to you yet.</p>
            <p className="text-sm mt-1">Contact your coordinator to get fields assigned.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {fields.map((f, i) => (
              <div key={f.id} className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="h-48 relative">
                  <img src={fieldImages[i % fieldImages.length]} alt={f.name} className="w-full h-full object-cover" />
                  {f.status === 'at_risk' && (
                    <div className="absolute top-4 right-4 bg-[#ba1a1a] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">priority_high</span> At Risk
                    </div>
                  )}
                  {f.status === 'completed' && (
                    <div className="absolute top-4 right-4 bg-[#003c63] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Completed</div>
                  )}
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-widest text-[#42493e] mb-1">Field #{f.id}</p>
                      <h4 className="font-[Manrope] text-xl font-bold text-[#191c1a]">{f.name}</h4>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-medium text-[#42493e]">Crop</p>
                      <p className="font-bold text-[#164212]">{f.crop_type}</p>
                    </div>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#c2c9bb]/20">
                    <div>
                      <p className="text-[10px] uppercase font-bold text-[#42493e] tracking-tighter">Current Stage</p>
                      <span className={`inline-block mt-1 px-3 py-1 rounded-full ${stageStyle[f.stage] || 'bg-[#e2e5ca] text-[#42493e]'} text-xs font-semibold uppercase`}>
                        {f.stage}
                      </span>
                    </div>
                    <Link to={`/fields/${f.id}`} className="h-10 w-10 rounded-full bg-[#e7e9e5] flex items-center justify-center hover:bg-[#164212] hover:text-white transition-colors">
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <BottomNav />
    </div>
  )
}
