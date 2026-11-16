import { useState, useMemo } from 'react'
import { formatRupiah } from '../utils/formatters'
import { Search, Check, FileText } from 'lucide-react'

const STEPS = ['Dicuci', 'Disetrika', 'Siap Diambil', 'Selesai']

export default function TrackOrder({ orders = [] }) {
  const [trackingQuery, setTrackingQuery] = useState('')

  const trackedOrders = useMemo(() => {
    const q = trackingQuery.replace('#', '').trim().toLowerCase()
    if (!q) return []

    const list = Array.isArray(orders) ? orders : []
    return list.filter((o) => {
      if (!o) return false
      const id = String(o.id || o.resi || '').toLowerCase()
      const name = String(o.customerName || o.nama || '').toLowerCase()
      return id.includes(q) || name.includes(q)
    })
  }, [orders, trackingQuery])

  return (
    <div className="track-wrapper">
      <div className="track-header">
        <h2>Lacak Status Laundry</h2>
        <p>Masukkan nomor transaksi (contoh: TRX-2281) atau nama pelanggan.</p>
      </div>

      <div className="track-search-wrapper">
        <Search size={20} />
        <input
          type="text"
          value={trackingQuery}
          onChange={(e) => setTrackingQuery(e.target.value)}
          placeholder="Ketik kode transaksi, misal: TRX-2281 atau nama pelanggan..."
          className="track-input"
        />
      </div>

      {trackingQuery.trim() !== '' && (
        <>
          {trackedOrders.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <p
                style={{
                  fontSize: '0.85rem',
                  color: '#64748b',
                  fontWeight: 600,
                  margin: 0
                }}
              >
                Ditemukan <strong>{trackedOrders.length}</strong> pesanan yang cocok dengan "{trackingQuery}":
              </p>

              {trackedOrders.map((order) => {
                const currentStatus =
                  order.processStatus || order.status || 'Dicuci'
                const currentIndex = STEPS.indexOf(currentStatus)
                const resi = order.id || order.resi || '-'
                const nama = order.customerName || order.nama || 'Pelanggan'
                const layanan = order.service || order.layanan || 'Reguler'
                const berat = order.weight ?? order.berat ?? 0

                return (
                  <div key={order.id} className="track-result-card">
                    <div className="track-result-top">
                      <div>
                        <span className="track-resi">#{resi}</span>
                        <h3 className="track-name">{nama}</h3>
                        <p
                          style={{
                            fontSize: '0.8rem',
                            color: '#64748b',
                            marginTop: '4px'
                          }}
                        >
                          {layanan} • <strong>{berat} Kg</strong>
                          {order.createdAt ? ` • Masuk: ${order.createdAt}` : ''}
                        </p>
                      </div>

                      <div className="track-total">
                        <p>Total Tagihan</p>
                        <p>{formatRupiah(order.total)}</p>
                        <span
                          className={`track-payment-badge ${
                            order.isPaid ? 'paid' : 'unpaid'
                          }`}
                        >
                          {order.isPaid ? 'LUNAS' : 'BELUM LUNAS'}
                        </span>
                      </div>
                    </div>

                    {/* Catatan Khusus Pelanggan jika ada */}
                    {order.notes && (
                      <div className="track-notes-box">
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '5px',
                            fontWeight: 800,
                            marginBottom: '2px'
                          }}
                        >
                          <FileText size={14} /> Catatan Khusus:
                        </div>
                        <p style={{ margin: 0, lineHeight: 1.4 }}>
                          {order.notes}
                        </p>
                      </div>
                    )}

                    {/* Stepper Progress */}
                    <div>
                      <p className="stepper-label">Progres Pengerjaan</p>
                      <div className="stepper">
                        {STEPS.map((step, idx) => {
                          const isCompleted = idx <= currentIndex

                          return (
                            <div key={step} className="stepper-step">
                              <div
                                className={`stepper-circle ${
                                  isCompleted ? 'done' : 'pending'
                                }`}
                              >
                                {isCompleted ? <Check size={16} /> : idx + 1}
                              </div>
                              <span
                                className={`stepper-step-label ${
                                  isCompleted ? 'done' : 'pending'
                                }`}
                              >
                                {step}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="track-not-found">
              <p>
                Data transaksi dengan kata kunci "{trackingQuery}" tidak ditemukan.
                Pastikan nomor resi atau nama sudah benar.
              </p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
