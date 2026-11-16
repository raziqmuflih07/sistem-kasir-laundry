import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { formatRupiah } from '../utils/formatters'
import {
  User,
  Scale,
  Receipt,
  PlusCircle
} from 'lucide-react'

const SERVICE_OPTIONS = [
  { name: 'Reguler', duration: '2 Hari', price: 6000, desc: 'Cuci kering setrika standar' },
  { name: 'Ekspres', duration: '6 Jam', price: 10000, desc: 'Prioritas selesai hari ini' },
  { name: 'Kilat', duration: '3 Jam', price: 15000, desc: 'Super cepat & parfum premium' },
  { name: 'Cuci Lipat', duration: '1 Hari', price: 4500, desc: 'Tanpa setrika, rapi dilipat' }
]

export default function AddOrder({ onAdd }) {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    customerName: '',
    weight: '',
    service: 'Ekspres',
    isPaid: false,
    notes: ''
  })

  const selectedService =
    SERVICE_OPTIONS.find((s) => s.name === formData.service) || SERVICE_OPTIONS[0]

  const weightNum = parseFloat(formData.weight) || 0
  const calculatedTotal = weightNum * selectedService.price

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.customerName.trim()) {
      alert('Nama pelanggan tidak boleh kosong!')
      return
    }

    if (weightNum <= 0) {
      alert('Berat cucian harus lebih dari 0 Kg!')
      return
    }

    if (weightNum > 100) {
      alert('Berat cucian maksimal 100 Kg!')
      return
    }

    const randomNum = Math.floor(2280 + Math.random() * 720)
    const now = new Date()
    const timeStr = now.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })

    const newOrder = {
      id: `TRX-${randomNum}`,
      resi: `TRX-${randomNum}`,
      customerName: formData.customerName.trim(),
      nama: formData.customerName.trim(),
      weight: weightNum,
      berat: weightNum,
      service: selectedService.name,
      layanan: selectedService.name,
      pricePerKg: selectedService.price,
      total: calculatedTotal,
      processStatus: 'Dicuci',
      status: 'Dicuci',
      isPaid: formData.isPaid,
      isArchived: false,
      createdAt: timeStr,
      estimatedDone: `Estimasi ${selectedService.duration}`,
      notes: formData.notes.trim()
    }

    onAdd(newOrder)
    navigate('/')
  }

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
      <div className="section-header">
        <h2 className="section-title">Buat Pesanan Laundry Baru</h2>
        <p className="section-subtitle">
          Masukkan detail pelanggan dan berat cucian (maksimal 100 Kg). Estimasi biaya dihitung otomatis.
        </p>
      </div>

      <div className="add-order-grid">
        {/* Form Container */}
        <form onSubmit={handleSubmit} className="form-container">
          <div className="form-group">
            {/* Nama Pelanggan */}
            <div>
              <label>Nama Pelanggan *</label>
              <div className="input-wrapper">
                <User size={15} />
                <input
                  type="text"
                  required
                  placeholder="Masukkan nama"
                  value={formData.customerName}
                  onChange={(e) =>
                    setFormData({ ...formData, customerName: e.target.value })
                  }
                  className="input-field with-icon"
                />
              </div>
            </div>

            {/* Pilihan Paket Layanan */}
            <div>
              <label>Pilih Paket Layanan</label>
              <div className="service-options">
                {SERVICE_OPTIONS.map((srv) => {
                  const isActive = formData.service === srv.name
                  return (
                    <div
                      key={srv.name}
                      onClick={() => setFormData({ ...formData, service: srv.name })}
                      className={`service-option ${isActive ? 'active' : ''}`}
                    >
                      <div className="service-option-top">
                        <span className="service-option-name">{srv.name}</span>
                        <span className="service-option-price">
                          {formatRupiah(srv.price)}/kg
                        </span>
                      </div>
                      <p className="service-option-desc">{srv.desc}</p>
                      <p className="service-option-duration">
                        Estimasi: {srv.duration}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Berat & Status Pembayaran */}
            <div className="form-row">
              <div>
                <label>Berat Cucian (Maks. 100 Kg) *</label>
                <div className="input-group-weight">
                  <div className="input-wrapper" style={{ width: '100%' }}>
                    <Scale size={15} />
                    <input
                      type="number"
                      step="0.1"
                      min="0.1"
                      max="100"
                      required
                      placeholder="Maks. 100 Kg"
                      value={formData.weight}
                      onChange={(e) => {
                        const val = e.target.value
                        if (val === '' || (Number(val) >= 0 && Number(val) <= 100)) {
                          setFormData({ ...formData, weight: val })
                        }
                      }}
                      className="input-field with-icon"
                    />
                  </div>
                  <span className="input-suffix-badge">Kg</span>
                </div>
              </div>

              <div>
                <label>Status Pembayaran Awal</label>
                <div className="payment-toggle">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isPaid: false })}
                    className={`payment-toggle-btn unpaid ${
                      !formData.isPaid ? 'active' : ''
                    }`}
                  >
                    Belum Lunas
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, isPaid: true })}
                    className={`payment-toggle-btn paid ${
                      formData.isPaid ? 'active' : ''
                    }`}
                  >
                    Lunas Sekarang
                  </button>
                </div>
              </div>
            </div>

            {/* Catatan Khusus */}
            <div>
              <label>Catatan Khusus (Opsional)</label>
              <input
                type="text"
                placeholder="Contoh: Pisahkan baju putih, parfum ekstra..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                className="input-field"
              />
            </div>

            {/* Action Buttons */}
            <div className="form-actions">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="btn-cancel"
              >
                Batal
              </button>
              <button type="submit" className="btn-submit">
                <PlusCircle size={16} /> Simpan Pesanan
              </button>
            </div>
          </div>
        </form>

        {/* Live Receipt Preview */}
        <div className="receipt-preview">
          <div>
            <div className="receipt-header">
              <span className="receipt-label">Ringkasan Nota</span>
              <Receipt size={20} color="#60a5fa" />
            </div>

            <div className="receipt-rows">
              <div className="receipt-row">
                <span>Pelanggan</span>
                <span>{formData.customerName || 'Belum diisi'}</span>
              </div>
              <div className="receipt-row">
                <span>Layanan</span>
                <span className="blue">{formData.service}</span>
              </div>
              <div className="receipt-row">
                <span>Tarif / Kg</span>
                <span>{formatRupiah(selectedService.price)}</span>
              </div>
              <div className="receipt-row">
                <span>Berat</span>
                <span>{formData.weight || 0} Kg</span>
              </div>
              <div className="receipt-row">
                <span>Pembayaran</span>
                <span className={formData.isPaid ? 'green' : 'red'}>
                  {formData.isPaid ? 'LUNAS' : 'BELUM LUNAS'}
                </span>
              </div>
              {formData.notes && (
                <div className="receipt-row">
                  <span>Catatan</span>
                  <span style={{ maxWidth: '170px', textAlign: 'right', fontSize: '0.8rem', color: '#cbd5e1' }}>
                    {formData.notes}
                  </span>
                </div>
              )}
            </div>
          </div>

          <div className="receipt-footer">
            <p className="receipt-total-label">Total Tagihan</p>
            <p className="receipt-total-value">
              {formatRupiah(calculatedTotal)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
