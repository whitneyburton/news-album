import React, { Fragment } from 'react';

export const Header = () => {
  return (
    <Fragment>
      <h1>news<span>album</span></h1>
      <div className='App--quote-and-favorites'>
        <div>
          <h2 className='App--learn'>LEARN +</h2>
          <h2 className='App--get-inspired'>GET INSPIRED.</h2>
        </div>
        <h3>my<span>favorites</span></h3>
      </div>
    </Fragment>
  )
}