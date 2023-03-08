import React from 'react';
import { Route, Routes  } from 'react-router-dom';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer/Drawer';
import Footer from './components/Footer';
import AppContext from './context';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';


function App() {

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState('');
  const [cartOpened, setCartOpened] = React.useState(false); //Отображает раскрытие и закрытие левого меню корзины 
  const [isLoading, setIsLoading] = React.useState(true); //Загрузка 
  

  React.useEffect(() => {
    async function fetchData() {  
      try {
        const [cartResponse, favoritesResponse, itemsResponse] = await Promise.all([
          axios.get('https://63a033b8e3113e5a5c369f14.mockapi.io/cart'), 
          axios.get('https://63a033b8e3113e5a5c369f14.mockapi.io/favorites'), 
          axios.get('https://63a033b8e3113e5a5c369f14.mockapi.io/items'),
        ]);                                                                //Promise.all - выполняет каждый promise и вернет массив
    
        setIsLoading(false); // Загрузка закончена 

        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemsResponse.data);
      } catch (error) {
        alert('Ошибка при запросе данных');
        console.error(error);
      }
    }
    fetchData();

  },[]);

 const onAddToCart = async (obj) => {
  try {
    const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id));
    if (findItem) {
      setCartItems(prev => prev.filter((item) => Number(item.parentId) !== Number(obj.id)));
      await axios.delete(`https://63a033b8e3113e5a5c369f14.mockapi.io/cart/${findItem.id}`);
    } else {
      setCartItems((prev) => [...prev, obj]); //Передача фейк объекта 
      const { data } = await axios.post('https://63a033b8e3113e5a5c369f14.mockapi.io/cart', obj);
      setCartItems((prev) => prev.map(item => {
        if (item.parentId === data.parentId) {
          return {
            ...item, 
            id: data.id
          };
        }
        return item;
      }));
    }
  } catch (error) {
    alert('Ошибка при добавлении в корзину');
    console.error(error);
  }
 };

 const onRemoveItem = (id) => {
  try {
    axios.delete(`https://63a033b8e3113e5a5c369f14.mockapi.io/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(id)));
  } catch (error) {
    alert('Ошибка при удалении из корзины');
    console.error(error);
  }
 };

 const onAddToFavorite = async (obj) => {
  try {
    if (favorites.find((favObj) => Number(favObj.id) === Number(obj.id))) {
      axios.delete(`https://63a033b8e3113e5a5c369f14.mockapi.io/favorites/${obj.id}`);
      setFavorites((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id))); //Удаление избранного в самом избранном, путем нажатия на кнопку "Избранное"
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
  return cartItems.some((obj) => Number(obj.parentId) === Number(id));
}

  return (
    <AppContext.Provider value={{items, cartItems, favorites, isItemAdded, onAddToFavorite, setCartOpened, setCartItems, onAddToCart,}}>
      <div className="wrapper clear">
        <Drawer 
          items={cartItems} 
          onClose={() => setCartOpened(false)} 
          onRemove={onRemoveItem} 
          opened={cartOpened} 
        />

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
            <Favorites />}>
          </Route>

          <Route path="/orders" element={
            <Orders />}>
          </Route>

        </Routes>

        <Footer/>

      </div>
    </AppContext.Provider>
  );
}

export default App;
