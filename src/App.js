import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import Navbar from './components/Navbar/Navbar'
import Checkout from './components/Checkout/Checkout';
import { CartProvider } from './context/CartContext';
import { NotificationProvider } from './notification/NotificationService';
import CartContainer from './components/CartContainer/CartContainer';


function App() {
  return (
    <div className="App">
      <NotificationProvider>
        <CartProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path='/' element={<ItemListContainer greeting='Todos Nuestro Products'/>}/>
              <Route path='/category/:categoryId' element={<ItemListContainer greeting='Productos filtrados'/>} />
              <Route path='/detail/:productId' element={<ItemDetailContainer />} />
              <Route path='/cart' element={<CartContainer />} />
              <Route path='/checkout' element={<Checkout />} />
            </Routes>
          </BrowserRouter>
        </CartProvider> 
      </NotificationProvider>
    </div>
  );
}

export default App;


        