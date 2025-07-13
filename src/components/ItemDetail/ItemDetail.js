import { Link } from "react-router-dom"
import { useContext } from "react"
import ItemCount from "../ItemCount/ItemCount"
import { CartContext } from "../../context/CartContext"
import { useNotification } from '../../notification/NotificationService'
import './ItemDetail.css'

const ItemDetail = ({ id, name, category, img, price, stock, description }) => {
    const { addItem, isInCart } = useContext(CartContext)
    const { showNotification } = useNotification()

    const handleOnAdd = (quantity) => {
        showNotification(`Se agregó correctamente ${quantity} ${name}`, 'success', 5)        
        addItem({ id, name, price, quantity, img })
    }

    return (
        <div className="ItemDetail-container">
            <div className="CardItemDetail">
                <div className="ItemHeader">
                    <h2>{name}</h2>
                </div>
                
                <div className="ProductInfo">
                    <div className="ProductImage">
                        <img src={img} alt={name} />
                    </div>
                    
                    <div className="ProductDetails">
                        <div>
                            <span className="ProductCategory">{category}</span>
                            <div className="ProductPrice">${price}</div>
                            <p className="ProductDescription">{description}</p>
                        </div>
                        
                        <div className="ItemFooter">
                            {isInCart(id) ? (
                                <Link to='/cart' className="Button">Terminar compra</Link>    
                            ) : (
                                <ItemCount stock={stock} onConfirm={handleOnAdd} />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail