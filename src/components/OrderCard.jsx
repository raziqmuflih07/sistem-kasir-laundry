import { formatRupiah } from '../utils/formatters'

export default function OrderCard({ order, onUpdateStatus, onUpdatePayment, onDeleteOrder }) {
  
  let badgeColor = '#fef08a'; 
  let textColor = '#854d0e';
  
  if (order.status === 'Disetrika') {
    badgeColor = '#bae6fd'; 
    textColor = '#0369a1';
  } else if (order.status === 'Selesai') {
    badgeColor = '#dcfce7'; 
    textColor = '#166534';
  }

  return (
    <div className="order-card">
      <p className="order-resi">
        #{order.resi}
      </p>
      
      <h3 className="order-title">{order.nama}</h3>
      <p>Berat: {order.berat} Kg</p>
      <p>Layanan: {order.layanan}</p>
      <p>Total: <strong>{formatRupiah(order.total)}</strong></p>
      
      <div 
        className="badge-status" 
        style={{ backgroundColor: badgeColor, color: textColor }}
      >
        {order.status}
      </div>

      <div style={{ marginTop: '8px' }}>
        {order.isPaid ? (
          <span className="badge-paid">
            ✓ LUNAS
          </span>
        ) : (
          <span className="badge-unpaid">
            ✕ BELUM LUNAS
          </span>
        )}
      </div>

      {!order.isPaid && onUpdatePayment && (
        <button 
          className="btn-payment"
          onClick={() => onUpdatePayment(order.id)}
        >
          Konfirmasi Lunas
        </button>
      )}

      {order.status !== 'Selesai' && onUpdateStatus && (
        <button 
          className="btn-update"
          onClick={() => onUpdateStatus(order.id, order.status)}
        >
          Update ke {order.status === 'Dicuci' ? 'Disetrika' : 'Selesai'}
        </button>
      )}

      {onDeleteOrder && (
        <button 
          className="btn-delete"
          style={{ backgroundColor: order.status === 'Selesai' ? '#64748b' : '#ef4444' }}
          onClick={() => onDeleteOrder(order.id, order.status, order.isPaid)}
        >
          {order.status === 'Selesai' ? 'Pindah ke Riwayat' : 'Batalkan (Hapus)'}
        </button>
      )}
    </div>
  )
}