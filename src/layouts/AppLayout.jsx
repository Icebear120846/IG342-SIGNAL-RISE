import { Outlet, useLocation } from 'react-router-dom'
import SidebarNav from '../components/SidebarNav.jsx'
import BottomNav from '../components/BottomNav.jsx'

// Some rooms use a wider desktop layout — presentational only, no route/logic change.
const WIDE_CONTENT_CLASS_BY_PATH = {
  '/command': ' app-content--command',
  '/missions': ' app-content--missions',
  '/galaxy': ' app-content--galaxy',
  '/ship': ' app-content--ship',
  '/inventory': ' app-content--inventory',
  '/captain': ' app-content--captain',
}

export default function AppLayout() {
  const { pathname } = useLocation()
  const wideContentClass = WIDE_CONTENT_CLASS_BY_PATH[pathname] ?? ''

  return (
    <div className="app-shell">
      <SidebarNav />
      <div className="app-shell__main">
        <header className="app-topbar">
          <span className="app-topbar__orb" aria-hidden="true" />
          <span className="app-topbar__title">SIGNAL//RISE</span>
        </header>
        <main className={'app-content' + wideContentClass}>
          <Outlet />
        </main>
        <BottomNav />
      </div>
    </div>
  )
}
