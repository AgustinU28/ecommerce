import { Button, Image, Text} from "@chakra-ui/react"
import { useContext } from "react"
import { CartContext } from "../../context/CartContext"

const ItemCart = ({id, name, quantity, img, price}) =>{

    const {deleteItem} = useContext(CartContext)
    return(
        <article className="ItemCart">
            <Image src={img} alt={name} boxSize='115px' objectFit='cover' borderRadius='lg'/>
            <div className="titleCart">
                <strong>Nombre</strong>
                <Text>{name}</Text>
            </div>
            <div className="titleCart">
                <strong>Cantidad</strong>
                <strong>{quantity}</strong>
            </div>
            <div className="titleCart">
                <strong>Precio</strong>
                <strong>${price * quantity}</strong>
            </div>
            <Button  onClick={() => deleteItem(id)}><img style={{height:'25px'}} src="./Images/delete.png" alt="delete"/></Button>
        </article>
    )
}
export default ItemCart