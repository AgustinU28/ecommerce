import ItemCart from '../ItemCart/ItemCart'

const CartList = ({ cart }) => {
    return (
        <div style={{
            background: 'transparent',
            padding: '0',
            margin: '0'
        }}>
            {/* Header de la lista */}
            <div style={{
                background: 'white',
                margin: '0 20px 20px 20px',
                padding: '20px 30px',
                borderRadius: '16px',
                boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
                border: '1px solid rgba(102, 126, 234, 0.1)'
            }}>
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: '120px 1fr 120px 120px 60px',
                    gap: '20px',
                    alignItems: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#667eea',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                }}>
                    <div style={{ textAlign: 'center' }}>Producto</div>
                    <div>Detalles</div>
                    <div style={{ textAlign: 'center' }}>Cantidad</div>
                    <div style={{ textAlign: 'center' }}>Subtotal</div>
                    <div style={{ textAlign: 'center' }}>Acción</div>
                </div>
            </div>
            
            {/* Lista de productos */}
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0'
            }}>
                {cart.map(prod => (
                    <ItemCart 
                        key={prod.id} 
                        {...prod}
                    />
                ))}
            </div>
            
            {/* Resumen visual */}
            <div style={{
                background: 'linear-gradient(135deg, #f8f9ff 0%, #e8ecff 100%)',
                margin: '20px 20px 0 20px',
                padding: '25px',
                borderRadius: '16px',
                border: '2px dashed #667eea',
                textAlign: 'center'
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '15px',
                    flexWrap: 'wrap'
                }}>
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'white',
                        padding: '10px 20px',
                        borderRadius: '25px',
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.1)'
                    }}>
                        <span style={{
                            fontSize: '20px'
                        }}>📦</span>
                        <span style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#333'
                        }}>
                            {cart.length} {cart.length === 1 ? 'artículo' : 'artículos'}
                        </span>
                    </div>
                    
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        background: 'white',
                        padding: '10px 20px',
                        borderRadius: '25px',
                        boxShadow: '0 4px 12px rgba(102, 126, 234, 0.1)'
                    }}>
                        <span style={{
                            fontSize: '20px'
                        }}>🧮</span>
                        <span style={{
                            fontSize: '16px',
                            fontWeight: '600',
                            color: '#333'
                        }}>
                            {cart.reduce((total, item) => total + item.quantity, 0)} unidades
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartList

