import { formatRupiah } from '../utils/formatters'
import { CheckCircle2 } from 'lucide-react'

export default function History({ orders = [] }) {
  const list = Array.isArray(orders) ? orders : []
  const historyOrders = list.filter(
    (order) =>
      order &&
      (order.isArchived ||
        (order.processStatus || order.status) === 'Selesai')
  )

  return (
    <div>
      <div className="section-header">
        <h2 className="section-title">Riwayat Transaksi Selesai</h2>
        <p className="section-subtitle">
          Arsip pesanan laundry yang telah selesai dan diambil oleh pelanggan.
        </p>
      </div>

      <div className="history-table-wrapper">
        <div style={{ overflowX: 'auto' }}>
          <table className="history-table">
            <thead>
              <tr>
                <th>ID Transaksi</th>
                <th>Pelanggan</th>
                <th>Layanan & Berat</th>
                <th>Total Biaya</th>
                <th>Pembayaran</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {historyOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="history-empty">
                    Belum ada riwayat pesanan yang selesai.
                  </td>
                </tr>
              ) : (
                historyOrders.map((item) => {
                  const nama = item.customerName || item.nama || 'Pelanggan'
                  const createdAt = item.createdAt || '-'
                  const layanan = item.service || item.layanan || 'Reguler'
                  const berat = item.weight ?? item.berat ?? 0

                  return (
                    <tr key={item.id}>
                      <td>
                        <span className="resi-cell">
                          #{item.id || item.resi}
                        </span>
                      </td>
                      <td>
                        <p className="name-cell">{nama}</p>
                        <p className="date-cell">{createdAt}</p>
                        {item.notes && (
                          <p style={{ fontSize: '0.72rem', color: '#b45309', marginTop: '3px' }}>
                            <em>Catatan: {item.notes}</em>
                          </p>
                        )}
                      </td>
                      <td>
                        {layanan} • <strong>{berat} Kg</strong>
                      </td>
                      <td>
                        <strong>{formatRupiah(item.total)}</strong>
                      </td>
                      <td>
                        <span
                          className={`table-badge ${
                            item.isPaid ? 'paid' : 'unpaid'
                          }`}
                        >
                          {item.isPaid ? 'Lunas' : 'Belum Lunas'}
                        </span>
                      </td>
                      <td>
                        <span className="table-badge done">
                          <CheckCircle2 size={13} color="#059669" /> Selesai
                        </span>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
