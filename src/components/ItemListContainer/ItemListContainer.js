import './ItemListContainer.css'
import { useState, useEffect } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import ItemList from '../ItemList/ItemList'
import { getDocs, collection, query, where } from 'firebase/firestore'
import { db } from '../../services/firebase/firebaseConfig'

const categoryLabels = {
    celular: 'Celulares',
    tablet: 'Tablets',
    notebook: 'Notebooks',
}

const ItemListContainer = ({ greeting }) => {
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    const { categoryId } = useParams()
    const [searchParams] = useSearchParams()
    const searchTerm = (searchParams.get('q') || '').trim()

    useEffect(() => {
        if (searchTerm) {
            document.title = `TechStore | Buscar: ${searchTerm}`
        } else {
            document.title = categoryId
                ? `TechStore | ${categoryLabels[categoryId] ?? categoryId}`
                : 'TechStore | Inicio'
        }
    }, [categoryId, searchTerm])

    useEffect(() => {
        setLoading(true)

        const collectionRef = categoryId
            ? query(collection(db, 'products'), where('category', '==', categoryId))
            : collection(db, 'products')

        getDocs(collectionRef).then(response => {
            let productsAdapted = response.docs.map(doc => {
                const data = doc.data()
                return { id: doc.id, ...data }
            })

            if (searchTerm) {
                const normalized = searchTerm.toLowerCase()
                productsAdapted = productsAdapted.filter(prod =>
                    (prod.name || '').toLowerCase().includes(normalized) ||
                    (prod.category || '').toLowerCase().includes(normalized)
                )
            }

            setProducts(productsAdapted)
        }).catch(error => {
            console.log(error)
        }).finally(() => {
            setLoading(false)
        })
    }, [categoryId, searchTerm])

    const heading = searchTerm
        ? `Resultados para “${searchTerm}”`
        : categoryId
            ? (categoryLabels[categoryId] ?? greeting)
            : greeting

    return (
        <div className='ItemListContainer'>
            {/* Hero solo en el home */}
            {!categoryId && !searchTerm && (
                <section className="Hero">
                    <div className="Hero-content">
                        <span className="Hero-eyebrow">⚡ Tecnología premium</span>
                        <h1 className="Hero-title">
                            Encontrá tu próximo <span>dispositivo</span>
                        </h1>
                        <p className="Hero-subtitle">
                            Celulares, tablets y notebooks con garantía oficial y envío
                            a todo el país. Las mejores marcas, los mejores precios.
                        </p>
                        <div className="Hero-actions">
                            <Link to="/category/celular" className="Hero-btn primary">Ver celulares</Link>
                            <Link to="/category/notebook" className="Hero-btn ghost">Ver notebooks</Link>
                        </div>
                        <div className="Hero-stats">
                            <div><strong>+500</strong><span>Productos</span></div>
                            <div><strong>24h</strong><span>Envío rápido</span></div>
                            <div><strong>12</strong><span>Cuotas sin interés</span></div>
                        </div>
                    </div>
                </section>
            )}

            <section className="ItemListContainer-body">
                <header className="ItemListContainer-head">
                    <h2>{heading}</h2>
                    {!loading && (
                        <p className="ItemListContainer-count">
                            {products.length} {products.length === 1 ? 'producto' : 'productos'}
                        </p>
                    )}
                </header>

                {loading ? (
                    <div className="loading-container">
                        <div className="app-spinner" />
                        <p className="loading-text">Cargando productos...</p>
                    </div>
                ) : products.length === 0 ? (
                    <div className="empty-list">
                        <span className="empty-list-icon">🔍</span>
                        <h3>No encontramos productos</h3>
                        <p>Probá con otra categoría o volvé al inicio.</p>
                        <Link to="/" className="Hero-btn primary">Ver todos los productos</Link>
                    </div>
                ) : (
                    <ItemList products={products} />
                )}
            </section>
        </div>
    )
}

export default ItemListContainer
