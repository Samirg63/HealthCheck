//Libs
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

//CSS
import './index.css'

//Components
import App from './App.tsx'

//Contexts
import { LoginProvider } from './contexts/loginContext.tsx'
import { SitesProvider } from './contexts/sitesContext.tsx'
import { NotificationProvider } from './contexts/notificationContext.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationProvider>
      <SitesProvider>
        <LoginProvider>
          <App />
        </LoginProvider>
      </SitesProvider>
    </NotificationProvider>
  </StrictMode>,
)
