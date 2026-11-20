import { useState, useEffect, useMemo } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AddOrder from './pages/AddOrder'
import TrackOrder from './pages/TrackOrder'
import History from './pages/History'
import NotFound from './pages/NotFound'
import { CheckCircle2, AlertCircle } from 'lucide-react'

const STORAGE_KEY = 'laundry_orders'

export default function App() {
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) return parsed
      }
      return DEFAULT_INITIAL_ORDERS
    } catch {
      return DEFAULT_INITIAL_ORDERS
    }
  })

  // Toast state
  const [toast, setToast] = useState(null)

  // Modal target konfirmasi hapus
  const [deleteTarget, setDeleteTarget] = useState(null)

  useEffect(() => {
    try {
      if (Array.isArray(orders)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orders))
      }
    } catch (err) {
      console.error('Failed to save to localStorage', err)
    }
  }, [orders])

  const showToast = (message) => {
    setToast(message)
    setTimeout(() => setToast(null), 3500)
  }

  // Hitung pesanan aktif untuk badge di Navbar
  const activeCount = useMemo(() => {
    if (!Array.isArray(orders)) return 0
    return orders.filter(
      (o) =>
        o &&
        !o.isArchived &&
        (o.processStatus || o.status) !== 'Selesai'
    ).length
  }, [orders])

  // Tambah Pesanan Baru
  const addOrder = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev])
    showToast(`Pesanan baru #${newOrder.id} berhasil ditambahkan!`)
  }

  // Update Status Proses
  const updateStatus = (id, targetStatus) => {
    const existing = orders.find((o) => o.id === id)
    if (!existing) return

    let nextStatus = targetStatus
    if (!nextStatus) {
      const current = existing.processStatus || existing.status || 'Dicuci'
      if (current === 'Dicuci') nextStatus = 'Disetrika'
      else if (current === 'Disetrika') nextStatus = 'Siap Diambil'
      else nextStatus = 'Selesai'
    }

    // Validasi: tidak bisa jadi selesai jika belum lunas dan status belum siap diambil
    if (nextStatus === 'Selesai') {
      const current = existing.processStatus || existing.status
      if (current !== 'Siap Diambil') {
        alert(
          'Pesanan belum bisa diselesaikan karena belum mencapai status "Siap Diambil"!'
        )
        return
      }
      if (!existing.isPaid) {
        alert(
          'Pesanan belum bisa diselesaikan karena belum lunas! Pelanggan harus melunasi pembayaran terlebih dahulu.'
        )
        return
      }
    }

    setOrders((prev) =>
      prev.map((order) => {
        if (order.id !== id) return order

        const isArchived = nextStatus === 'Selesai'

        return {
          ...order,
          processStatus: nextStatus,
          status: nextStatus,
          isArchived
        }
      })
    )
    showToast(`Status #${id} diperbarui menjadi "${nextStatus}"`)
  }

  // Konfirmasi Pembayaran Lunas
  const updatePayment = (id) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, isPaid: true } : order
      )
    );
    showToast(`Pembayaran pesanan #${id} dikonfirmasi LUNAS!`)
  }

  // Buka Modal Konfirmasi Hapus
  const promptDeleteOrder = (order) => {
    const currentStatus = order.processStatus || order.status
    if (currentStatus === 'Selesai' && !order.isPaid) {
      alert(
        'Peringatan: Pesanan ini belum lunas! Pelanggan harus melunasi pembayaran terlebih dahulu.'
      )
      return
    }
    setDeleteTarget(order)
  }

  // Konfirmasi Hapus di Modal
  const confirmDelete = () => {
    if (!deleteTarget) return
    const id = deleteTarget.id
    setOrders((prev) => prev.filter((order) => order.id !== id))
    showToast(`Pesanan #${id} telah dibatalkan & dihapus.`)
    setDeleteTarget(null)
  }

  return (
    <Router>
      <Navbar activeCount={activeCount} />

      {/* Toast Notification */}
      {toast && (
        <div className="toast">
          <CheckCircle2 size={18} />
          <span>{toast}</span>
        </div>
      )}

      {/* Modal Konfirmasi Pembatalan Pesanan */}
      {deleteTarget && (
        <div className="modal-overlay">
          <div className="modal-box">
            <div className="modal-icon-row">
              <div className="modal-icon">
                <AlertCircle size={20} />
              </div>
              <h3 className="modal-title">Batalkan Pesanan?</h3>
            </div>
            <p className="modal-desc">
              Anda yakin ingin membatalkan dan menghapus transaksi{' '}
              <strong>#{deleteTarget.id || deleteTarget.resi}</strong> atas nama{' '}
              <strong>
                {deleteTarget.customerName || deleteTarget.nama}
              </strong>
              ? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                onClick={() => setDeleteTarget(null)}
                className="btn-modal-cancel"
              >
                Kembali
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="btn-modal-confirm"
              >
                Ya, Batalkan Pesanan
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="app-container">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                orders={orders}
                onUpdateStatus={updateStatus}
                onUpdatePayment={updatePayment}
                onDeleteOrder={promptDeleteOrder}
              />
            }
          />
          <Route path="/add" element={<AddOrder onAdd={addOrder} />} />
          <Route path="/track" element={<TrackOrder orders={orders} />} />
          <Route path="/history" element={<History orders={orders} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  )
}
