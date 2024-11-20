import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProducts } from "../mockData";
import ItemList from "./ItemList";

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams(); // Obtiene el parámetro de la URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true); // Muestra el indicador de carga al cambiar de categoría
    fetchProducts()
      .then((data) => {
        if (categoryId) {
          setProducts(data.filter((product) => product.category === categoryId));
        } else {
          setProducts(data);
        }
      })
      .finally(() => setLoading(false));
  }, [categoryId]); // Reacciona al cambio de categoría

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>{greeting}</h2>
      {loading ? (
        <p style={{ color: "#555", fontSize: "1.2em" }}>Cargando productos...</p>
      ) : (
        <ItemList products={products} />
      )}
    </div>
  );
};

export default ItemListContainer;
