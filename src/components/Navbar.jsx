import { NavLink } from 'react-router-dom'
import { WashingMachine, Home, PlusCircle, Search, History } from 'lucide-react'

export default function Navbar({ activeCount = 0 }) {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <NavLink to="/" className="navbar-brand">
          <div className="navbar-brand-icon">
            <WashingMachine size={22} />
          </div>
          <div>
            <div className="navbar-brand-title">
              <span>Sistem Kasir Laundry</span>
              <span className="navbar-brand-badge">POS Pro</span>
            </div>
            <p className="navbar-brand-subtitle">
              Manajemen operasional & transaksi harian
            </p>
          </div>
        </NavLink>

        <nav className="nav-pills">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}
          >
            <Home size={16} />
            <span>Beranda</span>
            {activeCount > 0 && (
              <span className="nav-pill-badge">{activeCount}</span>
            )}
          </NavLink>

          <NavLink
            to="/add"
            className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}
          >
            <PlusCircle size={16} />
            <span>Tambah Pesanan</span>
          </NavLink>

          <NavLink
            to="/track"
            className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}
          >
            <Search size={16} />
            <span>Cek Status</span>
          </NavLink>

          <NavLink
            to="/history"
            className={({ isActive }) => `nav-pill ${isActive ? 'active' : ''}`}
          >
            <History size={16} />
            <span>Riwayat</span>
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
