import { useContext, useState, useEffect } from "react"
import { CartContext } from "../../context/CartContext"
import {collection, query, where, documentId, getDocs, writeBatch, addDoc} from 'firebase/firestore'
import { db } from '../../services/firebase/firebaseConfig'
import { Center, Heading, 
    Input,
    Card,
    Button, 
    FormLabel} from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"

    
    const Checkout = () => {
        const [loading, setLoading] = useState(false)
        const [orderId, setOrderId] = useState('')
        const { cart, total, clearCart } = useContext(CartContext)
        const navigate = useNavigate()
        const [ info, setInfo] = useState()
        
         const [mensaje, setMensaje] = useState('')
        useEffect(()=>{
            document.title ='Checkout'
        }, [])
        const handleChange = (event) => {
            const { name, value } = event.target;
            setInfo({ ...info, [name]: value });
        }
        const createOrder = async (event) => {
            event.preventDefault();
            setLoading(true)
            try {
                const objOrder = {
                    buyer: info,
                    items: cart,
                    total
                }
        
                const batch = writeBatch(db)
        
                const ids = cart.map(prod => prod.id)
                console.log(ids)
        
                const productsRef = query(collection(db, 'products'), where(documentId(), 'in', ids))
        
                 getDocs(productsRef).then(productsAddedToCartFromFirestore => {
        
                 })
        
                const productsAddedToCartFromFirestore = await getDocs(productsRef)
                const { docs } = productsAddedToCartFromFirestore
        
                const outOfStock = []
        
                docs.forEach(doc => {
                    const dataDoc = doc.data()
                    const stockDb = dataDoc.stock
        
                    const productAddedToCart = cart.find(prod => prod.id === doc.id)
                    const prodQuantity = productAddedToCart.quantity
        
                    if(stockDb >= prodQuantity) {
                        batch.update(doc.ref, { stock: stockDb - prodQuantity})
                    } else {
                        outOfStock.push({ id: doc.id, ...dataDoc})
                    }
                })
        
                if(outOfStock.length === 0) {
                    await batch.commit()
        
                    const orderRef = collection(db, 'orders')
        
                    const orderAdded = await addDoc(orderRef, objOrder)
        
                    const { id } = orderAdded
                    setOrderId(id)
    
                    clearCart()
    
                    setTimeout(() => {
                        navigate('/')
                    }, 5000)
    
                    console.log(id)
                } else {
                    <Center>
                        Hay productos fuera de stock
                    </Center>
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
    
            
        }
    
        if(loading) {
            return (
            <Center style={{minHeight:'75vh'}}>
                <Heading>
                Generando orden...
                </Heading>
            </Center>
            )
        }
    
        if(orderId) {
            return (
                <Center style={{minHeight:'75vh'}}>
                    <Heading>
                        El Id de su compra es: {orderId}
                    </Heading>
                </Center>
            )
        }
    
        
    
    return(
        <div style={{ 
            minHeight: '75vh', 
            backgroundColor: '#f5f5f5', 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center' }}>
            
            <form style={{ 
              backgroundColor: '#fff', 
              padding: '50px', 
              borderRadius: '5px', 
              boxShadow: '0 0 10px rgba(0, 0, 0, 0.2)' 
            }} onSubmit={createOrder}>
              
              <h2 style={{ 
                fontSize: '24px', 
                marginBottom: '30px' 
              }}>Formulario</h2>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontWeight: 'bold' }}>Nombre</label>
                <input  
                  style={{ 
                    display: 'block', 
                    width: '100%', 
                    padding: '10px', 
                    borderRadius: '5px', 
                    border: '1px solid #ccc' 
                  }} 
                  type="text" 
                  name='name' 
                  placeholder='Ingrese su nombre'
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontWeight: 'bold' }}>Email</label>
                <input 
                  style={{ 
                    display: 'block', 
                    width: '100%', 
                    padding: '10px', 
                    borderRadius: '5px', 
                    border: '1px solid #ccc' 
                  }} 
                  type="email" 
                  name='email' 
                  placeholder='Ingrese su Email'
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontWeight: 'bold' }}>Teléfono</label>
                <input 
                  style={{ 
                    display: 'block', 
                    width: '100%', 
                    padding: '10px', 
                    borderRadius: '5px', 
                    border: '1px solid #ccc' 
                  }} 
                  type="phone" 
                  name='phone' 
                  placeholder='Ingrese su Teléfono'
                  onChange={handleChange}
                  required
                />
              </div>
              
              <button 
                style={{ 
                  display: 'block', 
                  width: '100%', 
                  padding: '10px', 
                  backgroundColor: '#4caf50', 
                  color: '#fff', 
                  borderRadius: '5px', 
                  border: 'none',
                  cursor: 'pointer'
                }} 
                type='submit' 
              >
                Enviar
              </button>    
            </form>
          </div>
          
    )
}
export default Checkout