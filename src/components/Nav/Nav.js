import React from 'react';
import { NavLink } from 'react-router-dom';

export const Nav = () => {
  return (
    <div className='Nav--NavLink-container'>
        <NavLink
          to='/'
          className='Nav--nav-btn'
          activeClassName='active'>
          Home
        </NavLink>
        <NavLink
          to='/national-geographic'
          className='Nav--nav-btn'
          activeClassName='active'>
          National Geographic
        </NavLink>
        <NavLink
          to='/new-scientist'
          className='Nav--nav-btn'
          activeClassName='active'>
          The New Scientist
        </NavLink>
        <NavLink
          to='/crypto-coins'
          className='Nav--nav-btn'
          activeClassName='active'>
          Crypto Coins News
      </NavLink>
    </div>
  )
}