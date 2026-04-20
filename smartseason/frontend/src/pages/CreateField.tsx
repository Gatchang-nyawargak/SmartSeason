import { Link } from 'react-router-dom'
import TopBar from '../components/TopBar'
import SideNav from '../components/SideNav'
import BottomNav from '../components/BottomNav'

export default function CreateField() {
  return (
    <div className="flex min-h-screen bg-[#f8faf6]">
      <SideNav />
      <main className="md:ml-72 flex-1">
        <TopBar />
        <div className="pt-24 pb-32 md:pb-10 px-4 md:px-8 max-w-6xl mx-auto">

          {/* Hero */}
          <section className="mb-12">
            <nav className="flex items-center gap-2 mb-4 text-[#42493e] font-medium text-sm">
              <Link to="/fields" className="hover:text-[#164212]">Fields</Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-[#164212] font-bold">New Field Registration</span>
            </nav>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#164212] tracking-tight mb-2">Create New Field</h1>
            <p className="text-[#42493e] max-w-2xl text-lg">Define a new sector in the North Sector ecosystem. Ensure all seasonal data is accurate for predictive modeling.</p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-8 bg-[#f2f4f0] rounded-xl p-8 shadow-sm">
              <form className="space-y-10">

                {/* Field Identity */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="material-symbols-outlined text-[#164212]" style={{ fontVariationSettings: "'FILL' 1" }}>dataset</span>
                    <h2 className="text-xl font-bold tracking-tight uppercase text-[#164212]">Field Identity</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <label className="block text-xs font-bold text-[#42493e] tracking-wider uppercase mb-2">Field Name</label>
                      <input className="w-full bg-white border-0 border-b-2 border-[#c2c9bb]/30 py-3 px-0 text-lg font-medium transition-all focus:border-[#164212]" placeholder="e.g. Riverbend North 04" type="text" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#42493e] tracking-wider uppercase mb-2">Crop Type</label>
                      <select className="w-full bg-white border-0 border-b-2 border-[#c2c9bb]/30 py-3 px-0 text-lg font-medium transition-all focus:border-[#164212]">
                        <option value="" disabled selected>Select Variety</option>
                        <option>Wheat (Hard Red Winter)</option>
                        <option>Corn (Yellow Dent)</option>
                        <option>Soybeans (Enlist E3)</option>
                        <option>Barley (Two-Row)</option>
                        <option>Sunflowers</option>
                      </select>
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
                      <label className="block text-xs font-bold text-[#42493e] tracking-wider uppercase mb-2">Target Planting Date</label>
                      <input className="w-full bg-white border-0 border-b-2 border-[#c2c9bb]/30 py-3 px-0 text-lg font-medium transition-all focus:border-[#164212]" type="date" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-[#42493e] tracking-wider uppercase mb-2">Assigned Field Agent</label>
                      <select className="w-full bg-white border-0 border-b-2 border-[#c2c9bb]/30 py-3 px-0 text-lg font-medium transition-all focus:border-[#164212]">
                        <option value="" disabled selected>Select Lead Agent</option>
                        <option>Marcus Thorne - Senior Agronomist</option>
                        <option>Elena Rodriguez - Field Specialist</option>
                        <option>Sarah Chen - Soil Analyst</option>
                        <option>Jameson Vane - Operations Lead</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
                  <p className="text-xs text-[#42493e] italic max-w-xs">By initializing this field, SmartSeason will automatically begin satellite moisture tracking and local climate calibration.</p>
                  <div className="flex gap-4 w-full sm:w-auto">
                    <Link to="/fields" className="flex-1 sm:flex-none px-8 py-4 bg-[#e1e3df] text-[#42493e] font-bold rounded-xl transition-all hover:bg-[#c2c9bb]/20 text-center">Cancel</Link>
                    <button className="flex-1 sm:flex-none px-12 py-4 bg-gradient-to-br from-[#164212] to-[#2e5a27] text-white font-bold rounded-xl shadow-lg transition-all hover:opacity-90 active:scale-95" type="submit">Initialize Field</button>
                  </div>
                </div>
              </form>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              {/* Map Preview */}
              <div className="bg-[#f2f4f0] rounded-xl overflow-hidden shadow-sm">
                <div className="h-48 relative overflow-hidden">
                  <img alt="Field Map View" className="w-full h-full object-cover grayscale-[0.3]"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAviOZ2PTU3VVhEVPcTF-4jlaTLfEWdJlmTPsF57GYjA8NjJt_f8IBe0Gal8umEhBd_yWmJggPWa_ck2fZaFC3ksA_FWLIbXmAfiZLTs7rFWtVXo3os9hEZBkoyTXvVQvEJnjHNHixfkBtokio32atNHXIcn06S-VdRP8EMOYTGLktkPvqKXlYTjRYmM1f1FhJ7gafxvZXrL38rkp94jj9z_XzOCDAwOVGui1auAO0R_OSHG6DQGOdgbU8QujY7UGztIUWN6J-XGOI" />
                  <div className="absolute inset-0 bg-[#164212]/20 mix-blend-overlay" />
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase text-[#164212]">GPS READY</div>
                </div>
                <div className="p-6">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-[#42493e] mb-2">Location Context</h3>
                  <p className="text-sm text-[#191c1a] leading-relaxed">System will auto-map boundaries based on the nearest sensor nodes (SN-402, SN-409).</p>
                </div>
              </div>

              {/* Agronomy Tip */}
              <div className="bg-[#e2e5ca] rounded-xl p-6 relative overflow-hidden">
                <div className="relative z-10">
                  <span className="material-symbols-outlined text-[#636651] mb-4 block" style={{ fontVariationSettings: "'FILL' 1" }}>lightbulb</span>
                  <h3 className="text-[#636651] font-bold text-lg mb-2">Agronomy Tip</h3>
                  <p className="text-[#636651]/80 text-sm leading-relaxed">Planting <strong>Wheat</strong> in this sector before the first frost provides a 12% yield increase based on 5-year soil trends.</p>
                </div>
                <div className="absolute -right-4 -bottom-4 opacity-10">
                  <span className="material-symbols-outlined text-[120px]">potted_plant</span>
                </div>
              </div>

              {/* Agent Load */}
              <div className="bg-[#f2f4f0] rounded-xl p-6">
                <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#42493e] mb-4">Current Agent Load</h3>
                <div className="space-y-4">
                  {[{ name: 'Marcus Thorne', fields: 4, pct: '4/5', w: 'w-4/5', bg: 'bg-[#164212]', badge: 'bg-[#164212]' }, { name: 'Elena Rodriguez', fields: 2, pct: '2/5', w: 'w-2/5', bg: 'bg-[#5d604b]', badge: 'bg-[#5d604b]' }].map(({ name, fields, w, bg, badge }) => (
                    <div key={name}>
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{name}</span>
                        <span className={`text-[10px] ${badge} text-white px-2 py-0.5 rounded font-bold`}>{fields} FIELDS</span>
                      </div>
                      <div className="w-full bg-[#e1e3df] h-1 rounded-full overflow-hidden mt-2">
                        <div className={`${bg} h-full ${w}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <BottomNav />
    </div>
  )
}
