// src/components/CartWidget.js
import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

const CartWidget = () => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      color: '#333',
      fontSize: '16px'
    }}>
      <FaShoppingCart size={24} color="#555" />
      <span style={{
        fontWeight: 'bold',
        backgroundColor: '#ff6347',
        color: 'white',
        borderRadius: '50%',
        padding: '4px 8px'
      }}>3</span> {/* Número hardcodeado */}
    </div>
  );
};

export default CartWidget;
