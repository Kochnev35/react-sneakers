import React from 'react';
import { Route, Routes  } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import AppContext from './context';

import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false); //Отображает раскрытие и закрытие левого меню корзины 
  const [isLoading, setIsLoading] = React.useState(true); //Загрузка 
  

  React.useEffect(() => {
    async function fetchData(){
      setIsLoading(true); // Загрузка начата
      const cartResponse = await axios.get('https://63a033b8e3113e5a5c369f14.mockapi.io/cart'); //Запрос на корзину
      const favoritesResponse = await axios.get('https://63a033b8e3113e5a5c369f14.mockapi.io/favorites'); //Запрос на избранное
      const itemsResponse = await axios.get('https://63a033b8e3113e5a5c369f14.mockapi.io/items'); //Запрос на список всех товаров
  
      setIsLoading(false); // Загрузка закончена 

      setCartItems(cartResponse.data);
      setFavorites(favoritesResponse.data);
      setItems(itemsResponse.data);
  
    }
  
    fetchData();
  
   },[]);

 const onAddToCart = (obj) => {
  try {
    if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
      axios.delete(`https://63a033b8e3113e5a5c369f14.mockapi.io/cart/${obj.id}`);
      setCartItems(prev => prev.filter((item) => Number(item.id) !== Number(obj.id)));
    } else {
      axios.post('https://63a033b8e3113e5a5c369f14.mockapi.io/cart', obj);
      setCartItems((prev) => [...prev, obj]);
    }
  } catch (error) {
    alert('Ошибка при добавлении в корзину');
    console.error(error);
  }
 };

 const onRemoveItem = (id) => {
  axios.delete(`https://63a033b8e3113e5a5c369f14.mockapi.io/cart/${id}`);
  setCartItems((prev) => prev.filter((item) => item.id !== id));
 };

 const onAddToFavorite = async (obj) => {
  try {
    if (favorites.find((favObj) => favObj.id === obj.id)) {
      axios.delete(`https://63a033b8e3113e5a5c369f14.mockapi.io/favorites/${obj.id}`);
    } else {
      const { data } = await axios.post('https://63a033b8e3113e5a5c369f14.mockapi.io/favorites', obj);
      setFavorites((prev) => [...prev, data]);
    }
  } catch (error) {
    alert('Не удалось добавить в избранное');
    console.error(error); //Если будет ошибка в asyng и await, то catch выдаст ошибку
  }
 };

 const onChangeSearchInput = (event) => {
  setSearchValue(event.target.value);
 };

const isItemAdded = (id) => {
  return cartItems.some((obj) => Number(obj.id) === Number(id));
}

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, }}>
      <div className="wrapper clear">
        {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />}
        <Header onClickCart={() => setCartOpened(true)}/>
        <Routes>
          <Route path='/' element={
            <Home 
              items={items} 
              cartItems={cartItems}
              searchValue={searchValue} 
              setSearchValue={setSearchValue} 
              onChangeSearchInput={onChangeSearchInput}
              onAddToCart={onAddToCart} 
              onAddToFavorite={onAddToFavorite} 
              isLoading={isLoading}
            />}>
          </Route>

          <Route path="/favorites" element={
            <Favorites onAddToFavorite={onAddToFavorite} />}>
          </Route>
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
