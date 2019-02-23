import React from 'react';
import { NavLink } from 'react-router-dom';

export const Nav = () => {
  return (
    <div className='App--NavLink-container'>
      <NavLink
        to='/'
        className='App--nav-btn'>
        Home
      </NavLink>
      <NavLink
        to='/national-geographic'
        className='App--nav-btn'>
        National Geographic
      </NavLink>
      <NavLink
        to='/new-scientist'
        className='App--nav-btn'>
        The New Scientist
      </NavLink>
      <NavLink
        to='/crypto-coins'
        className='App--nav-btn'>
        Crypto Coins News
      </NavLink>
    </div>
  )
}