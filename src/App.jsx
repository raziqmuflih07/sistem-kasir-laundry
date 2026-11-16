import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import AddOrder from './pages/AddOrder'
import TrackOrder from './pages/TrackOrder'
import History from './pages/History'
import NotFound from './pages/NotFound'

const STORAGE_KEY = 'laundry_orders';

function App() {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  }, [orders]);

  const addOrder = (newOrder) => {
    setOrders(prev => [...prev, { ...newOrder, isPaid: false, isArchived: false }]);
  }

  const updateStatus = (id, currentStatus) => {
    let nextStatus = "Selesai"; 
    if (currentStatus === "Dicuci") nextStatus = "Disetrika";
    else if (currentStatus === "Disetrika") nextStatus = "Selesai";

    setOrders(prev => prev.map(order => 
      order.id === id ? { ...order, status: nextStatus } : order
    ));
  }

  const updatePayment = (id) => {
    setOrders(prev => prev.map(order => 
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
        setOrders(prev => prev.map(order => order.id === id ? { ...order, isArchived: true } : order));
      }
    } else {
      if(window.confirm("Batalkan pesanan ini secara permanen?")) {
        setOrders(prev => prev.filter(order => order.id !== id));
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
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App