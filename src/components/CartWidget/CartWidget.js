import { Link } from "react-router-dom";

const CartWidget = ({totalQuantity})=>{
    return(
        <div className="cartWidget">
            <Link to='/cart' className="logoCart">
                <img src='./Images/shopping-cart.png' alt='Cart' width='35px'/>{totalQuantity}
            </Link>
        </div>
    )
}
export default CartWidget;