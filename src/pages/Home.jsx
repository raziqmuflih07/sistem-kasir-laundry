import OrderCard from '../components/OrderCard'
import { formatRupiah } from '../utils/formatters'

export default function Home({ orders, onUpdateStatus, onUpdatePayment, onDeleteOrder }) {
  
  const totalAktif = orders.filter(order => order.status !== 'Selesai' && !order.isArchived).length;
  const totalSelesai = orders.filter(order => order.status === 'Selesai' && !order.isArchived).length;
  
  const totalPendapatan = orders
    .filter(order => order.status === 'Selesai' && order.isPaid)
    .reduce((total, order) => total + order.total, 0);

  const visibleOrders = orders.filter(order => !order.isArchived);

  return (
    <div>
      <div className="stats-container">
        <div className="stat-box">
          <h4>Pesanan Aktif</h4>
          <p>{totalAktif} Pesanan</p>
        </div>
        <div className="stat-box">
          <h4>Siap Diambil</h4>
          <p>{totalSelesai} Pesanan</p>
        </div>
        <div className="stat-box" style={{ borderLeftColor: '#10b981' }}>
          <h4>Total Pendapatan (Lunas)</h4>
          <p>{formatRupiah(totalPendapatan)}</p>
        </div>
      </div>

      <h2>Daftar Pesanan Berjalan</h2>
      <hr />
      
      {visibleOrders.length === 0 ? (
        <p>Belum ada pesanan yang sedang berjalan.</p>
      ) : (
        <div className="order-list">
          {visibleOrders.map((order) => (
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
    </div>
  )
}