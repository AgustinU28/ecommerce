import { useContext, useEffect } from "react"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"
import CartList from "../CartList/CartList"
import './CartContainer.css'

const CartContainer = () => { 
    const { cart, total } = useContext(CartContext)
    
    useEffect(() => {
        document.title = 'Carrito'
    }, [])
    
    if (cart.length === 0) {
        return (
            <div className="cart-container">
                <div className="empty-cart">
                    <div className="empty-cart-icon">
                        {/* Reemplazar emoji por SVG */}
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17M17 13v0a2 2 0 0 1 2 2v0a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v0a2 2 0 0 1 2-2h8Z"/>
                            <circle cx="9" cy="20" r="1"/>
                            <circle cx="20" cy="20" r="1"/>
                        </svg>
                    </div>
                    <h2 className="empty-cart-title">Tu carrito está vacío</h2>
                    <p className="empty-cart-subtitle">
                        ¡Agrega algunos productos para comenzar!
                    </p>
                    <Link to="/" className="continue-shopping-btn">
                        <span>Seguir comprando</span>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                    </Link>
                </div>
            </div>
        )
    }

    const formatPrice = (price) => {
        return new Intl.NumberFormat('es-AR', {
            style: 'currency',
            currency: 'ARS'
        }).format(price)
    }

    return (
        <div className="cart-container">
            {/* Header del carrito */}
            <div className="cart-header">
                <div className="cart-header-icon">
                    {/* Reemplazar emoji por SVG */}
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M19 7h-3V6a4 4 0 0 0-8 0v1H5a1 1 0 0 0-1 1v11a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V8a1 1 0 0 0-1-1ZM10 6a2 2 0 0 1 4 0v1h-4V6Zm8 15a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V9h2v1a1 1 0 0 0 2 0V9h4v1a1 1 0 0 0 2 0V9h2v12Z"/>
                    </svg>
                </div>
                <h1 className="cart-header-title">Tu Carrito</h1>
                <p className="cart-header-subtitle">
                    {cart.length} {cart.length === 1 ? 'producto' : 'productos'} en tu carrito
                </p>
            </div>

            {/* Lista de productos */}
            <div className="cart-content">
                <CartList cart={cart} />
            </div>

            {/* Footer con total y checkout */}
            <div className="cart-footer">
                <div className="cart-summary">
                    <div className="total-section">
                        <span className="total-label">Total:</span>
                        <span className="total-amount">{formatPrice(total)}</span>
                    </div>
                    
                    <div className="cart-actions">
                        <Link to="/" className="continue-shopping-btn secondary">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 12H5M12 19l-7-7 7-7"/>
                            </svg>
                            <span>Seguir comprando</span>
                        </Link>
                        
                        <Link to="/checkout" className="checkout-btn">
                            <span>Proceder al pago</span>
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Badge de seguridad */}
            <div className="security-badge">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                    <path d="M9 12l2 2 4-4"/>
                </svg>
                <span>Compra 100% segura</span>
            </div>
        </div>
    )
}

export default CartContainer