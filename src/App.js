import React from 'react';
import Card from './components/Card/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';


function App() {

  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [cartOpened, setCartOpened] = React.useState(false); //Отображает раскрытие и закрытие левого меню корзины 
  
 React.useEffect(() => {
  fetch('https://63a033b8e3113e5a5c369f14.mockapi.io/items')
   .then((res) => {
    return res.json();
   })
    .then((json) => {
      setItems(json);
    });
 },[]);

 const onAddToCart = (obj) => {
  setCartItems((prev) => [...prev, obj]);
 }




  return (
    <div className="wrapper clear">
      {cartOpened && <Drawer items={cartItems} onClose={() => setCartOpened(false)} />}
      <Header onClickCart={() => setCartOpened(true)}/>
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>все кроссовки</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input placeholder="Поиск..." />
          </div>
        </div>
        
        <div className="d-flex flex-wrap">
          {items.map((item) => (
            <Card 
              title={item.title} 
              price={item.price} 
              imageUrl={item.imageUrl} 
              onPlus={(obj) => onAddToCart(obj)} 
              onFavorite={() => console.log('Добавили в избранное')}/>
          ))}
        </div>
        
      </div>
    </div>
  );
}

export default App;
