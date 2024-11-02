// src/components/NavBar.js
import React from 'react';
import CartWidget from './CartWidget';

const NavBar = () => {
  const categories = ['Electrónica', 'Ropa', 'Juguetes', 'Hogar']; // Categorías de ejemplo

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#333',
      color: 'white',
    }}>
      <h1 style={{ margin: 0, fontSize: '1.5em' }}>LOOPIFY</h1>
      <ul style={{
        display: 'flex',
        listStyle: 'none',
        gap: '15px',
        margin: 0,
        padding: 0,
      }}>
        {categories.map(category => (
          <li key={category} style={{
            cursor: 'pointer',
            color: '#ff6347',
            fontSize: '1.1em'
          }}>
            {category}
          </li>
        ))}
      </ul>
      <CartWidget />
    </nav>
  );
};

export default NavBar;
