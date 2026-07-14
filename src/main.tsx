import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { LoginProvider } from './contexts/loginContext.tsx'
import { SitesProvider } from './contexts/sitesContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoginProvider>
      <SitesProvider>
        <App />
      </SitesProvider>
    </LoginProvider>
  </StrictMode>,
)
