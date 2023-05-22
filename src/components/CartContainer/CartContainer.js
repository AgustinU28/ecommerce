import { useContext, useEffect } from "react"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"
import { Center, Heading,Button} from "@chakra-ui/react"
import CartList from "../CartList/CartList"


const CartContainer = () =>{ 
    const {cart, total} = useContext(CartContext)
    console.log(cart)
        
    useEffect(()=>{
        document.title ='Carrito'
    }, [])
    
    if(cart.length === 0) {
        return (
            <Center mt={10} style={{minHeight:'68vh'}}>
                <Heading>
                    No hay productos en el carrito 
                </Heading>
            </Center>
        )
    }
    return(
        <div style={{minHeight:'73svh'}}>
            <Center mt='20px'>
                <Heading>
                    Tu carrito.. 
                </Heading>
            </Center>
            <CartList cart={cart}/>
            <Center gap={2} mt={5}>
                <Button colorScheme='green'>Total: ${total}</Button>
                <Link to='/checkout'><Button>Checkout</Button></Link>
            </Center>
        </div>
    )
}
export default CartContainer