import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/cartContext";
import { FaShoppingCart } from "react-icons/fa";

const CartWidget = () => {
  const { cart } = useContext(CartContext); // CONSUMIR EL CONTEXTO
  const navigate = useNavigate();

  // CALCULAR LA CANTIDAD TOTAL DE ÍTEMS EN EL CARRITO
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  if (totalItems === 0) return null; // NO MOSTRAR EL WIDGET SI EL CARRITO ESTÁ VACÍO

  return (
    <div
      style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
      onClick={() => navigate("/cart")} // REDIRIGIR AL CARRITO
    >
      <FaShoppingCart size={24} color="#fff" />
      <span
        style={{
          backgroundColor: "#ff6347",
          color: "white",
          borderRadius: "50%",
          padding: "5px 10px",
          marginLeft: "5px",
          fontWeight: "bold",
        }}
      >
        {totalItems}
      </span>
    </div>
  );
};

export default CartWidget;
