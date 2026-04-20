import { Link } from 'react-router-dom'

export default function TopBar() {
  return (
    <header className="bg-[#f8faf6] flex justify-between items-center w-full px-6 py-4 fixed top-0 z-50">
      <div className="flex items-center gap-4">
        <button className="material-symbols-outlined text-[#164212] p-2 hover:bg-stone-200/50 transition-colors rounded-full active:scale-95 duration-150">menu</button>
        <Link to="/" className="font-[Manrope] font-black tracking-widest text-[#164212] uppercase text-xl">SmartSeason</Link>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#164212]/10 bg-[#e7e9e5]">
          <img alt="User profile" className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDp_SFJMMgwykCLl0xsMYVmzGZs5WvWyR4e0IsKqvJiIX1X0zTywXd6F1-H7YIf47Pa0njDMuyFWWOPqK24ZZmJ-lGX8abJsCRgEWXO1BnktQHweOZGvTk4Uc9lZIPNouEFWNq6FtsjXUiIIWANNq2Onf3d47THDTbIwtNNpA1ySTti8fmkYpc-_7GOgQ3ygKPF_8buzzt217fYpnOW3hH5U3GWMVVTl40ngbt52efR1f4hTHCWII5Y64k76aurMAhnJ-WCWfToEdY" />
        </div>
      </div>
    </header>
  )
}
