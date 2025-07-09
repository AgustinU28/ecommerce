import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import CartWidget from '../CartWidget/CartWidget'
import './Navbar.css'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <nav className="NavBar">
      <div className="NavBar-container">
        <h3 onClick={() => navigate('/')}>Tienda de Tecnologia</h3>
        
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