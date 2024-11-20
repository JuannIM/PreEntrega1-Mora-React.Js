import React from "react";
import { Link } from "react-router-dom";
import CartWidget from "./CartWidget";

const NavBar = () => {
  const categories = [
    { id: "electronics", name: "Electrónica" },
    { id: "clothing", name: "Ropa" },
    { id: "toys", name: "Juguetes" },
  ];

  return (
    <nav style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "10px 20px",
      backgroundColor: "#333",
      color: "white",
    }}>
      <Link to="/" style={{ textDecoration: "none", color: "white" }}>
        <h1 style={{ margin: 0, fontSize: "1.5em" }}>Loopify</h1>
      </Link>
      <ul style={{
        display: "flex",
        listStyle: "none",
        gap: "15px",
        margin: 0,
        padding: 0
      }}>
        {categories.map((category) => (
          <li key={category.id}>
            <Link to={`/category/${category.id}`} style={{
              textDecoration: "none",
              color: "#ff6347",
              fontSize: "1.1em"
            }}>
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
      <CartWidget />
    </nav>
  );
};

export default NavBar;
