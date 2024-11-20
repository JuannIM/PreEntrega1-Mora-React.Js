import React from "react";
import { Link } from "react-router-dom";

const Item = ({ id, title, price, pictureUrl }) => {
  return (
    <div style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "10px",
      textAlign: "center",
      maxWidth: "200px",
    }}>
      <img src={pictureUrl} alt={title} style={{ width: "100%", borderRadius: "8px" }} />
      <h3 style={{ fontSize: "1.1em", color: "#333" }}>{title}</h3>
      <p style={{ fontSize: "1em", color: "#888" }}>${price}</p>
      <Link to={`/item/${id}`} style={{
        textDecoration: "none",
        color: "white",
        backgroundColor: "#007bff",
        padding: "8px 12px",
        borderRadius: "5px",
        display: "inline-block",
        marginTop: "10px"
      }}>
        Ver Detalles
      </Link>
    </div>
  );
};

export default Item;
