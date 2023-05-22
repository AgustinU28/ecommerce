import { useState, createContext } from "react"

export const CartContext = createContext()

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([])
    console.log(cart)

    const addItem = (productToAdd) => {
        if(!isInCart(productToAdd.id)) {
            setCart(prev => {
            console.log(prev)
            return [...prev, productToAdd]
            })
        } else {
            console.error('pitini')
        }
    }

    const isInCart = (id) => cart.some(prod => id === prod.id)

    const deleteItem = (id) =>{
        const cartUpdate = cart.filter(prod => prod.id !== id)
        setCart(cartUpdate)
    }
    const getTotalQuantity = () => {
        let accu = 0

        cart.forEach(prod => {
        accu += prod.quantity
        })

        return accu
        }
    const getTotal = () => {
        let total = 0

        cart.forEach(prod => {
        total += prod.quantity * prod.price
        })

        return total
        }
    
    const total = getTotal()
    const totalQuantity = getTotalQuantity()

    const clearCart = () => {
        setCart([])
      }
    return (
        <CartContext.Provider value={{addItem, isInCart, totalQuantity, total, cart, clearCart, deleteItem}}>
            { children }
        </CartContext.Provider>
    )
} 