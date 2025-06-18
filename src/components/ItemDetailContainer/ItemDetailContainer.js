import { useState , useEffect} from 'react';
import { useParams } from 'react-router-dom'
import ItemDetail from '../ItemDetail/ItemDetail'
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase/firebaseConfig'
import './ItemDetailContainer.css';


const ItemDetailContainer = ({setCart}) => {
    const [product , setProduct] = useState({})
    const [loading, setLoading] = useState(true)
    const {productId} = useParams();
        
    useEffect(()=>{
        document.title ='Detalle'
    }, [])
    
    useEffect(() =>{    
        const docRef = doc(db, 'products',productId)
        getDoc(docRef).then(doc =>{
            console.log(doc)
            const data = doc.data()
            const productAdapted = {id: doc.id, ...data}
            setProduct(productAdapted)
        }).catch(error =>{console.log(error)
        }).finally(()=> {
            setLoading(false)})

     

    }, [productId])
    
    return (
        <div className="item-detail-container">

            { <>
                {loading && <span >Loading...</span>}
                {loading &&  null}
            </>}
        <div>
            <h1>Detalle del producto</h1>
            <ItemDetail {...product} setCart={setCart}/>
        </div>
        </div>
    )
}

export default ItemDetailContainer  