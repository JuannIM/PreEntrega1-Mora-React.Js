import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItems } from "../firebase/firestore";
import ItemList from "./ItemList";

const ItemListContainer = ({ greeting }) => {
  const { categoryId } = useParams(); // OBTENER EL ID DE CATEGORÍA DESDE LA URL
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);

      try {
        const data = await getItems(categoryId); // OBTENER PRODUCTOS DESDE FIRESTORE
        setProducts(data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId]); // REACCIONA AL CAMBIO DE CATEGORÍA

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
