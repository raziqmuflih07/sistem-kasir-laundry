import { Link } from 'react-router-dom'
import { WashingMachine, PlusCircle, Search, History } from 'lucide-react'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <WashingMachine size={24} /> 
        <span>Sistem Kasir Laundry</span>
      </div>
      <Link to="/" className="nav-link">
        Beranda
      </Link>
      <Link to="/add" className="nav-link">
        <PlusCircle size={18} /> Tambah Pesanan
      </Link>
      <Link to="/track" className="nav-link">
        <Search size={18} /> Cek Status
      </Link>
      <Link to="/history" className="nav-link">
        <History size={18} /> Riwayat
      </Link>
    </nav>
  )
}