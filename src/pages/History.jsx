import OrderCard from '../components/OrderCard'

export default function History({ orders }) {
  const historyOrders = orders.filter(order => order.isArchived);

  return (
    <div>
      <h2>Riwayat Pesanan Selesai</h2>
      <hr />
      
      {historyOrders.length === 0 ? (
        <p>Belum ada riwayat pesanan yang diselesaikan.</p>
      ) : (
        <div className="order-list">
          {historyOrders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </div>
      )}
    </div>
  )
}