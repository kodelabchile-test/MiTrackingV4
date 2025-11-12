import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://kodelab.cl" target="_blank" rel="noopener noreferrer">
          MiTracking
        </a>
        <span className="ms-1">&copy; 2025 Kodelab.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://kodelab.cl" target="_blank" rel="noopener noreferrer">
          Kodelab
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
