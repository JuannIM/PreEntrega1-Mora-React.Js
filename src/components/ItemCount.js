import React, { useState } from "react";

const ItemCount = ({ stock, initial, onAdd }) => {
  const [count, setCount] = useState(initial);

  const handleIncrease = () => {
    if (count < stock) setCount(count + 1);
  };

  const handleDecrease = () => {
    if (count > 1) setCount(count - 1);
  };

  const handleAdd = () => {
    onAdd(count); // Llama al callback cuando se confirma la cantidad
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
    }}>
      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={handleDecrease} disabled={count <= 1}>-</button>
        <span>{count}</span>
        <button onClick={handleIncrease} disabled={count >= stock}>+</button>
      </div>
      <button onClick={handleAdd} style={{
        backgroundColor: "#28a745",
        color: "white",
        padding: "10px 20px",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}>
        Agregar al carrito
      </button>
    </div>
  );
};

export default ItemCount;
