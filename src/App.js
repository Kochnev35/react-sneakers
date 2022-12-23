import React from 'react';
import { BrowserRouter as Route } from 'react-router-dom';import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';

import Home from './pages/Home';
import Favorites from './pages/Favorites';



function App() {

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false); //Отображает раскрытие и закрытие левого меню корзины 
  
 React.useEffect(() => {
  axios.get('https://63a033b8e3113e5a5c369f14.mockapi.io/items').then (res => {
    setItems(res.data);
  });
  axios.get('https://63a033b8e3113e5a5c369f14.mockapi.io/cart').then (res => {
    setCartItems(res.data);
  });
 },[]);

 const onAddToCart = (obj) => {
  axios.post('https://63a033b8e3113e5a5c369f14.mockapi.io/cart', obj);
  setCartItems((prev) => [...prev, obj]);
 };

 const onRemoveItem = (id) => {
  axios.delete(`https://63a033b8e3113e5a5c369f14.mockapi.io/cart/${id}`);
  setCartItems((prev) => prev.filter((item) => item.id !== id));
 };

 const onAddToFavorite = (obj) => {
  axios.post('https://63a033b8e3113e5a5c369f14.mockapi.io/favorites', obj);
  setFavorites((prev) => [...prev, obj]);
 };

 const onChangeSearchInput = (event) => {
  setSearchValue(event.target.value);
 };


  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
      <Header onClickCart={() => setCartOpened(true)}/>
      <Route exact path="/">
        <Home 
          items={items} 
          searchValue={searchValue} 
          setSearchValue={setSearchValue} 
          onChangeSearchInput={onChangeSearchInput}
          onAddToCart={onAddToCart} 
          onAddToFavorite={onAddToFavorite} />      
      </Route>
      <Route exact path="/favorites">
        <Favorites />
      </Route>
    </div>
  );
}

export default App;
