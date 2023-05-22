import { Link } from "react-router-dom"
import { useContext, useState } from "react"
import ItemCount from "../ItemCount/ItemCount"
import { CartContext } from "../../context/CartContext"
import { Card, CardHeader, CardBody, CardFooter, Heading,Divider,Text, Center } from '@chakra-ui/react'
import { Image } from '@chakra-ui/react'
import { NotificationContext } from '../../notification/NotificationService'
import './ItemDetail.css'



const ItemDetail = ({ id, name, category, img, price, stock, description}) => {
    const [quantity, setQuantity] = useState(0)
    const { addItem, isInCart} = useContext(CartContext)
    const setNotification = useContext(NotificationContext)
    console.log(quantity)


    const handleOnAdd = (quantity) => {
        console.log('agregue al carrito: ', quantity)   

        setQuantity(parseInt(quantity))   
        setNotification(`Se agrego correctamente ${quantity} ${name}`, 5)        
        addItem({ id, name, price, quantity, img})
        
    }

    return (
        <div style={{ padding: '20px', margin: '20px' }}>
        <Card minW='xs' maxW='sm'>
          <CardHeader bg='gray.50' p={4}>
            <Heading size='md'>
              {name}
            </Heading>
          </CardHeader>
          <CardBody>
            <Center mb={4}>           
              <Image src={img} alt={name} borderRadius='lg' boxSize='250px' boxShadow='md' />
            </Center>
            <Divider h='2px' bg='gray.200' my={4} />
            <Center mb={4}>
              <Text color='blue.600' fontSize='1.5rem'>
                ${price}
              </Text>
            </Center>
            <Center mb={4}>
              <Text fontSize='1rem'>
                {category}
              </Text>
            </Center>
            <Center mb={4}>
              <Text fontSize='1rem'>
                {description}
              </Text>
            </Center>
            <CardFooter bg='gray.50' p={4}>
              {
                isInCart(id) ? (
                  <Link to='/cart' bg='blue.600' color='white' py={2} px={4} borderRadius='md'>Terminar compra</Link>    
                ) : (
                  <ItemCount stock={stock} onConfirm={handleOnAdd} className='ItemCount'/>
                )
              }
            </CardFooter>
          </CardBody>
        </Card>
      </div>
      
    )
}
export default ItemDetail