// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { UserContextProvider } from './components/context/UserContext.jsx'
import { PinProvider } from './components/context/PinContext.jsx'


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <UserContextProvider>
    <PinProvider>
      <App />
    </PinProvider>
  </UserContextProvider>
  // </StrictMode>,
)
