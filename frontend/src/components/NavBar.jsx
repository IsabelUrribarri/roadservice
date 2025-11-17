import React from 'react';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className="nav">
      <NavLink to="/" className={({isActive}) => isActive ? 'active' : ''}>Dashboard</NavLink>
      <NavLink to="/units" className={({isActive}) => isActive ? 'active' : ''}>Vehículos</NavLink>
      <NavLink to="/fuel" className={({isActive}) => isActive ? 'active' : ''}>Combustible</NavLink>
    </nav>
  );
}
