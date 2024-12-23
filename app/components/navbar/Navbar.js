import React from 'react';
import Menu from './Menu';
import Logo from '../Logo';

const Navbar = ({ cookie }) => {
  return (
    <div className='flex justify-evenly items-center bg-black py-2'>
      <Logo />
      <Menu cookie={cookie} />
    </div>
  )
}

export default Navbar;