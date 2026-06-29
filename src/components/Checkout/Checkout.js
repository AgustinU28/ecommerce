import { useContext, useState, useEffect } from "react"
import { CartContext } from "../../context/CartContext"
import { collection, query, where, documentId, getDocs, writeBatch, addDoc } from 'firebase/firestore'
import { db } from '../../services/firebase/firebaseConfig'
import { Link, useNavigate } from "react-router-dom"
import './Checkout.css'

const formatPrice = (price) =>
    new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0,
    }).format(price)

const initialForm = { name: '', email: '', emailConfirm: '', phone: '' }

const validateField = (name, value, form) => {
    switch (name) {
        case 'name':
            if (!value.trim()) return 'Ingresá tu nombre completo'
            if (value.trim().length < 3) return 'El nombre es demasiado corto'
            return ''
        case 'email':
            if (!value.trim()) return 'Ingresá tu correo'
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Correo inválido'
            return ''
        case 'emailConfirm':
            if (value !== form.email) return 'Los correos no coinciden'
            return ''
        case 'phone':
            if (!value.trim()) return 'Ingresá tu teléfono'
            if (!/^[\d\s+()-]{6,}$/.test(value)) return 'Teléfono inválido'
            return ''
        default:
            return ''
    }
}

const Checkout = () => {
    const [loading, setLoading] = useState(false)
    const [orderId, setOrderId] = useState('')
    const [error, setError] = useState('')
    const { cart, total, clearCart } = useContext(CartContext)
    const navigate = useNavigate()

    const [form, setForm] = useState(initialForm)
    const [errors, setErrors] = useState({})

    useEffect(() => {
        document.title = 'TechStore | Checkout'
    }, [])

    const handleChange = (event) => {
        const { name, value } = event.target
        setForm(prev => ({ ...prev, [name]: value }))
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: validateField(name, value, { ...form, [name]: value }) }))
        }
    }

    const handleBlur = (event) => {
        const { name, value } = event.target
        setErrors(prev => ({ ...prev, [name]: validateField(name, value, form) }))
    }

    const validateAll = () => {
        const newErrors = {}
        Object.keys(initialForm).forEach(key => {
            const msg = validateField(key, form[key], form)
            if (msg) newErrors[key] = msg
        })
        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const createOrder = async (event) => {
        event.preventDefault()
        setError('')

        if (!validateAll()) return
        if (cart.length === 0) {
            setError('Tu carrito está vacío.')
            return
        }

        setLoading(true)
        try {
            const objOrder = {
                buyer: { name: form.name, email: form.email, phone: form.phone },
                items: cart,
                total,
                date: new Date(),
            }

            const batch = writeBatch(db)
            const ids = cart.map(prod => prod.id)
            const productsRef = query(collection(db, 'products'), where(documentId(), 'in', ids))
            const productsAddedToCartFromFirestore = await getDocs(productsRef)
            const { docs } = productsAddedToCartFromFirestore

            const outOfStock = []

            docs.forEach(doc => {
                const dataDoc = doc.data()
                const stockDb = dataDoc.stock
                const productAddedToCart = cart.find(prod => prod.id === doc.id)
                const prodQuantity = productAddedToCart.quantity

                if (stockDb >= prodQuantity) {
                    batch.update(doc.ref, { stock: stockDb - prodQuantity })
                } else {
                    outOfStock.push({ id: doc.id, ...dataDoc })
                }
            })

            if (outOfStock.length === 0) {
                await batch.commit()
                const orderRef = collection(db, 'orders')
                const orderAdded = await addDoc(orderRef, objOrder)
                setOrderId(orderAdded.id)
                clearCart()
                setTimeout(() => navigate('/'), 6000)
            } else {
                setError('Algunos productos ya no tienen stock suficiente.')
            }
        } catch (err) {
            console.error(err)
            setError('Ocurrió un error al procesar tu orden. Intentá nuevamente.')
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="Checkout-state">
                <div className="Checkout-card-state">
                    <div className="app-spinner" />
                    <h2>Generando orden...</h2>
                    <p>Por favor esperá un momento</p>
                </div>
            </div>
        )
    }

    if (orderId) {
        return (
            <div className="Checkout-state">
                <div className="Checkout-card-state">
                    <div className="Checkout-success-icon">✓</div>
                    <h2>¡Compra exitosa!</h2>
                    <div className="Checkout-order-id">
                        <span>ID de tu orden</span>
                        <strong>{orderId}</strong>
                    </div>
                    <p>Te enviamos los detalles por correo. Serás redirigido al inicio…</p>
                    <Link to="/" className="Checkout-btn">Volver al inicio</Link>
                </div>
            </div>
        )
    }

    if (cart.length === 0) {
        return (
            <div className="Checkout-state">
                <div className="Checkout-card-state">
                    <div className="Checkout-empty-icon">🛒</div>
                    <h2>No hay nada para pagar</h2>
                    <p>Agregá productos a tu carrito antes de continuar.</p>
                    <Link to="/" className="Checkout-btn">Ir a la tienda</Link>
                </div>
            </div>
        )
    }

    const fields = [
        { name: 'name', label: 'Nombre completo', type: 'text', placeholder: 'Ej: Juan Pérez' },
        { name: 'email', label: 'Correo electrónico', type: 'email', placeholder: 'tu@email.com' },
        { name: 'emailConfirm', label: 'Confirmar correo', type: 'email', placeholder: 'Repetí tu correo' },
        { name: 'phone', label: 'Teléfono', type: 'tel', placeholder: '+54 11 1234-5678' },
    ]

    return (
        <div className="Checkout">
            <div className="Checkout-grid">
                {/* Formulario */}
                <form className="Checkout-form" onSubmit={createOrder} noValidate>
                    <h1 className="Checkout-title">Datos de envío</h1>
                    <p className="Checkout-subtitle">Completá tus datos para finalizar la compra</p>

                    {error && <div className="Checkout-alert">{error}</div>}

                    {fields.map(field => (
                        <div className="Checkout-field" key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            <input
                                id={field.name}
                                type={field.type}
                                name={field.name}
                                placeholder={field.placeholder}
                                value={form[field.name]}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                className={errors[field.name] ? 'has-error' : ''}
                                autoComplete="off"
                            />
                            {errors[field.name] && (
                                <span className="Checkout-error">{errors[field.name]}</span>
                            )}
                        </div>
                    ))}

                    <button type="submit" className="Checkout-submit">
                        Finalizar compra — {formatPrice(total)}
                    </button>
                    <p className="Checkout-secure">🔒 Tus datos están seguros y protegidos</p>
                </form>

                {/* Resumen */}
                <aside className="Checkout-summary">
                    <h2>Resumen del pedido</h2>
                    <ul className="Checkout-items">
                        {cart.map(item => (
                            <li key={item.id}>
                                <img src={item.img} alt={item.name} />
                                <div className="Checkout-item-info">
                                    <span className="Checkout-item-name">{item.name}</span>
                                    <span className="Checkout-item-qty">x{item.quantity}</span>
                                </div>
                                <span className="Checkout-item-price">
                                    {formatPrice(item.price * item.quantity)}
                                </span>
                            </li>
                        ))}
                    </ul>
                    <div className="Checkout-summary-row">
                        <span>Subtotal</span>
                        <span>{formatPrice(total)}</span>
                    </div>
                    <div className="Checkout-summary-row">
                        <span>Envío</span>
                        <span className="free">Gratis</span>
                    </div>
                    <div className="Checkout-summary-total">
                        <span>Total</span>
                        <strong>{formatPrice(total)}</strong>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Checkout
