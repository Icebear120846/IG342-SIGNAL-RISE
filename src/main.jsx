import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { GameStateProvider } from './state/GameStateContext.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GameStateProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <App />
      </BrowserRouter>
    </GameStateProvider>
  </StrictMode>,
)
