import {useState} from 'react'
import { Button } from '@chakra-ui/react'
import './ItemCount.css'
const ItemCount = ({initial = 1 , stock, onConfirm}) => {
    const [quantity, setQuantity] = useState(initial) 
    const increment = () => {
        if(quantity < stock){
            setQuantity(prev => {     
                return prev +1    
            })
            }
    }

    const decrement = () => {
        if(quantity > 1){
        setQuantity(prev => prev -1)    
        }
    }

    const reset = () => {
        setQuantity(initial)
    }
    return (
        <div className="item-count">
        <div className="item-count__controls">
          <Button className="button" onClick={decrement}>-</Button>
          <h1 className="item-count__number">{quantity}</h1>
          <Button className="button" onClick={increment}>+</Button>
        </div>
        <Button className="button" onClick={reset}>Reset</Button>
        <Button className="button button--primary" onClick={() => onConfirm(quantity)}>Agregar al Carrito</Button>
      </div>

    )
}
export default ItemCount