import React from 'react';
import axios from 'axios';

import Card from '../components/Card/Card';
import AppContext from '../context';

function Orders () {
  const {onAddToFavorite, onAddToCart} = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true); //Загрузка 

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get('https://63a033b8e3113e5a5c369f14.mockapi.io/orders');
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
        setIsLoading(false); 
      } catch (error) {
        alert('Ошибка при запросе заказов');
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="content p-20">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои заказы</h1>
      </div>
      
      <div className="content-orders">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
          <Card
            key={index}
            loading={isLoading} 
            {...item} 
          />
        ))}
      </div>
    </div>
  );
}

export default Orders;