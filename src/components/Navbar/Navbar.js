import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import CartWidget from '../CartWidget/CartWidget'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [search, setSearch] = useState('')
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const handleSearch = (event) => {
    event.preventDefault()
    const term = search.trim()
    if (term) {
      navigate(`/search?q=${encodeURIComponent(term)}`)
      setSearch('')
      closeMenu()
    }
  }

  return (
    <nav className="NavBar">
      <div className="NavBar-container">
        <h3 onClick={() => navigate('/')}>
          <span className="NavBar-logo-icon">⚡</span> TechStore
        </h3>

        {/* Buscador (desktop) */}
        <form className="NavBar-search desktop" onSubmit={handleSearch} role="search">
          <input
            type="search"
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Buscar productos"
          />
          <button type="submit" aria-label="Buscar">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="7" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </button>
        </form>

        {/* Botón hamburguesa */}
        <button 
          className={`hamburger ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Menú de navegación */}
        <div className={`Categories ${isMenuOpen ? 'Categories-open' : ''}`}>
          {/* Buscador (móvil) */}
          <form className="NavBar-search mobile" onSubmit={handleSearch} role="search">
            <input
              type="search"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              aria-label="Buscar productos"
            />
            <button type="submit" aria-label="Buscar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </button>
          </form>

          <NavLink
            to={`/category/celular`} 
            className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}
            onClick={closeMenu}
          >
            Celulares
          </NavLink>
          <NavLink 
            to={`/category/tablet`} 
            className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}
            onClick={closeMenu}
          >
            Tablets
          </NavLink>
          <NavLink 
            to={`/category/notebook`} 
            className={({ isActive }) => isActive ? 'ActiveOption' : 'Option'}
            onClick={closeMenu}
          >
            Notebooks
          </NavLink>
          
          {/* CartWidget dentro del menú móvil */}
          <div className="CartWidget-mobile">
            <CartWidget />
          </div>
        </div>

        {/* CartWidget para desktop */}
        <div className="CartWidget-desktop">
          <CartWidget />
        </div>
      </div>
    </nav>
  )
}

export default NavBar