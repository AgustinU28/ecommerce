import { Link } from 'react-router-dom'
import './Footer.css'

const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="Footer">
      <div className="Footer-top">
        <div className="Footer-brand">
          <h3 className="Footer-logo">
            <span className="Footer-logo-icon">⚡</span> TechStore
          </h3>
          <p className="Footer-tagline">
            La mejor tecnología al mejor precio. Celulares, tablets y notebooks
            con envío a todo el país.
          </p>
          <div className="Footer-social">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" aria-label="Twitter">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22 5.8c-.7.3-1.5.6-2.3.7.8-.5 1.5-1.3 1.8-2.3-.8.5-1.7.8-2.6 1a4 4 0 0 0-6.9 3.7A11.4 11.4 0 0 1 3.8 4.6a4 4 0 0 0 1.2 5.4c-.6 0-1.2-.2-1.8-.5a4 4 0 0 0 3.2 4 4 4 0 0 1-1.8.1 4 4 0 0 0 3.7 2.8A8 8 0 0 1 2 18.6 11.3 11.3 0 0 0 8.1 20c7.4 0 11.5-6.2 11.5-11.5v-.5c.8-.6 1.5-1.3 2-2.2Z" />
              </svg>
            </a>
            <a href="https://wa.me/5491100000000" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M21 11.5a8.5 8.5 0 0 1-12.7 7.4L3 21l2.1-5.3A8.5 8.5 0 1 1 21 11.5Z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="Footer-col">
          <h4>Categorías</h4>
          <Link to="/category/celular">Celulares</Link>
          <Link to="/category/tablet">Tablets</Link>
          <Link to="/category/notebook">Notebooks</Link>
          <Link to="/">Ver todo</Link>
        </div>

        <div className="Footer-col">
          <h4>Ayuda</h4>
          <a href="#envios">Envíos y entregas</a>
          <a href="#devoluciones">Devoluciones</a>
          <a href="#pagos">Medios de pago</a>
          <a href="#contacto">Contacto</a>
        </div>

        <div className="Footer-col Footer-newsletter">
          <h4>Novedades</h4>
          <p>Suscribite y recibí ofertas exclusivas.</p>
          <form className="Footer-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Tu correo" aria-label="Correo electrónico" />
            <button type="submit">Unirme</button>
          </form>
        </div>
      </div>

      <div className="Footer-payments">
        <span>Pagá con</span>
        <div className="Footer-badges">
          <span>VISA</span>
          <span>Mastercard</span>
          <span>Amex</span>
          <span>Mercado Pago</span>
        </div>
      </div>

      <div className="Footer-bottom">
        <p>© {year} TechStore. Todos los derechos reservados.</p>
        <p>Hecho con 💜 por Agustín Uranga</p>
      </div>
    </footer>
  )
}

export default Footer
