import React from 'react';
import Card from '../components/Card/Card';
import "./pages.scss";
import AppContext from '../context';

function Favorites () {
  const {favorites, onAddToFavorite} = React.useContext(AppContext);

  return (
    <div className="content p-20">
      <div className="d-flex align-center justify-between mb-40">
        <h1>Мои закладки</h1>
      </div>
      
      <div className="content-favorite">
        {favorites.map((item, index) => (
          <Card 
            key={index}
            favorited={true} 
            onFavorite={onAddToFavorite}
            {...item}
          />
        ))}
      </div>
      
    </div>
  );
}

export default Favorites;