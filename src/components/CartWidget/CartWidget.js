import { Link } from "react-router-dom";
import './CartWidget.css';

const CartWidget = ({ totalQuantity = 0 }) => {
    return (
        <div className="cartWidget">
            <Link to='/cart' className="logoCart" data-empty={totalQuantity === 0}>
                {/* Ícono SVG del carrito */}
                <svg 
                    className="cart-icon" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2"
                >
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                
                {/* Texto del carrito */}
                <span className="cart-text">Carrito</span>
                
                {/* Contador de productos */}
                {totalQuantity > 0 && (
                    <span className="cart-count">
                        {totalQuantity > 99 ? '99+' : totalQuantity}
                    </span>
                )}
            </Link>
        </div>
    );
};

export default CartWidget;