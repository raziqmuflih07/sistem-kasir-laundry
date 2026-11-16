import { formatRupiah } from '../utils/formatters'
import {
  Calendar,
  Scale,
  Zap,
  CheckCircle2,
  X,
  ArrowRight,
  Check,
  Trash2,
  FileText
} from 'lucide-react'

export default function OrderCard({
  order,
  onUpdateStatus,
  onUpdatePayment,
  onDeleteOrder
}) {
  const status = order.processStatus || order.status || 'Dicuci'
  const isPaid = Boolean(order.isPaid)
  const nama = order.customerName || order.nama || 'Pelanggan'
  const berat = order.weight ?? order.berat ?? 0
  const layanan = order.service || order.layanan || 'Reguler'
  const resi = order.id || order.resi || '-'
  const createdAt = order.createdAt || 'Hari ini'

  const getStatusClass = (st) => {
    switch (st) {
      case 'Dicuci':
        return 'dicuci'
      case 'Disetrika':
        return 'disetrika'
      case 'Siap Diambil':
        return 'siap-diambil'
      case 'Selesai':
        return 'selesai'
      default:
        return 'dicuci'
    }
  }

  return (
    <div className="order-card">
      <div className={`order-card-accent ${isPaid ? 'paid' : 'unpaid'}`} />

      <div className="order-card-body">
        {/* Header Card: Resi & Status */}
        <div className="order-card-header">
          <span className="order-resi">#{resi}</span>

          <span className={`badge-status ${getStatusClass(status)}`}>
            <span className="dot" />
            {status.toUpperCase()}
          </span>
        </div>

        {/* Customer Info */}
        <div>
          <h3 className="order-title">{nama}</h3>
          <p className="order-date">
            <Calendar size={13} /> Masuk: {createdAt}
          </p>
        </div>

        {/* Details Box */}
        <div className="order-details-box">
          <div className="order-detail-row">
            <span className="order-detail-label">
              <Scale size={15} /> Berat Cucian
            </span>
            <span className="order-detail-value">{berat} Kg</span>
          </div>

          <div className="order-detail-row">
            <span className="order-detail-label">
              <Zap size={15} /> Layanan
            </span>
            <span className="order-detail-value">{layanan}</span>
          </div>

          <div className="order-total-row">
            <span className="order-total-label">Total Biaya</span>
            <span className="order-total-value">{formatRupiah(order.total)}</span>
          </div>
        </div>

        {/* Catatan Khusus Pelanggan */}
        {order.notes && (
          <div className="order-notes-box">
            <span className="order-notes-label">
              <FileText size={13} /> Catatan:
            </span>
            <p className="order-notes-text">{order.notes}</p>
          </div>
        )}

        {/* Payment Banner */}
        {isPaid ? (
          <div className="badge-paid">
            <CheckCircle2 size={16} />
            <span>LUNAS TERBAYAR</span>
          </div>
        ) : (
          <div className="badge-unpaid">
            <span className="badge-unpaid-label">
              <X size={15} /> BELUM LUNAS
            </span>
            {onUpdatePayment && (
              <button
                type="button"
                className="btn-payment"
                onClick={() => onUpdatePayment(order.id)}
              >
                Konfirmasi Lunas
              </button>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="order-actions">
          {status !== 'Selesai' && onUpdateStatus && (
            <div>
              {status === 'Dicuci' && (
                <button
                  type="button"
                  className="btn-update indigo"
                  style={{ width: '100%', padding: '10px' }}
                  onClick={() => onUpdateStatus(order.id, 'Disetrika')}
                >
                  Proses Setrika <ArrowRight size={14} />
                </button>
              )}

              {status === 'Disetrika' && (
                <button
                  type="button"
                  className="btn-update amber"
                  style={{ width: '100%', padding: '10px' }}
                  onClick={() => onUpdateStatus(order.id, 'Siap Diambil')}
                >
                  Set ke Siap Diambil <ArrowRight size={14} />
                </button>
              )}

              {status === 'Siap Diambil' && (
                <button
                  type="button"
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '10px',
                    backgroundColor: isPaid ? '#2563eb' : '#64748b',
                    cursor: 'pointer'
                  }}
                  onClick={() => {
                    if (!isPaid) {
                      alert(
                        'Pesanan belum lunas! Pelanggan harus melunasi pembayaran terlebih dahulu sebelum pesanan diselesaikan.'
                      )
                      return
                    }
                    onUpdateStatus(order.id, 'Selesai')
                  }}
                >
                  <Check size={14} /> Selesaikan Pesanan
                </button>
              )}
            </div>
          )}

          {onDeleteOrder && (
            <button
              type="button"
              className="btn-delete"
              onClick={() => onDeleteOrder(order)}
            >
              <Trash2 size={13} /> Batalkan Pesanan
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
