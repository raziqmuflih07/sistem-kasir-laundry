import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { validateNama, validateBerat } from '../utils/validators'

export default function AddOrder({ onAdd }) {
  const [nama, setNama] = useState('')
  const [berat, setBerat] = useState('')
  const [layanan, setLayanan] = useState('Reguler')
  const navigate = useNavigate()

  const handleNamaChange = (e) => {
    const value = e.target.value;
    if (validateNama(value)) {
      setNama(value); 
    }
  }

  const handleBeratChange = (e) => {
    const value = e.target.value;
    if (validateBerat(value)) {
      setBerat(value);
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (Number(berat) === 0) {
      alert("Berat cucian tidak boleh 0 Kg!");
      return;
    }

    const angkaAcak = Math.floor(1000 + Math.random() * 9000);
    const kodeResi = `TRX-${angkaAcak}`;

    const hargaPerKg = layanan === 'Reguler' ? 6000 : 10000
    const total = parseFloat(berat) * hargaPerKg

    const newOrder = {
      id: Date.now(),
      resi: kodeResi,
      nama: nama,
      berat: parseFloat(berat),
      layanan: layanan,
      total: total,
      status: "Dicuci"
    }

    onAdd(newOrder)
    navigate('/')
  }

  return (
    <div className="form-container">
      <h2>Tambah Pesanan Baru</h2>
      <hr />
      <form onSubmit={handleSubmit} className="form-group">
        
        <div>
          <label>Nama Pelanggan:</label>
          <input 
            type="text" 
            value={nama} 
            onChange={handleNamaChange} 
            required 
            className="input-field" 
            placeholder="Masukkan nama pelanggan..."
          />
        </div>

        <div>
          <label>Berat Cucian (Kg):</label>
          <input 
            type="number" 
            value={berat} 
            onChange={handleBeratChange} 
            required 
            min="1" 
            max="100" 
            step="0.1" 
            className="input-field" 
            placeholder="Maksimal 100 Kg"
          />
        </div>

        <div>
          <label>Jenis Layanan:</label>
          <select value={layanan} onChange={(e) => setLayanan(e.target.value)} className="input-field">
            <option value="Reguler">Reguler (Rp6.000/kg)</option>
            <option value="Ekspres">Ekspres (Rp10.000/kg)</option>
          </select>
        </div>

        <button type="submit" className="btn-primary">
          Simpan Pesanan
        </button>

      </form>
    </div>
  )
}