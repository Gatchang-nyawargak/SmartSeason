import { Link } from 'react-router-dom'
import TopBar from '../components/TopBar'
import SideNav from '../components/SideNav'
import BottomNav from '../components/BottomNav'

const updates = [
  { name: 'Marcus Thorne', sector: 'NORTH SECTOR B', time: '14 MIN AGO', note: 'Irrigation valve #42 repaired. Soil moisture levels expected to normalize within 6 hours.', border: 'border-[#164212]', badge: 'bg-[#bdf0ad] text-[#002201]', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAqm28pY9249NrPIuepGJl5prxdjUOsmj-GolfJU_L1FmyaUxDx5BT85IAAp_sJyVBvyg2cWySljMjXGgAHP_JXQeTciVImD2vuOUezyzKXNr-Lxtqstm0Dv4OkU-fo7PRvMNiPEPoRfZpfEWVrq8zcG2zC5ec0RsFs4iMvNcAIfprVGZBGWNf64hLyyjUeCxjh2Jn7fBU5AV4hm9Pr3Wm66y1m-nwYdmPTH2Zw9XvJjtDVDhqXuLbNp3CzhZ0ZR4yHAFG9D-9K0fs' },
  { name: 'Elena Rodriguez', sector: 'VINEYARD DISTRICT', time: '2 HOURS AGO', note: 'Routine pruning completed on Block 7. No signs of mildew observed after recent rainfall.', border: 'border-[#5d604b]', badge: 'bg-[#e2e5ca] text-[#1a1d0d]', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDyntDuCyAz2cmhTlEJwRntpZ_idV5LczlIbESug5aGi7mHFy481jB6Qym81_siudzOotNgvLUo2qpZRxy6qAiUilYNvA0wppI37j3bHtnuQaUDO57EgJh4-TPsUSPUB9_5NI8tRS3AkiR_RKu4UhPVu261H8RmPpdVGBn2eWshhTlhpVUyh8jsN26VfRuk8pSoKWrhm09qKBxWb3cPVD6Zmy8Vv0OD-MssPb9eatLCPLdnPdZyJqc5b0S5C1MvZK3rsgI6_RD-Vls' },
  { name: 'James Wilson', sector: 'SOUTH SECTOR A', time: '5 HOURS AGO', note: 'Alert: Localized pest activity detected in Wheat Patch 4. Recommend immediate targeted application.', border: 'border-[#ba1a1a]', badge: 'bg-[#ffdad6] text-[#93000a]', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDtV-xM42blBOTRlDC3uqfZriGefcE1UqdRmYONIwOk_iCE0-zF20xliuvcbiMsEq_thqWrJBmvBSKBr23jE7eUSTQHjyY1-67cPyHd0GSH3tbReHXwm_oe1m5RYBNmIUJAmGfUDYNcE4r5mCkr5baOGU31II7Yt2sapcEKlQ_AixksukeSW6Wq63WzrcF890e4bfH2DExMxzFQNQQHgqg9ltx4Ea1VKyU5xM7mFmdRFEgR5UMTeJLi8vHVKJ-herz2K1OnXRX7MnQ' },
]

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-[#f8faf6]">
      <SideNav />
      <main className="md:ml-72 flex-1 flex flex-col">
        <TopBar />
        <div className="pt-24 pb-32 md:pb-10 px-6 md:px-10 max-w-7xl mx-auto w-full space-y-8">

          {/* Hero */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <section className="lg:col-span-8 bg-[#f2f4f0] rounded-xl p-10 flex flex-col justify-between relative overflow-hidden min-h-[280px]">
              <div className="relative z-10">
                <span className="text-xs font-bold text-[#164212] tracking-widest uppercase mb-2 block">Agricultural Inventory</span>
                <h2 className="text-5xl lg:text-6xl font-[Manrope] font-black text-[#191c1a] tracking-tighter">1,248</h2>
                <p className="text-[#42493e] max-w-xs mt-3 leading-relaxed">Total active acreage managed across all regional sectors.</p>
              </div>
              <div className="relative z-10 flex gap-4 mt-8">
                <Link to="/fields/new" className="bg-gradient-to-br from-[#164212] to-[#2e5a27] text-white px-6 py-3 rounded-xl font-bold text-sm tracking-widest uppercase shadow-lg hover:opacity-90 transition-all flex items-center gap-2">
                  <span className="material-symbols-outlined text-[20px]">add_location</span>Register Field
                </Link>
                <button className="bg-[#e1e3df] text-[#42493e] px-6 py-3 rounded-xl font-bold text-sm tracking-widest uppercase hover:bg-[#e7e9e5] transition-all">View Map</button>
              </div>
              <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-[#164212]/5 rounded-full blur-3xl" />
            </section>

            {/* Hydration Gauge */}
            <div className="lg:col-span-4 bg-[#f2f4f0] rounded-xl p-8 flex flex-col items-center justify-center text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-[#42493e] mb-6">Regional Hydration Average</span>
              <div className="relative w-48 h-48 flex items-center justify-center">
                <svg className="w-full h-full -rotate-90">
                  <circle cx="96" cy="96" fill="transparent" r="80" stroke="#e7e9e5" strokeWidth="12" />
                  <circle cx="96" cy="96" fill="transparent" r="80" stroke="#164212" strokeDasharray="502" strokeDashoffset="150" strokeWidth="12" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-4xl font-[Manrope] font-bold">72%</span>
                  <span className="text-xs text-[#42493e]">OPTIMAL</span>
                </div>
              </div>
              <p className="text-sm text-[#42493e] mt-4">Soil moisture stable across 85% of active sectors.</p>
            </div>
          </div>

          {/* Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { label: 'Active', count: 842, icon: 'potted_plant', bg: 'bg-[#bdf0ad]', text: 'text-[#002201]', sub: 'Fields in growth phase' },
              { label: 'At Risk', count: 56, icon: 'warning', bg: 'bg-[#e2e5ca]', text: 'text-[#1a1d0d]', sub: 'Pest alerts detected' },
              { label: 'Completed', count: 350, icon: 'task_alt', bg: 'bg-[#cfe5ff]', text: 'text-[#001d34]', sub: 'Harvest cycles finished' },
            ].map(({ label, count, icon, bg, text, sub }) => (
              <div key={label} className="bg-white p-6 rounded-xl shadow-sm flex items-start gap-5 group hover:bg-[#164212] transition-all duration-300">
                <div className={`p-3 ${bg} rounded-full`}>
                  <span className={`material-symbols-outlined ${text}`}>{icon}</span>
                </div>
                <div>
                  <h3 className="text-[#42493e] text-xs uppercase tracking-widest font-bold group-hover:text-[#bdf0ad]">{label}</h3>
                  <p className="text-3xl font-[Manrope] font-bold text-[#191c1a] mt-1 group-hover:text-white">{count}</p>
                  <p className="text-xs text-[#42493e] mt-2 group-hover:text-[#bdf0ad]/80">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Updates + Map */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-[#f2f4f0] rounded-xl p-8 flex flex-col">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-2xl font-[Manrope] font-bold text-[#191c1a]">Field Agent Updates</h2>
                  <p className="text-[#42493e] text-sm mt-1">Live reports from the north and south sectors</p>
                </div>
                <button className="text-[#164212] font-bold text-sm flex items-center gap-1 hover:underline">
                  History <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
              <div className="space-y-4">
                {updates.map(({ name, sector, time, note, border, badge, img }) => (
                  <div key={name} className={`bg-white p-5 rounded-xl flex gap-5 border-l-4 ${border}`}>
                    <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                      <img src={img} alt={name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <h4 className="font-bold text-[#191c1a]">{name}</h4>
                        <span className="text-[10px] uppercase font-bold text-[#42493e]/60">{time}</span>
                      </div>
                      <span className={`${badge} text-[10px] font-bold px-2 py-0.5 rounded-full`}>{sector}</span>
                      <p className="text-sm text-[#42493e] mt-3 leading-relaxed">{note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 space-y-6">
              {/* Resource Efficiency */}
              <div className="bg-[#f2f4f0] p-6 rounded-xl">
                <h3 className="font-[Manrope] font-bold text-[#191c1a] mb-4">Resource Efficiency</h3>
                <div className="space-y-4">
                  {[{ label: 'Water Usage', pct: 92, color: 'bg-[#164212]' }, { label: 'Fertilizer Opt.', pct: 68, color: 'bg-[#2e5a27]' }].map(({ label, pct, color }) => (
                    <div key={label}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-[#42493e] uppercase font-bold">{label}</span>
                        <span className="text-[#164212] font-bold">{pct}%</span>
                      </div>
                      <div className="h-2 w-full bg-[#e1e3df] rounded-full overflow-hidden">
                        <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Climate */}
              <div className="bg-gradient-to-br from-[#003c63] to-[#005488] text-white p-6 rounded-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="material-symbols-outlined text-4xl">cloud_queue</span>
                    <p className="text-3xl font-[Manrope] font-bold mt-2">24°C</p>
                    <p className="text-sm opacity-80">Expect light rain at 4:00 PM</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold uppercase tracking-widest opacity-60">Climate Alert</span>
                    <p className="text-xs mt-1">High Humidity</p>
                  </div>
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
