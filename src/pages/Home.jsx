import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import OrderCard from '../components/OrderCard'
import { formatRupiah } from '../utils/formatters'
import {
  WashingMachine,
  Shirt,
  Wallet,
  Clock,
  PackageCheck,
  CheckCircle2,
  Search,
  PlusCircle
} from 'lucide-react'

export default function Home({
  orders = [],
  onUpdateStatus,
  onUpdatePayment,
  onDeleteOrder
}) {
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('SEMUA')

  // KPI Calculations
  const stats = useMemo(() => {
    const list = Array.isArray(orders) ? orders : []
    const activeOrders = list.filter(
      (o) =>
        o &&
        !o.isArchived &&
        (o.processStatus || o.status) !== 'Selesai'
    )
    const readyOrders = list.filter(
      (o) =>
        o &&
        !o.isArchived &&
        (o.processStatus || o.status) === 'Siap Diambil'
    )
    const paidRevenue = list
      .filter((o) => o && o.isPaid)
      .reduce((acc, curr) => acc + (Number(curr?.total) || 0), 0)

    return {
      activeCount: activeOrders.length,
      readyCount: readyOrders.length,
      paidRevenue
    }
  }, [orders])

  // Filtered ongoing orders (not Selesai, not Archived)
  const ongoingOrders = useMemo(() => {
    const list = Array.isArray(orders) ? orders : []
    return list
      .filter(
        (o) =>
          o &&
          !o.isArchived &&
          (o.processStatus || o.status) !== 'Selesai'
      )
      .filter((o) => {
        const name = (o?.customerName || o?.nama || '').toLowerCase()
        const id = String(o?.id || o?.resi || '').toLowerCase()
        const q = searchQuery.toLowerCase().trim()
        const matchesSearch = !q || name.includes(q) || id.includes(q)

        const st = o?.processStatus || o?.status || 'Dicuci'
        const matchesStatus =
          statusFilter === 'SEMUA' || st === statusFilter

        return matchesSearch && matchesStatus
      })
  }, [orders, searchQuery, statusFilter])

  return (
    <div>
      {/* KPI Summary Cards */}
      <section className="stats-container">
        {/* Card 1: Pesanan Aktif */}
        <div className="stat-box">
          <div className="stat-box-top">
            <div>
              <h4>Pesanan Aktif</h4>
              <p>
                {stats.activeCount} <span>Pesanan</span>
              </p>
              <p className="stat-box-desc blue">
                <Clock size={14} /> Sedang dalam proses pengerjaan
              </p>
            </div>
            <div className="stat-box-icon blue">
              <WashingMachine size={24} />
            </div>
          </div>
          <div className="stat-box-bar blue" />
        </div>

        {/* Card 2: Siap Diambil */}
        <div className="stat-box">
          <div className="stat-box-top">
            <div>
              <h4>Siap Diambil</h4>
              <p>
                {stats.readyCount} <span>Pesanan</span>
              </p>
              <p className="stat-box-desc amber">
                <PackageCheck size={14} /> Menunggu diambil pelanggan
              </p>
            </div>
            <div className="stat-box-icon amber">
              <Shirt size={24} />
            </div>
          </div>
          <div className="stat-box-bar amber" />
        </div>

        {/* Card 3: Total Pendapatan */}
        <div className="stat-box">
          <div className="stat-box-top">
            <div>
              <h4>Total Pendapatan (Lunas)</h4>
              <p>{formatRupiah(stats.paidRevenue)}</p>
              <p className="stat-box-desc green">
                <CheckCircle2 size={14} /> Terverifikasi lunas di kasir
              </p>
            </div>
            <div className="stat-box-icon green">
              <Wallet size={24} />
            </div>
          </div>
          <div className="stat-box-bar green" />
        </div>
      </section>

      {/* Filter & Search Header */}
      <section>
        <div className="filter-bar">
          <div>
            <h2 className="section-title">Daftar Pesanan Berjalan</h2>
            <p className="section-subtitle">
              Pantau status pengerjaan, konfirmasi pembayaran, dan selesaikan transaksi.
            </p>
          </div>

          <div className="filter-controls">
            {/* Search Input */}
            <div className="search-wrapper">
              <Search size={16} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari nama atau #TRX..."
                className="search-input"
              />
            </div>

            {/* Filter Pills */}
            <div className="filter-pills">
              {['SEMUA', 'Dicuci', 'Disetrika', 'Siap Diambil'].map((status) => (
                <button
                  key={status}
                  type="button"
                  onClick={() => setStatusFilter(status)}
                  className={`filter-pill ${
                    statusFilter === status ? 'active' : ''
                  }`}
                >
                  {status === 'SEMUA' ? 'Semua' : status}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Orders Grid or Empty State */}
        {ongoingOrders.length === 0 ? (
          <div className="empty-state">
            <div className="empty-state-icon">
              <WashingMachine size={28} />
            </div>
            <h3>Tidak ada pesanan berjalan ditemukan</h3>
            <p>
              Semua pesanan telah selesai atau tidak ada transaksi yang cocok dengan filter pencarian Anda.
            </p>
            <Link to="/add" className="btn-primary">
              <PlusCircle size={16} /> Buat Pesanan Baru
            </Link>
          </div>
        ) : (
          <div className="order-list">
            {ongoingOrders.map((order) => (
              <OrderCard
                key={order.id}
                order={order}
                onUpdateStatus={onUpdateStatus}
                onUpdatePayment={onUpdatePayment}
                onDeleteOrder={onDeleteOrder}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
