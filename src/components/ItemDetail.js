import React, { useState, useContext } from "react";
import ItemCount from "./ItemCount";
import { CartContext } from "../context/cartContext";
import { useNavigate } from "react-router-dom";

const ItemDetail = ({ id, title, description, price, pictureUrl, stock = 10 }) => {
  const [added, setAdded] = useState(false); // CONTROLAR EL ESTADO DEL ITEMCOUNT
  const { addItem } = useContext(CartContext); // CONSUMIR EL MÉTODO ADDITEM
  const navigate = useNavigate();

  const handleAdd = (quantity) => {
    const newItem = { id, name: title, price, pictureUrl }; // CREAR EL OBJETO DEL PRODUCTO
    addItem(newItem, quantity); // AGREGAR EL PRODUCTO AL CARRITO
    setAdded(true);
  };

  const handleCheckout = () => {
    navigate("/cart"); // REDIRIGE A LA PÁGINA DEL CARRITO
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      maxWidth: "600px",
      margin: "20px auto",
    }}>
      <img
        src={pictureUrl}
        alt={title}
        style={{ width: "100%", borderRadius: "10px" }}
      />
      <h2 style={{ fontSize: "1.8em", color: "#333", marginTop: "20px" }}>
        {title}
      </h2>
      <p style={{ fontSize: "1.1em", color: "#555", margin: "10px 0" }}>
        {description}
      </p>
      <p style={{ fontSize: "1.5em", fontWeight: "bold", color: "#ff6347" }}>
        ${price}
      </p>
      {added ? (
        <button onClick={handleCheckout} style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}>
          Terminar mi compra
        </button>
      ) : (
        <ItemCount stock={stock} initial={1} onAdd={handleAdd} />
      )}
    </div>
  );
};

export default ItemDetail;
