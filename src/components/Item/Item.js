import './Item.css'
import { Link } from 'react-router-dom'

const Item = ({id, name, img, price}) => {

    const handleOnClick = (event) => {
        event.stopPropagation()
        console.log('hice click en item')
    }

    return (
        <article className="CardItem" onClick={handleOnClick}>
            <header className="Header">
                <h2 className="ItemHeader">
                    {name}
                </h2>
            </header>
            <picture>
                <img src={img} alt={name} className="ItemImg"/>
            </picture>
            <section>
                <p className="Info">
                    Precio: ${price}
                </p>
            </section>           
            <footer className='ItemFooter'>
                <Link to={`/detail/${id}`} className='Option'>
                    <span>Ver detalle</span>
                </Link>
            </footer>
        </article>
    )
}

export default Item