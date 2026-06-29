import { useContext } from "react"
import { CartContext } from "../../context/CartContext"
import './ItemCart.css'

const formatPrice = (price) =>
    new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0,
    }).format(price)

const ItemCart = ({ id, name, quantity, img, price }) => {
    const { deleteItem } = useContext(CartContext)

    return (
        <article className="ItemCart">
            <div className="ItemCart-product">
                <div className="ItemCart-imgWrap">
                    <img src={img} alt={name} className="ItemCart-img" />
                    <span className="ItemCart-badge">{quantity}</span>
                </div>
                <div className="ItemCart-info">
                    <h3 className="ItemCart-name">{name}</h3>
                    <span className="ItemCart-unit">{formatPrice(price)} c/u</span>
                </div>
            </div>

            <div className="ItemCart-qty" data-label="Cantidad">
                <span>{quantity}</span>
            </div>

            <div className="ItemCart-subtotal" data-label="Subtotal">
                {formatPrice(price * quantity)}
            </div>

            <button
                className="ItemCart-delete"
                onClick={() => deleteItem(id)}
                aria-label={`Quitar ${name} del carrito`}
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
                    <polyline points="3,6 5,6 21,6"></polyline>
                    <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </button>
        </article>
    )
}

export default ItemCart
