import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchSingleProduct } from "../mockData";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const { itemId } = useParams(); // Obtiene el parámetro de la URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetchSingleProduct(itemId) // Simula obtener el producto por ID
      .then((data) => setProduct(data))
      .finally(() => setLoading(false));
  }, [itemId]);

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {loading ? (
        <p style={{ color: "#555", fontSize: "1.2em" }}>Cargando detalle...</p>
      ) : (
        <ItemDetail {...product} />
      )}
    </div>
  );
};

export default ItemDetailContainer;
