import { useContext, useEffect } from "react"
import { CartContext } from "../../context/CartContext"
import { Link } from "react-router-dom"
import { Center, Heading, Button } from "@chakra-ui/react"
import CartList from "../CartList/CartList"

const CartContainer = () => { 
    const {cart, total} = useContext(CartContext)
    console.log(cart)
        
    useEffect(() => {
        document.title = 'Carrito'
    }, [])
    
    if(cart.length === 0) {
        return (
            <div style={{
                minHeight: '68vh',
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
                        opacity: '0.6'
                    }}>
                        🛒
                    </div>
                    <Heading 
                        size="lg" 
                        color="gray.600"
                        style={{
                            fontWeight: '300',
                            marginBottom: '20px'
                        }}
                    >
                        Tu carrito está vacío
                    </Heading>
                    <p style={{
                        color: '#666',
                        marginBottom: '30px',
                        fontSize: '16px'
                    }}>
                        ¡Agrega algunos productos para comenzar!
                    </p>
                    <Link to="/">
                        <Button 
                            colorScheme="blue" 
                            size="lg"
                            style={{
                                borderRadius: '25px',
                                padding: '12px 30px',
                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                border: 'none',
                                fontWeight: '500'
                            }}
                        >
                            Seguir comprando
                        </Button>
                    </Link>
                </div>
            </div>
        )
    }

    return(
        <div style={{
            minHeight: '73vh',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            padding: '20px 0'
        }}>
            {/* Header del carrito */}
            <div style={{
                background: 'white',
                margin: '0 auto 30px',
                maxWidth: '1200px',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                padding: '30px',
                textAlign: 'center'
            }}>
                <div style={{
                    fontSize: '2.5rem',
                    marginBottom: '10px'
                }}>
                    🛍️
                </div>
                <Heading 
                    size="xl"
                    style={{
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: '600'
                    }}
                >
                    Tu Carrito
                </Heading>
                <p style={{
                    color: '#666',
                    marginTop: '10px',
                    fontSize: '16px'
                }}>
                    {cart.length} {cart.length === 1 ? 'producto' : 'productos'} en tu carrito
                </p>
            </div>

            {/* Lista de productos */}
            <div style={{
                maxWidth: '1200px',
                margin: '0 auto'
            }}>
                <CartList cart={cart}/>
            </div>

            {/* Footer con total y checkout */}
            <div style={{
                background: 'white',
                margin: '30px auto 0',
                maxWidth: '1200px',
                borderRadius: '15px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
                padding: '30px'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '20px'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '15px'
                    }}>
                        <span style={{
                            fontSize: '18px',
                            fontWeight: '500',
                            color: '#333'
                        }}>
                            Total:
                        </span>
                        <span style={{
                            fontSize: '28px',
                            fontWeight: '700',
                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            ${total}
                        </span>
                    </div>
                    
                    <div style={{
                        display: 'flex',
                        gap: '15px',
                        alignItems: 'center'
                    }}>
                        <Link to="/">
                            <Button 
                                variant="outline"
                                size="lg"
                                style={{
                                    borderRadius: '25px',
                                    padding: '12px 25px',
                                    borderColor: '#667eea',
                                    color: '#667eea',
                                    fontWeight: '500'
                                }}
                            >
                                Seguir comprando
                            </Button>
                        </Link>
                        <Link to='/checkout'>
                            <Button 
                                size="lg"
                                style={{
                                    borderRadius: '25px',
                                    padding: '12px 30px',
                                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                    border: 'none',
                                    fontWeight: '500',
                                    fontSize: '16px',
                                    boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                                }}
                            >
                                Proceder al pago 🚀
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartContainer