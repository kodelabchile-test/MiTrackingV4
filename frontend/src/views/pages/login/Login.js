import React, { useState } from 'react'
import { Link, replace } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../../services/auth' // <-- ajusta la ruta según tu estructura real
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CSpinner,
  CToast,
  CToastBody,
  CToastClose,
  CToaster
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { apiPost } from '../../../services/api' // <-- ajusta la ruta según tu estructura real

const Login = () => {
  const [loginEmail, setEmail] = useState('')
  const [loginPassword, setPassword] = useState('')
  const [msg, setMsg] = useState(null)
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState(null)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMsg(null)
    setLoading(true)
    setToast(null)

    const res = await apiPost('/api/login', { loginEmail, loginPassword })

    if (res.ok) {
      //setMsg(`Bienvenido ${res.email} ✅`)
      setToast({ color: 'success', message: res.email || 'Login exitoso ${res.name}' })
      auth.setUser({ email: res.email})

      // Aquí podrías redirigir al dashboard, por ejemplo:
      navigate('/dashboard'), {replace: true} // aquí rediriges
    } else {
      setToast({ color: 'danger', message: res.msg || 'Error al iniciar sesión' })
    }

    setLoading(false)
  }

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    <p className="text-body-secondary">Inicia sesión en tu cuenta</p>

                    {msg && <p className="mb-3 text-center">{msg}</p>}

                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="email"
                        autoComplete="email"
                        value={loginEmail}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </CInputGroup>

                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Password"
                        autoComplete="current-password"
                        value={loginPassword}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </CInputGroup>

                    <CRow>
                      <CCol xs={6}>
                        <CButton color="primary" className="px-4" type="submit" disabled={loading}>
                          {loading ? (
                            <>
                              <CSpinner as="span" size="sm" className='me-2' aria-hidden="true" />
                              Iniciando...
                            </>
                          ) : (
                            'Login'
                          )}
                        </CButton>
                      </CCol>
                      <CCol xs={6} className="text-right">
                        <CButton color="link" className="px-0">
                          Forgot password?
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>

                  {/* Toast message */}

                  <CToaster placement="top-end">
                    {toast && (
                      <CToast
                        visible={true}
                        autohide={true}
                        delay={3000}
                        className="align-items-center text-white"
                        color={toast.color}
                      >
                        <div className="d-flex">
                          <CToastBody>{toast.message}</CToastBody>
                          <CToastClose className="me-2 m-auto"/>
                        </div>
                      </CToast>
                    )}
                  </CToaster>

                </CCardBody>
              </CCard>

              <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Sign up</h2>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
                      incididunt ut labore et dolore magna aliqua.
                    </p>
                    <Link to="/register">
                      <CButton color="primary" className="mt-3" active tabIndex={-1} disabled>
                        Register Now!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
