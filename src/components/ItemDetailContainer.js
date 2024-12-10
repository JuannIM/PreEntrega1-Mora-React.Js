import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getItemById } from "../firebase/firestore";
import ItemDetail from "./ItemDetail";

const ItemDetailContainer = () => {
  const { itemId } = useParams(); // OBTENER EL ID DEL PRODUCTO DESDE LA URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);

      try {
        const data = await getItemById(itemId); // OBTENER PRODUCTO DESDE FIRESTORE
        setProduct(data);
      } catch (error) {
        console.error("Error al obtener el producto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [itemId]); // REACCIONA AL CAMBIO DE ID

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      {loading ? (
        <p style={{ color: "#555", fontSize: "1.2em" }}>Cargando detalle...</p>
      ) : (
        product && <ItemDetail {...product} />
      )}
    </div>
  );
};

export default ItemDetailContainer;
