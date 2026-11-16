import { useNavigate } from 'react-router-dom'

export default function NotFound() {
  const navigate = useNavigate()

  return (
    <div className="notfound-wrapper">
      <div className="notfound-box">
        <h2 className="notfound-title">This page doesn't exist</h2>
        <p className="notfound-subtitle">
          It may have been moved, removed, or never existed.
        </p>
        <button className="notfound-btn" onClick={() => navigate(-1)}>
          Go back
        </button>
        <div className="notfound-meta">
          <span>404 NOT_FOUND</span>
        </div>
      </div>
    </div>
  )
}
