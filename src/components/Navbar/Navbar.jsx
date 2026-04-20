import { useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './Navbar.module.css'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>
          <span className={styles.logoAccent}>ANI</span>TRACKER
        </Link>

        <button
          className={styles.hamburger}
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={styles.bar} />
          <span className={styles.bar} />
          <span className={styles.bar} />
        </button>

        <ul className={`${styles.links} ${menuOpen ? styles.linksOpen : ''}`}>
          <li>
            <NavLink to="/" end className={({ isActive }) => isActive ? styles.activeLink : styles.link} onClick={() => setMenuOpen(false)}>
              Inicio
            </NavLink>
          </li>
          <li>
            <NavLink to="/search" className={({ isActive }) => isActive ? styles.activeLink : styles.link} onClick={() => setMenuOpen(false)}>
              Buscar
            </NavLink>
          </li>
          <li>
            <NavLink to="/mylist" className={({ isActive }) => isActive ? styles.activeLink : styles.link} onClick={() => setMenuOpen(false)}>
              Mi Lista
            </NavLink>
          </li>
          {user && (
            <li>
              <span className={styles.userInfo}>👤 {user.username}</span>
            </li>
          )}
          {user && (
            <li>
              <button className={styles.logoutBtn} onClick={handleLogout}>
                Salir
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  )
}
