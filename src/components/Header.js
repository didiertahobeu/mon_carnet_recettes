import React from 'react';
import { NavLink } from 'react-router-dom';

function Header() {
  const activeStyle = {
    fontWeight: 'bold',
    color: 'blue',
  };

  return (
    <header style={{ backgroundColor: '#f8f8f8', padding: '20px', textAlign: 'center' }}>
      <h1>Mon carnet de recettes</h1>
      <nav style={{ marginTop: '10px' }}>
        <NavLink
          to="/"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
          end
        >
          Accueil
        </NavLink>
        {' | '}
        <NavLink
          to="/add"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Ajouter une recette
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
