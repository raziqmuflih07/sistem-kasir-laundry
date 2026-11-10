import { useState } from 'react'
import OrderCard from '../components/OrderCard'

export default function TrackOrder({ orders }) {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState(null)

  const handleSearch = (e) => {
    e.preventDefault()
    
    const found = orders.filter(order => 
      !order.isArchived && (
        order.resi.toLowerCase().includes(search.toLowerCase()) ||
        order.nama.toLowerCase().includes(search.toLowerCase())
      )
    )
    
    if (found.length > 0) {
      setResults(found)
    } else {
      setResults('NOT_FOUND')
    }
  }

  return (
    <div>
      <h2>Cek Status Cucian</h2>
      <hr />
      <form onSubmit={handleSearch} className="search-form">
        <input 
          type="text" 
          placeholder="Cari Nama atau No. Resi (Contoh: Budi / TRX-1001)" 
          value={search} 
          onChange={(e) => setSearch(e.target.value)}
          className="input-field"
          style={{ marginTop: 0, minWidth: '350px' }} 
          required
        />
        <button type="submit" className="btn-search">
          Lacak
        </button>
      </form>

      <div style={{ marginTop: '20px' }}>
        {results === 'NOT_FOUND' && (
          <p className="text-error">Pesanan dengan kata kunci "{search}" tidak ditemukan atau sudah diambil oleh pemiliknya.</p>
        )}
        
        {results && results !== 'NOT_FOUND' && (
          <div>
            <h4 style={{ marginBottom: '15px' }}>Ditemukan {results.length} pesanan aktif:</h4>
            
            <div className="order-list">
              {results.map((order) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}