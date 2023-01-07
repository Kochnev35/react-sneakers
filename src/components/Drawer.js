import React from 'react';
import axios from 'axios';

import Info from './Info';
import AppContext from '../context';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = []}) {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);


  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const {data} = await axios.post('https://63a033b8e3113e5a5c369f14.mockapi.io/orders', {
        items: cartItems, 
      }); //Передача массива корзины
      
      setOrderId(data.id);
      setIsOrderComplete(true); //Подгрузка Заказ создан
      setCartItems([]); //Очищение корзины через Context что бы сделать "Оформить заказ"" (Очищение массива)
      
      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://63a033b8e3113e5a5c369f14.mockapi.io/cart/' + item.id); // если исп foreach Тогда await выполняться не будет
        await delay(1000);
      }

    } catch (error) {
      alert('Ошибка при создании заказа'); //Если будет ошибка выдать сообщение 
    }
    setIsLoading(false);
  }

    return (
        <div className="overlay">
            <div className="drawer"> 
            <h2 className="d-flex justify-between mb-30">
              Корзина 
            <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Close"/>
            </h2>
            
            
            {items.length > 0 ? (
            <div className="d-flex flex-column flex">
              <div className="items flex">
            {items.map((obj) => (
              <div className="cartItem d-flex align-center mb-20">
                <div style={{ backgroundImage: `url(${obj.imageUrl})` }} className="cartItemImg"></div>
                <div className="mr-20 flex">
                  <p className="mb-5">{obj.title}</p>
                  <b>{obj.price}</b>
                </div>
                <img 
                  onClick={() => onRemove(obj.id)} 
                  className="removeBtn" 
                  src="/img/btn-remove.svg" 
                  alt="Remove" />
              </div> 
            ))}
            </div>
            <div className="cartTotalBlock">
              <ul className="cartTotalBlock">
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>21 498 руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 руб.</b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
                Оформить заказ <img src="/img/arrow.svg" alt="Arrow"/>
              </button>
            </div>
            </div> 
          ) : ( 
            <Info 
              title={isOrderComplete ? 'Заказ оформлен!' : 'Корзина пустая'} 
              description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке` : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'} 
              image={isOrderComplete ? '/img/complete-order.jpg' : '/img/empty-cart.jpg'} 
            />
          )} 
      </div>
        </div>
        
    );
}

export default Drawer;