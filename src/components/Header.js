import React from 'react';
import { Link } from 'react-router-dom';

import {useCart} from '../hooks/useCart';

function Header(props) {
  const {totalPrice} = useCart();
    return (
        <header className="d-flex justify-between align-center">
          <Link to="/">
          <div className="headerLeft d-flex align-center">
            <img width={60} height={60} src="/img/logo.png" alt="Logo" />
            <div className="headerInfo">
              <h3 className="text-uppercase">React Sneakers</h3>
              <p className="opacity-5">Магазин лучших кроссовок</p>
            </div>
          </div>
          </Link>
        <ul className="headerRight d-flex align-center">
          <li onClick={props.onClickCart} className="headerCart d-flex cu-p mr-20 align-center" >
            <img width={20} height={20} src="/img/cart.svg" alt="Корзина" />
            <span>{totalPrice} руб.</span>
          </li>
          <Link to="/favorites">
            <li className="headerFavorites cu-p">
              <img width={20} height={20} src="/img/heart.svg" alt="Избранное" />
            </li>
          </Link>
          <Link to="/orders">
            <li className="headerOrders cu-p">
              <img width={20} height={20} src="/img/user.svg" alt="Пользователь" />
            </li>
          </Link>
        </ul>
      </header>
    )
}

export default Header;