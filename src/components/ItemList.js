import React from "react";
import Item from "./Item";

const ItemList = ({ products }) => {
  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap",
      gap: "20px",
      justifyContent: "center",
      marginTop: "20px",
    }}>
      {products.map((product) => (
        <Item
          key={product.id}
          title={product.title}
          price={product.price}
          pictureUrl={product.pictureUrl}
        />
      ))}
    </div>
  );
};

export default ItemList;
