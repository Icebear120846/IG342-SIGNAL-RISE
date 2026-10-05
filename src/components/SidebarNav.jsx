import { NavLink } from 'react-router-dom'
import { NAV_ITEMS } from '../nav/navItems.js'

export default function SidebarNav() {
  return (
    <nav className="sidebar-nav" aria-label="Main navigation">
      <div className="sidebar-nav__brand">
        <span className="sidebar-nav__orb" aria-hidden="true" />
        <span className="sidebar-nav__brand-text">SIGNAL//RISE</span>
      </div>
      <ul className="sidebar-nav__list">
        {NAV_ITEMS.map((item, index) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) => 'sidebar-nav__item' + (isActive ? ' is-active' : '')}
            >
              <span className="sidebar-nav__index" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className="sidebar-nav__icon" aria-hidden="true">
                {item.icon}
              </span>
              <span className="sidebar-nav__label">{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
