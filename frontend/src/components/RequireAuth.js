// src/components/RequireAuth.jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { auth } from '../services/auth'

export default function RequireAuth() {
  const location = useLocation()
  return auth.isAuth()
    ? <Outlet />
    : <Navigate to="/login" replace state={{ from: location }} />
}
