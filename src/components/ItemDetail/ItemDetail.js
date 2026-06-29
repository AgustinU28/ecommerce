import { Link } from "react-router-dom"
import { useContext } from "react"
import ItemCount from "../ItemCount/ItemCount"
import { CartContext } from "../../context/CartContext"
import { useNotification } from '../../notification/NotificationService'
import './ItemDetail.css'

const formatPrice = (price) =>
    new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0,
    }).format(price)

const ItemDetail = ({ id, name, category, img, price, stock, description }) => {
    const { addItem, isInCart } = useContext(CartContext)
    const { showNotification } = useNotification()

    const handleOnAdd = (quantity) => {
        showNotification(`Se agregó correctamente ${quantity} ${name}`, 'success', 5)
        addItem({ id, name, price, quantity, img })
    }

    return (
        <div className="Detail-card">
            <div className="Detail-media">
                <img src={img} alt={name} />
            </div>

            <div className="Detail-info">
                {category && <span className="Detail-category">{category}</span>}
                <h1 className="Detail-name">{name}</h1>

                <div className="Detail-price">{formatPrice(price)}</div>

                <div className={`Detail-stock ${stock > 0 ? 'in' : 'out'}`}>
                    <span className="dot" />
                    {stock > 0 ? `En stock (${stock} disponibles)` : 'Sin stock'}
                </div>

                <p className="Detail-description">{description}</p>

                <ul className="Detail-perks">
                    <li>🚚 Envío gratis a todo el país</li>
                    <li>💳 Hasta 12 cuotas sin interés</li>
                    <li>🛡️ Garantía oficial 12 meses</li>
                </ul>

                <div className="Detail-action">
                    {isInCart(id) ? (
                        <Link to='/cart' className="Detail-btn">Terminar compra →</Link>
                    ) : stock > 0 ? (
                        <ItemCount stock={stock} onConfirm={handleOnAdd} />
                    ) : (
                        <button className="Detail-btn disabled" disabled>Producto agotado</button>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ItemDetail
