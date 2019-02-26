import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  const favoritesNum = JSON.parse(localStorage.getItem('favorites')) || [];

  return (
    <Fragment>
      <h1>news<span>album</span></h1>
      <div className='Header--quote-and-favorites'>
        <div>
          <h2 className='Header--learn'>LEARN +</h2>
          <h2 className='Header--get-inspired'>GET INSPIRED.</h2>
        </div>
        <Link to='/favorites' className='Header--Link'>
          <h3>my<span>favorites</span>{favoritesNum.length}</h3>
        </Link>
      </div>
    </Fragment>
  )
}