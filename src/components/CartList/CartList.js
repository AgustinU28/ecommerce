import ItemCart from '../ItemCart/ItemCart'
import './CartList.css'

const CartList = ({ cart }) => {
    const totalUnits = cart.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <div className="CartList">
            <div className="CartList-head">
                <span>Producto</span>
                <span className="col-center">Cantidad</span>
                <span className="col-center">Subtotal</span>
                <span className="col-center">Quitar</span>
            </div>

            <div className="CartList-items">
                {cart.map(prod => (
                    <ItemCart key={prod.id} {...prod} />
                ))}
            </div>

            <div className="CartList-summary">
                <span className="CartList-chip">
                    {cart.length} {cart.length === 1 ? 'artículo' : 'artículos'}
                </span>
                <span className="CartList-chip">
                    {totalUnits} {totalUnits === 1 ? 'unidad' : 'unidades'}
                </span>
            </div>
        </div>
    )
}

export default CartList
