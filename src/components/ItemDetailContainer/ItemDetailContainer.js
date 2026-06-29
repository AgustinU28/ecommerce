import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'
import ItemDetail from '../ItemDetail/ItemDetail'
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig'
import './ItemDetailContainer.css';

const ItemDetailContainer = () => {
    const [product, setProduct] = useState(null)
    const [loading, setLoading] = useState(true)
    const { productId } = useParams();

    useEffect(() => {
        document.title = 'TechStore | Detalle'
    }, [])

    useEffect(() => {
        setLoading(true)
        const docRef = doc(db, 'products', productId)
        getDoc(docRef).then(doc => {
            if (doc.exists()) {
                setProduct({ id: doc.id, ...doc.data() })
            } else {
                setProduct(null)
            }
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }, [productId])

    if (loading) {
        return (
            <div className="item-detail-container">
                <div className="app-spinner" />
                <p className="detail-loading-text">Cargando producto...</p>
            </div>
        )
    }

    if (!product) {
        return (
            <div className="item-detail-container">
                <span className="detail-empty-icon">😕</span>
                <h2>Producto no encontrado</h2>
                <Link to="/" className="detail-back-link">Volver al inicio</Link>
            </div>
        )
    }

    return (
        <div className="item-detail-container">
            <nav className="detail-breadcrumb">
                <Link to="/">Inicio</Link>
                <span>/</span>
                {product.category && (
                    <>
                        <Link to={`/category/${product.category}`}>{product.category}</Link>
                        <span>/</span>
                    </>
                )}
                <span className="current">{product.name}</span>
            </nav>
            <ItemDetail {...product} />
        </div>
    )
}

export default ItemDetailContainer
