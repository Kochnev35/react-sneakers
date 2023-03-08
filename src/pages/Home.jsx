import React from 'react';
import Card from '../components/Card/Card';
import '../index.scss';

function Home ({
  items,
  searchValue, 
  setSearchValue, 
  onChangeSearchInput, 
  onAddToCart, 
  onAddToFavorite,
  isLoading,
}) {
  const renderItems = () => {
    const filtredItems = items.filter((item) => 
      item.title.toLowerCase().includes(searchValue.toLowerCase()))
    return (isLoading ? [...Array(8)] : filtredItems).map((item, index) => (
      <Card 
        key={index}
        {...item} 
        onPlus={(obj) => onAddToCart(obj)} 
        onFavorite={(obj) => onAddToFavorite(obj)}
        loading={isLoading}
      />
    ))
  }; 

  return (
      <div className="content">
      <div className="d-flex align-center justify-between mb-40">
        <h1>{searchValue ? `Поиск по запросу: "${searchValue}"` : 'Все кроссовки'}</h1>
        <div className="search-block d-flex">
          <img src="/img/search.svg" alt="Search" />
          {searchValue && (
            <img 
            onClick={() => setSearchValue ('')} 
            className="clear cu-p" 
            src="/img/btn-remove.svg" 
            alt="Clear"/>)}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
        </div>
      </div>
      
      <div className="content__items">{renderItems()}</div>

      </div>
      
  );
}

export default Home;