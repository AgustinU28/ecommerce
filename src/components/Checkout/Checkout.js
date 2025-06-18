import { useContext, useState, useEffect } from "react"
import { CartContext } from "../../context/CartContext"
import {collection, query, where, documentId, getDocs, writeBatch, addDoc} from 'firebase/firestore'
import { db } from '../../services/firebase/firebaseConfig'
import { Center, Heading } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom"

const Checkout = () => {
    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState('')
    const { cart, total, clearCart } = useContext(CartContext)
    const navigate = useNavigate()
    const [info, setInfo] = useState()
    
    const [mensaje, setMensaje] = useState('')
    
    useEffect(() => {
        document.title = 'Checkout'
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
            <div style={{
                minHeight: '75vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    padding: '60px 40px',
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    textAlign: 'center',
                    maxWidth: '400px',
                    width: '100%'
                }}>
                    <div style={{
                        width: '60px',
                        height: '60px',
                        border: '4px solid #f3f3f3',
                        borderTop: '4px solid #667eea',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 20px'
                    }}></div>
                    <Heading size="lg" color="gray.600" style={{fontWeight: '300'}}>
                        Generando orden...
                    </Heading>
                    <p style={{
                        color: '#666',
                        marginTop: '10px',
                        fontSize: '14px'
                    }}>
                        Por favor espera un momento
                    </p>
                    <style>{`
                        @keyframes spin {
                            0% { transform: rotate(0deg); }
                            100% { transform: rotate(360deg); }
                        }
                    `}</style>
                </div>
            </div>
        )
    }

    if(orderId) {
        return (
            <div style={{
                minHeight: '75vh',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px'
            }}>
                <div style={{
                    backgroundColor: 'white',
                    padding: '60px 40px',
                    borderRadius: '20px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    textAlign: 'center',
                    maxWidth: '500px',
                    width: '100%'
                }}>
                    <div style={{
                        fontSize: '4rem',
                        marginBottom: '20px',
                        animation: 'bounce 1s ease-in-out'
                    }}>
                        ✅
                    </div>
                    <Heading size="lg" color="gray.700" style={{
                        fontWeight: '600',
                        marginBottom: '20px'
                    }}>
                        ¡Compra exitosa!
                    </Heading>
                    <div style={{
                        background: '#f8f9ff',
                        padding: '20px',
                        borderRadius: '12px',
                        marginBottom: '20px',
                        border: '2px dashed #667eea'
                    }}>
                        <p style={{
                            color: '#666',
                            marginBottom: '10px',
                            fontSize: '14px'
                        }}>
                            ID de tu orden:
                        </p>
                        <p style={{
                            fontSize: '18px',
                            fontWeight: '600',
                            color: '#667eea',
                            fontFamily: 'monospace',
                            letterSpacing: '1px'
                        }}>
                            {orderId}
                        </p>
                    </div>
                    <p style={{
                        color: '#666',
                        fontSize: '14px',
                        marginBottom: '20px'
                    }}>
                        Serás redirigido automáticamente en unos segundos...
                    </p>
                    <div style={{
                        width: '100%',
                        height: '4px',
                        background: '#f0f0f0',
                        borderRadius: '2px',
                        overflow: 'hidden'
                    }}>
                        <div style={{
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                            animation: 'progress 5s linear'
                        }}></div>
                    </div>
                    <style>{`
                        @keyframes bounce {
                            0%, 20%, 60%, 100% { transform: translateY(0); }
                            40% { transform: translateY(-10px); }
                            80% { transform: translateY(-5px); }
                        }
                        @keyframes progress {
                            from { width: 0%; }
                            to { width: 100%; }
                        }
                    `}</style>
                </div>
            </div>
        )
    }

    return(
        <div style={{ 
            minHeight: '75vh', 
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            padding: '20px'
        }}>
            
            <form style={{ 
                backgroundColor: '#fff', 
                padding: '50px 40px', 
                borderRadius: '20px', 
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
                maxWidth: '500px',
                width: '100%',
                position: 'relative',
                overflow: 'hidden'
            }} onSubmit={createOrder}>
                
                {/* Decoración de fondo */}
                <div style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    right: '0',
                    height: '6px',
                    background: 'linear-gradient(90deg, #667eea, #764ba2)',
                    borderRadius: '20px 20px 0 0'
                }}></div>
                
                <div style={{
                    textAlign: 'center',
                    marginBottom: '40px'
                }}>
                    <div style={{
                        fontSize: '2.5rem',
                        marginBottom: '15px'
                    }}>
                        📝
                    </div>
                    <h2 style={{ 
                        fontSize: '28px', 
                        marginBottom: '10px',
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: '600'
                    }}>
                        Datos de envío
                    </h2>
                    <p style={{
                        color: '#666',
                        fontSize: '14px'
                    }}>
                        Completa tus datos para finalizar la compra
                    </p>
                </div>
                
                <div style={{ marginBottom: '25px' }}>
                    <label style={{ 
                        fontWeight: '600',
                        color: '#333',
                        fontSize: '14px',
                        display: 'block',
                        marginBottom: '8px'
                    }}>
                        👤 Nombre completo
                    </label>
                    <input  
                        style={{ 
                            display: 'block', 
                            width: '100%', 
                            padding: '15px 20px', 
                            borderRadius: '12px', 
                            border: '2px solid #e2e8f0',
                            fontSize: '16px',
                            transition: 'all 0.3s ease',
                            outline: 'none',
                            boxSizing: 'border-box'
                        }} 
                        type="text" 
                        name='name' 
                        placeholder='Ingresa tu nombre completo'
                        onChange={handleChange}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#667eea';
                            e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#e2e8f0';
                            e.target.style.boxShadow = 'none';
                        }}
                        required
                    />
                </div>
                
                <div style={{ marginBottom: '25px' }}>
                    <label style={{ 
                        fontWeight: '600',
                        color: '#333',
                        fontSize: '14px',
                        display: 'block',
                        marginBottom: '8px'
                    }}>
                        📧 Correo electrónico
                    </label>
                    <input 
                        style={{ 
                            display: 'block', 
                            width: '100%', 
                            padding: '15px 20px', 
                            borderRadius: '12px', 
                            border: '2px solid #e2e8f0',
                            fontSize: '16px',
                            transition: 'all 0.3s ease',
                            outline: 'none',
                            boxSizing: 'border-box'
                        }} 
                        type="email" 
                        name='email' 
                        placeholder='tu@email.com'
                        onChange={handleChange}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#667eea';
                            e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#e2e8f0';
                            e.target.style.boxShadow = 'none';
                        }}
                        required
                    />
                </div>
                
                <div style={{ marginBottom: '35px' }}>
                    <label style={{ 
                        fontWeight: '600',
                        color: '#333',
                        fontSize: '14px',
                        display: 'block',
                        marginBottom: '8px'
                    }}>
                        📱 Teléfono
                    </label>
                    <input 
                        style={{ 
                            display: 'block', 
                            width: '100%', 
                            padding: '15px 20px', 
                            borderRadius: '12px', 
                            border: '2px solid #e2e8f0',
                            fontSize: '16px',
                            transition: 'all 0.3s ease',
                            outline: 'none',
                            boxSizing: 'border-box'
                        }} 
                        type="tel" 
                        name='phone' 
                        placeholder='+54 11 1234-5678'
                        onChange={handleChange}
                        onFocus={(e) => {
                            e.target.style.borderColor = '#667eea';
                            e.target.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
                        }}
                        onBlur={(e) => {
                            e.target.style.borderColor = '#e2e8f0';
                            e.target.style.boxShadow = 'none';
                        }}
                        required
                    />
                </div>
                
                <button 
                    style={{ 
                        display: 'block', 
                        width: '100%', 
                        padding: '16px 30px', 
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        color: '#fff', 
                        borderRadius: '12px', 
                        border: 'none',
                        cursor: 'pointer',
                        fontSize: '16px',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                    }} 
                    type='submit'
                    onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.6)';
                    }}
                    onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = '0 4px 15px rgba(102, 126, 234, 0.4)';
                    }}
                >
                    Finalizar compra 🚀
                </button>
                
                <div style={{
                    textAlign: 'center',
                    marginTop: '20px',
                    padding: '15px',
                    background: '#f8f9ff',
                    borderRadius: '8px',
                    border: '1px solid #e2e8f0'
                }}>
                    <p style={{
                        color: '#666',
                        fontSize: '13px',
                        margin: '0'
                    }}>
                        🔒 Tus datos están seguros y protegidos
                    </p>
                </div>
            </form>
        </div>
    )
}

export default Checkout