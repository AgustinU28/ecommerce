import { Button, Image, Text } from "@chakra-ui/react"
import { useContext } from "react"
import { CartContext } from "../../context/CartContext"

const ItemCart = ({id, name, quantity, img, price}) => {
    const {deleteItem} = useContext(CartContext)
    
    return(
        <article style={{
            display: 'flex',
            alignItems: 'center',
            background: 'white',
            borderRadius: '16px',
            padding: '20px',
            margin: '0 20px 20px 20px',
            boxShadow: '0 8px 25px rgba(0,0,0,0.08)',
            border: '1px solid rgba(102, 126, 234, 0.1)',
            transition: 'all 0.3s ease',
            position: 'relative',
            overflow: 'hidden'
        }}
        onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 12px 35px rgba(0,0,0,0.12)';
            e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.2)';
        }}
        onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.08)';
            e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.1)';
        }}>
            
            {/* Decoración lateral */}
            <div style={{
                position: 'absolute',
                left: '0',
                top: '0',
                bottom: '0',
                width: '4px',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                borderRadius: '0 2px 2px 0'
            }}></div>
            
            {/* Imagen del producto */}
            <div style={{
                marginLeft: '10px',
                marginRight: '20px',
                position: 'relative'
            }}>
                <Image 
                    src={img} 
                    alt={name} 
                    boxSize='100px' 
                    objectFit='cover' 
                    borderRadius='12px'
                    style={{
                        border: '2px solid #f0f0f0',
                        transition: 'all 0.3s ease'
                    }}
                />
                <div style={{
                    position: 'absolute',
                    top: '-8px',
                    right: '-8px',
                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                    color: 'white',
                    borderRadius: '50%',
                    width: '24px',
                    height: '24px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.4)'
                }}>
                    {quantity}
                </div>
            </div>
            
            {/* Información del producto */}
            <div style={{
                flex: '1',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
                gap: '20px',
                alignItems: 'center',
                marginRight: '20px'
            }}>
                
                {/* Nombre del producto */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px'
                }}>
                    <span style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#667eea',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        Producto
                    </span>
                    <Text style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: '#333',
                        lineHeight: '1.3'
                    }}>
                        {name}
                    </Text>
                </div>
                
                {/* Cantidad */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    alignItems: 'center'
                }}>
                    <span style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#667eea',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        Cantidad
                    </span>
                    <div style={{
                        background: 'linear-gradient(45deg, #f8f9ff, #e8ecff)',
                        padding: '8px 16px',
                        borderRadius: '20px',
                        border: '2px solid #667eea',
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#667eea',
                        minWidth: '50px',
                        textAlign: 'center'
                    }}>
                        {quantity}
                    </div>
                </div>
                
                {/* Precio */}
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                    alignItems: 'center'
                }}>
                    <span style={{
                        fontSize: '12px',
                        fontWeight: '600',
                        color: '#667eea',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px'
                    }}>
                        Subtotal
                    </span>
                    <div style={{
                        fontSize: '20px',
                        fontWeight: '700',
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px'
                    }}>
                        <span style={{
                            fontSize: '14px',
                            opacity: '0.7'
                        }}>$</span>
                        {price * quantity}
                    </div>
                </div>
            </div>
            
            {/* Botón de eliminar */}
            <Button 
                onClick={() => deleteItem(id)}
                style={{
                    background: 'linear-gradient(45deg, #ff6b6b, #ee5a52)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    padding: '12px',
                    minWidth: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 12px rgba(255, 107, 107, 0.3)'
                }}
                onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.05)';
                    e.target.style.boxShadow = '0 6px 16px rgba(255, 107, 107, 0.4)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)';
                    e.target.style.boxShadow = '0 4px 12px rgba(255, 107, 107, 0.3)';
                }}
            >
                <svg 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2.5"
                >
                    <polyline points="3,6 5,6 21,6"></polyline>
                    <path d="m19,6v14a2,2 0 0,1 -2,2H7a2,2 0 0,1 -2,-2V6m3,0V4a2,2 0 0,1 2,-2h4a2,2 0 0,1 2,2v2"></path>
                    <line x1="10" y1="11" x2="10" y2="17"></line>
                    <line x1="14" y1="11" x2="14" y2="17"></line>
                </svg>
            </Button>
            
            {/* Efecto de hover decorativo */}
            <div style={{
                position: 'absolute',
                top: '0',
                left: '0',
                right: '0',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, #667eea, #764ba2, transparent)',
                opacity: '0',
                transition: 'opacity 0.3s ease'
            }}></div>
        </article>
    )
}

export default ItemCart



