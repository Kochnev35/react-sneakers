import React from 'react';
import ContentLoader from 'react-content-loader';
import styles from './Card.module.scss';

function Card({ 
  id, 
  onFavorite, 
  imageUrl, 
  title, 
  price, 
  onPlus, 
  favorited = false, 
  added = false,
  loading = false,
}) {
  const [isAdded, setIsAdded] = React.useState(added);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({title, imageUrl, price});
    setIsAdded(!isAdded); //Добавление в корзину
  };

  const onClickFavorite = () => {
    onFavorite({id, title, imageUrl, price});
    setIsFavorite(!isFavorite); //Добавление в Избранное 
  };

    return (
        <div className={styles.card}>
          {
            loading ? (
              <ContentLoader
                height={265}
                width={155}
                speed={2}
                viewBox="0 0 155 265"
                backgroundColor="#f3f3f3"
                foregroundColor="#ecebeb"
              >
              <rect x="1" y="0" rx="10" ry="10" width="155" height="155"/>
              <rect x="0" y="167" rx="5" ry="5" width="155" height="15"/>
              <rect x="0" y="187" rx="5" ry="5" width="100" height="15"/>
              <rect x="1" y="234" rx="5" ry="5" width="80" height="25"/>
              <rect x="124" y="230" rx="10" ry="10" width="32" height="32"/>
              </ContentLoader>
            ) : (
              <>
                <div className={styles.favorite} onClick={onClickFavorite} >
                <img src={isFavorite ? '/img/Favorite.svg' : '/img/NoFavorite.svg'} alt="Favorite"/>
                </div>
                <img width={150} height={140} src={imageUrl} alt="sneakers" />
                <h5>{title}</h5>
                <div className="d-flex justify-between align-center">
                  <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price}</b>
                  </div>
                  <img className={styles.plus} onClick={onClickPlus} src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"} alt="Plus" /> 
                </div>
              </>
            )
          }
          
          
        </div>
    )
}

export default Card;

