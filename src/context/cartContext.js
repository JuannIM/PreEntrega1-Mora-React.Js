import React, { createContext, useState } from "react";

// CREAR EL CONTEXTO
export const CartContext = createContext([]);

// PROVEEDOR DEL CONTEXTO
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]); // Estado del carrito

  // AGREGAR UN ÍTEM AL CARRITO
  const addItem = (item, quantity) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      // SI EL PRODUCTO YA EXISTE, ACTUALIZAMOS LA CANTIDAD
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + quantity }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      // SI EL PRODUCTO NO EXISTE, LO AGREGAMOS
      setCart([...cart, { ...item, quantity }]);
    }
  };

  // REMOVER UN ÍTEM POR SU ID
  const removeItem = (itemId) => {
    setCart(cart.filter((cartItem) => cartItem.id !== itemId));
  };

  // LIMPIAR TODO EL CARRITO
  const clear = () => {
    setCart([]);
  };

  // VERIFICAR SI UN ÍTEM ESTÁ EN EL CARRITO
  const isInCart = (id) => {
    return cart.some((cartItem) => cartItem.id === id);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        clear,
        isInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
