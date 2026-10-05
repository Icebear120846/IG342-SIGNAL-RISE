import { useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AppLayout from './layouts/AppLayout.jsx'
import CommandPage from './pages/CommandPage.jsx'
import MissionsPage from './pages/MissionsPage.jsx'
import GalaxyPage from './pages/GalaxyPage.jsx'
import ShipPage from './pages/ShipPage.jsx'
import InventoryPage from './pages/InventoryPage.jsx'
import CaptainPage from './pages/CaptainPage.jsx'
import SplashIntro from './components/SplashIntro.jsx'
import { hasSeenIntro, markIntroSeen } from './utils/introStorage.js'

export default function App() {
  const [showSplash, setShowSplash] = useState(() => !hasSeenIntro())

  if (showSplash) {
    return (
      <SplashIntro
        onFinish={() => {
          markIntroSeen()
          setShowSplash(false)
        }}
      />
    )
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<Navigate to="/command" replace />} />
        <Route path="/command" element={<CommandPage />} />
        <Route path="/missions" element={<MissionsPage />} />
        <Route path="/galaxy" element={<GalaxyPage />} />
        <Route path="/ship" element={<ShipPage />} />
        <Route path="/inventory" element={<InventoryPage />} />
        <Route path="/captain" element={<CaptainPage />} />
        <Route path="*" element={<Navigate to="/command" replace />} />
      </Route>
    </Routes>
  )
}
