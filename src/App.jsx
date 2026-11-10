import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AddOrder from './pages/AddOrder'
import TrackOrder from './pages/TrackOrder'
import History from './pages/History'
import { initialOrders } from './utils/initialData' 

function App() {
  const [orders, setOrders] = useState(initialOrders);

  const addOrder = (newOrder) => {
    setOrders([...orders, { ...newOrder, isPaid: false, isArchived: false }]);
  }

  const updateStatus = (id, currentStatus) => {
    let nextStatus = "Selesai"; 
    if (currentStatus === "Dicuci") nextStatus = "Disetrika";
    else if (currentStatus === "Disetrika") nextStatus = "Selesai";

    setOrders(orders.map(order => 
      order.id === id ? { ...order, status: nextStatus } : order
    ));
  }

  const updatePayment = (id) => {
    setOrders(orders.map(order => 
      order.id === id ? { ...order, isPaid: true } : order
    ));
  }

  const deleteOrder = (id, status, isPaid) => {
    if (status === 'Selesai') {
      if (!isPaid) {
        alert("Peringatan: Pesanan ini belum lunas! Pelanggan harus melunasi pembayaran terlebih dahulu sebelum diambil.");
        return;
      }
      if(window.confirm("Pindahkan pesanan lunas ini ke Riwayat?")) {
        setOrders(orders.map(order => order.id === id ? { ...order, isArchived: true } : order));
      }
    } else {
      if(window.confirm("Batalkan pesanan ini secara permanen?")) {
        setOrders(orders.filter(order => order.id !== id));
      }
    }
  }

  return (
    <Router>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<Home orders={orders} onUpdateStatus={updateStatus} onUpdatePayment={updatePayment} onDeleteOrder={deleteOrder} />} />
          <Route path="/add" element={<AddOrder onAdd={addOrder} />} />
          <Route path="/track" element={<TrackOrder orders={orders} />} />
          <Route path="/history" element={<History orders={orders} />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App