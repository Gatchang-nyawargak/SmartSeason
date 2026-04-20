import { Link } from 'react-router-dom'
import TopBar from '../components/TopBar'
import SideNav from '../components/SideNav'
import BottomNav from '../components/BottomNav'

const history = [
  { date: 'Oct 24, 2023 • 09:15 AM', stage: 'Growing', note: 'Plants showing strong vertical growth. Soil moisture levels are steady after light rain.', active: true },
  { date: 'Oct 18, 2023 • 02:30 PM', stage: 'Emergence', note: 'Even emergence across the sector. Initial nutrient application completed.', active: false },
  { date: 'Oct 10, 2023 • 08:00 AM', stage: 'Planting', note: 'Corn seed variety hybrid-742 planted at 32,000 seeds/acre.', active: false },
]

export default function FieldDetails() {
  return (
    <div className="flex min-h-screen bg-[#f8faf6]">
      <SideNav />
      <main className="md:ml-72 flex-1 pt-24 pb-32 md:pb-10 px-6 md:px-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        <TopBar />

        {/* Field Hero + Update Form */}
        <section className="lg:col-span-8 flex flex-col gap-6 mt-0">
          {/* Hero Card */}
          <div className="bg-white rounded-xl p-8 shadow-sm overflow-hidden relative">
            <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
              <img alt="Corn pattern" className="w-full h-full object-cover"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB43rvLM8yIO2E2rKSKxVcHSfMNEb15Pqytwyjy-0WvVK1UDxcciMRwW-iFfEn9LkzjWei0jTaMzchbSZGJaTxy9Iq-aU-CPwWayhMqsGLtNtGDLgbzgw_UZJjO1zBRIDbdE3496b6jbVcVw8GMFQvY8AZxqTgTLAOcqEFdrajD5bFfSSiDu4tQVstUYvAmfORF7JPbJyiDMsD5ngSto-1IN2LYlbWFwdwXzKQU1vCqpsDM0zouz1XryHnjKbHWJk6byTMENtYKjxA" />
            </div>
            <div className="relative z-10">
              <nav className="flex items-center gap-2 text-[#42493e] text-sm mb-4 uppercase tracking-wider">
                <Link to="/fields" className="hover:text-[#164212]">Fields</Link>
                <span className="material-symbols-outlined text-sm">chevron_right</span>
                <span className="text-[#164212] font-bold">North Sector Corn</span>
              </nav>
              <h2 className="font-[Manrope] text-5xl font-extrabold text-[#164212] tracking-tight mb-4">North Sector Corn</h2>
              <div className="flex flex-wrap gap-4 items-center">
                <div className="flex items-center gap-2 bg-[#e2e5ca] text-[#636651] px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide">
                  <span className="material-symbols-outlined text-lg">agriculture</span>Corn
                </div>
                <div className="flex items-center gap-2 bg-[#bdf0ad] text-[#002201] px-4 py-1.5 rounded-full text-sm font-semibold uppercase tracking-wide">
                  <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>eco</span>Growing
                </div>
              </div>
            </div>
          </div>

          {/* Update Form */}
          <div className="bg-[#f2f4f0] rounded-xl p-8 flex flex-col gap-8">
            <h3 className="font-[Manrope] text-2xl font-bold text-[#191c1a]">Update Field Status</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold text-[#164212] uppercase tracking-widest">Growth Stage</label>
                <div className="relative">
                  <select className="w-full bg-white border-none focus:ring-0 rounded-xl px-4 py-4 text-[#191c1a] appearance-none shadow-sm">
                    <option>Planting</option>
                    <option>Emergence</option>
                    <option selected>Growing</option>
                    <option>Flowering</option>
                    <option>Dough Stage</option>
                    <option>Harvesting</option>
                  </select>
                  <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#42493e]">expand_more</span>
                </div>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-bold text-[#164212] uppercase tracking-widest">Update Intensity</label>
                <div className="flex items-center gap-4 h-full">
                  <div className="flex-1 h-2 bg-[#e1e3df] rounded-full overflow-hidden">
                    <div className="w-2/3 h-full bg-gradient-to-r from-[#164212] to-[#2e5a27]" />
                  </div>
                  <span className="font-[Manrope] font-bold text-[#164212]">68%</span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <label className="text-sm font-bold text-[#164212] uppercase tracking-widest">Observation Notes</label>
              <textarea className="w-full bg-white border-none focus:ring-0 rounded-xl px-4 py-4 text-[#191c1a] shadow-sm resize-none" placeholder="Describe soil moisture, pest activity, or leaf health..." rows={4} />
            </div>
            <div className="flex justify-end">
              <button className="bg-gradient-to-br from-[#164212] to-[#2e5a27] text-white font-[Manrope] font-bold px-10 py-4 rounded-xl shadow-lg hover:scale-[1.02] transition-transform active:scale-95">
                Log Update
              </button>
            </div>
          </div>
        </section>

        {/* Sidebar */}
        <aside className="lg:col-span-4 flex flex-col gap-8">
          {/* Soil Gauge */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h4 className="font-[Manrope] text-lg font-bold mb-6 text-[#191c1a]">Soil Metric</h4>
            <div className="relative flex flex-col items-center">
              <div className="w-48 h-24 overflow-hidden relative">
                <div className="w-48 h-48 rounded-full border-[16px] border-[#e7e9e5]" />
                <div className="absolute top-0 left-0 w-48 h-48 rounded-full border-[16px] border-[#164212] border-b-transparent border-l-transparent rotate-45" />
              </div>
              <div className="text-center mt-[-10px]">
                <span className="block font-[Manrope] text-4xl font-black text-[#164212]">74%</span>
                <span className="text-xs font-bold text-[#42493e] uppercase tracking-tighter">Optimal Moisture</span>
              </div>
            </div>
          </div>

          {/* Update History */}
          <div className="bg-white rounded-xl p-8 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h4 className="font-[Manrope] text-xl font-bold text-[#191c1a]">Update History</h4>
              <span className="material-symbols-outlined text-[#164212]">history</span>
            </div>
            <div className="flex flex-col gap-8">
              {history.map(({ date, stage, note, active }, i) => (
                <div key={i} className="relative pl-8 before:content-[''] before:absolute before:left-0 before:top-2 before:w-1 before:h-[calc(100%+2rem)] before:bg-[#e1e3df] last:before:hidden">
                  <div className={`absolute left-[-6px] top-1.5 w-4 h-4 rounded-full border-4 border-white ${active ? 'bg-[#164212]' : 'bg-[#e7e9e5]'}`} />
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] font-bold text-[#42493e] uppercase tracking-widest">{date}</span>
                    <h5 className={`font-[Manrope] font-bold ${active ? 'text-[#164212]' : 'text-[#191c1a]'}`}>Stage: {stage}</h5>
                    <p className="text-sm text-[#42493e] leading-relaxed">{note}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </main>
      <BottomNav />
    </div>
  )
}
