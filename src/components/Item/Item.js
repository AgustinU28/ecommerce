import './Item.css'
import { Link } from 'react-router-dom'

const formatPrice = (price) =>
    new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        maximumFractionDigits: 0,
    }).format(price)

const Item = ({ id, name, img, price, category }) => {
    return (
        <article className="CardItem">
            <Link to={`/detail/${id}`} className="CardItem-media">
                {category && <span className="CardItem-tag">{category}</span>}
                <img src={img} alt={name} className="ItemImg" loading="lazy" />
            </Link>

            <div className="CardItem-body">
                <h2 className="ItemHeader">{name}</h2>
                <p className="Info">{formatPrice(price)}</p>
            </div>

            <footer className='ItemFooter'>
                <Link to={`/detail/${id}`} className='Option'>
                    <span>Ver detalle</span>
                </Link>
            </footer>
        </article>
    )
}

export default Item
