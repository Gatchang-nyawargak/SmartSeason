import { Link } from 'react-router-dom'
import TopBar from '../components/TopBar'
import BottomNav from '../components/BottomNav'

const fields = [
  { id: '0842', name: 'Cedar Ridge North', crop: 'Soybeans', stage: 'Growing', status: 'at-risk', stageBg: 'bg-[#e2e5ca] text-[#636651]', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBzAjhBO09vM_rMsmPkEbFBw3CdBcCF9YgfhuOxytq591-m1yVShXtcFauKtUyckdVoI_xrCH4T9EUGLAgn0H4ygrkPRkUF6MpKpAOaRaN0vNvgsHgKcoPO02mN5buSkl5pzI7MLd49zdSXjLDDQAZG9BVs1Ikbzx7qLgxhyWGoHE8JFt5nuDOxT4bqen6yJzXdDaUtYIIW4X4OOk-7RvRsMbzs-6zlwgwR7C0Lskl406jDxEqmm3xjcG3il6raJKdCYHkCrrMkSHw' },
  { id: '1105', name: 'Lower Basin East', crop: 'Wheat', stage: 'Ready', status: 'optimal', stageBg: 'bg-[#cfe5ff] text-[#001d34]', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBllKbx5iPrm7x1Bfipj5JxPVwfGQi2rK1VfZv6h-KUYXuOideGeJCoQtSGHKtyq6wBAiXVr1qrskSdBU0URx0TW26kvoeC49DWudZVSAqBO4Cn-ocaVVYAk6YVvUHdn9Q9HZLCdOuwqHrMcv-huW8yPy_btdJeKDFv6r3VridKt5GR-mFwCYIiwTORQ8iA1ouRLmj_ezUSwTbdiRbCa6fxOABue__Jo6jPXTkKXYLmWm69rrjyxmsukXe9JjEKibdW3uzVCuC1juA' },
  { id: '0921', name: 'Twin Oaks South', crop: 'Corn', stage: 'Planted', status: 'active', stageBg: 'bg-[#bdf0ad] text-[#002201]', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAreBrTumPGNwFgAUgxHZDNq2pyoUynsxj40SxcxC8EdcLgUclRQb7q-Yscka-JGAuxNoa0bxQSu4z7W-sHVe2Gn6BVvyrEWRfdCYv44ukq5WPXGGqr-2a6bNAPauN_8qL6eYl6ZGuZ4G0rGv6Djl81iiG4vdYMR15lr9HAn6ZXrypI3BV388wsn-UqinZv7FNClhfTAC5WbMiUwhU1axjuNC_jf639Le8bWDxqa1Y_lIFtvzJsxw7a0aIHqpNX7aOgVMeNTDq9Pa4' },
  { id: '0744', name: 'Blackwood Flats', crop: 'Barley', stage: 'Harvested', status: 'completed', stageBg: 'bg-[#e1e3df] text-[#42493e]', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCOsuy2d8VSFhGel1yIeQlHzqxx4UyFnIV6McKAUy7BjZRABq2RJf1Xonu7t-sq25Z-2T7Ra__SbAltMnW7MN609xbnznaZwTl6QPayL74VHUQWTG_lOIegDLlHgbX3NJ-APyGjSh3JLe1R46ZaJC2q8RJRlH2sCTlCt1ylwMgNTwHcWSe2Bd7gjwF1GJtoSfxxS8ZucVzhWoeddkGmNDlUl7-Ydlzgij2sagMo6zYuWARXSLhwWQ9_KSW90P5pgoc6Nv7TjkXCO-k' },
  { id: '1233', name: 'Hilltop Orchard', crop: 'Apples', stage: 'Growing', status: 'at-risk', stageBg: 'bg-[#e2e5ca] text-[#636651]', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuALyF-FZ_HXvqbsNNSqEWNFPx41Od78OKN7Za5A6yikq3ZKQHD0vp2lOaTl7HicUIMwqe9R7LTXydsv2xAyf9-ABYWAeG_p8ECM-ieJkTW4r-BIiUyQY2VLF9IhQKt1hcOrqlJjEpYNE54lzyLuErxjhI5_1sh7rqLI92w6as1kjOav21yeh0XW2pJHBSX4NZXoGq3BRFfJ9es9SoRaHyMkNy1Ikv516wFVY2q5z1uSb8PMtHJsOsjewKYlRN-D8bP-r7M_TZXNzfo' },
  { id: '0452', name: 'Green Terrace', crop: 'Rice', stage: 'Growing', status: 'active', stageBg: 'bg-[#e2e5ca] text-[#636651]', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCfJpZsHxVYQndYnGgM7Lk-fuQsmymETGFLB4Mr6yhXSlz8gS929U62z-kDZamMZOPp82lC0WNXdYiDYJXz0-eFRjdAhmpNrKsNrhEi5y5LzvT719ao8oDvZgjCCVSJdL2yovVYUrJIkIKbpx7aEuBIEpV6v-ErfPfHihcHPRiLkvDSUgIBWO2vC1PAWfN4NBL3o1tQU_-s2wAio8F9_yMRXInx7fbfY4ypVVlcna8lwoWuzyK8Zuq2tWYe8lKtvAzruePzQua1a38' },
]

export default function AgentDashboard() {
  return (
    <div className="bg-[#f8faf6] min-h-screen pb-32">
      <TopBar />
      <main className="px-6 pt-24 max-w-7xl mx-auto">

        {/* Greeting */}
        <section className="mb-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-end">
          <div className="md:col-span-7">
            <h2 className="font-[Manrope] text-4xl font-extrabold tracking-tight text-[#164212] mb-2">Morning, Elias.</h2>
            <p className="text-[#42493e] text-lg max-w-md">You have 12 active fields across the North Sector. <span className="text-[#ba1a1a] font-semibold">3 require immediate attention</span> due to soil moisture drops.</p>
          </div>
          <div className="md:col-span-5">
            <div className="bg-[#f2f4f0] p-6 rounded-xl flex items-center justify-between shadow-sm">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#42493e] mb-1">Weekly Target</p>
                <p className="font-[Manrope] text-2xl font-bold">84% Optimal</p>
              </div>
              <div className="h-12 w-24 bg-[#2e5a27] rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-[#9ed090]">analytics</span>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-sm flex flex-col justify-between min-h-[160px]">
            <span className="material-symbols-outlined text-[#164212] text-3xl">potted_plant</span>
            <p className="text-4xl font-bold font-[Manrope] text-[#164212]">426 <span className="text-lg font-medium text-[#42493e]">Acres Managed</span></p>
          </div>
          <div className="bg-[#ffdad6] p-8 rounded-xl flex flex-col justify-between min-h-[160px]">
            <span className="material-symbols-outlined text-[#93000a] text-3xl">warning</span>
            <div>
              <p className="text-3xl font-bold font-[Manrope] text-[#93000a]">3 Fields</p>
              <p className="text-xs uppercase tracking-widest font-bold text-[#93000a]">At Risk</p>
            </div>
          </div>
          <div className="bg-[#164212] p-8 rounded-xl flex flex-col justify-between min-h-[160px] text-white">
            <span className="material-symbols-outlined text-[#bdf0ad] text-3xl">calendar_today</span>
            <div>
              <p className="text-3xl font-bold font-[Manrope]">8 Tasks</p>
              <p className="text-xs uppercase tracking-widest font-medium opacity-80">Pending Today</p>
            </div>
          </div>
        </section>

        {/* Fields Header */}
        <div className="flex justify-between items-baseline mb-8">
          <h3 className="font-[Manrope] text-2xl font-bold text-[#164212]">My Assigned Fields</h3>
          <button className="text-[#164212] font-semibold flex items-center gap-1 hover:underline text-sm uppercase tracking-wider">
            View Map <span className="material-symbols-outlined text-sm">map</span>
          </button>
        </div>

        {/* Field Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {fields.map(({ id, name, crop, stage, status, stageBg, img }) => (
            <div key={id} className="flex flex-col bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="h-48 relative">
                <img src={img} alt={name} className="w-full h-full object-cover" />
                {status === 'at-risk' && (
                  <div className="absolute top-4 right-4 bg-[#ba1a1a] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">priority_high</span> At Risk
                  </div>
                )}
                {status === 'optimal' && (
                  <div className="absolute top-4 right-4 bg-[#003c63] text-white px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">Optimal</div>
                )}
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-[#42493e] mb-1">Field #{id}</p>
                    <h4 className="font-[Manrope] text-xl font-bold text-[#191c1a]">{name}</h4>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-[#42493e]">Crop</p>
                    <p className="font-bold text-[#164212]">{crop}</p>
                  </div>
                </div>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-[#c2c9bb]/20">
                  <div>
                    <p className="text-[10px] uppercase font-bold text-[#42493e] tracking-tighter">Current Stage</p>
                    <span className={`inline-block mt-1 px-3 py-1 rounded-full ${stageBg} text-xs font-semibold uppercase`}>{stage}</span>
                  </div>
                  <Link to={`/fields/${id}`} className="h-10 w-10 rounded-full bg-[#e7e9e5] flex items-center justify-center hover:bg-[#164212] hover:text-white transition-colors">
                    <span className="material-symbols-outlined">arrow_forward</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <BottomNav />

      {/* FAB */}
      <Link to="/fields/new" className="fixed bottom-28 right-6 h-14 w-14 rounded-full bg-[#164212] text-white shadow-xl flex items-center justify-center active:scale-95 transition-all z-40">
        <span className="material-symbols-outlined text-2xl">add</span>
      </Link>
    </div>
  )
}
