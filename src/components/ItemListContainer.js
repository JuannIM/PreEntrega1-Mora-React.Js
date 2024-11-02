// src/components/ItemListContainer.js
import React from 'react';

const ItemListContainer = ({ greeting }) => {
  return (
    <div style={{
      padding: '20px',
      textAlign: 'center',
      backgroundColor: '#e9ecef',
      borderRadius: '8px',
      marginTop: '20px',
      color: '#333',
      fontSize: '1.2em',
    }}>
      <h2>{greeting}</h2>
    </div>
  );
};

export default ItemListContainer;
