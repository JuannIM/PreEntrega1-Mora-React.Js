import React, { useContext, useState } from "react";
import { CartContext } from "../context/cartContext";
import { createOrder, restoreStock } from "../firebase/firestore";
import { Link } from "react-router-dom";

const Cart = () => {
  const { cart, clear } = useContext(CartContext);
  const [orderId, setOrderId] = useState(null);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "" }); // DATOS DEL USUARIO
  const [formError, setFormError] = useState(false);

  // CALCULAR EL PRECIO TOTAL
  const totalPrice = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  // MANEJAR CAMBIOS EN EL FORMULARIO
  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // VALIDAR EL FORMULARIO
  const validateForm = () => {
    return form.name.trim() !== "" && form.phone.trim() !== "" && form.email.trim() !== "";
  };

  // MANEJAR LA CREACIÓN DE LA ORDEN
  const handleCreateOrder = async () => {
    if (!validateForm()) {
      setFormError(true); // MOSTRAR ERROR SI EL FORMULARIO NO ES VÁLIDO
      return;
    }

    const order = {
      buyer: { ...form },
      items: cart.map(({ id, name, price, quantity }) => ({ id, title: name, price, quantity })),
      total: totalPrice,
    };

    try {
      setError(null);
      const id = await createOrder(order); // CREAR LA ORDEN EN FIRESTORE
      setOrderId(id); // GUARDAR EL ID DE LA ORDEN
      clear(); // VACIAR EL CARRITO
    } catch (error) {
      console.error("Error al crear la orden:", error);

      // REVERTIR EL STOCK SI OCURRE UN ERROR
      try {
        await restoreStock(cart); // RESTAURAR EL STOCK
        alert("Hubo un problema al procesar la orden. El stock ha sido restaurado.");
      } catch (restoreError) {
        console.error("Error al restaurar el stock:", restoreError);
        alert("Error crítico: No se pudo restaurar el stock.");
      }
    }
  };

  if (orderId) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        <h2>¡Gracias por tu compra!</h2>
        <p>Tu ID de orden es: <strong>{orderId}</strong></p>
        <Link to="/" style={{
          textDecoration: "none",
          color: "white",
          backgroundColor: "#007bff",
          padding: "10px 20px",
          borderRadius: "5px",
          display: "inline-block",
          marginTop: "10px"
        }}>
          Volver al catálogo
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Carrito de Compras</h2>
      {cart.length === 0 ? (
        <>
          <p>Tu carrito está vacío.</p>
          <Link to="/" style={{
            textDecoration: "none",
            color: "white",
            backgroundColor: "#007bff",
            padding: "10px 20px",
            borderRadius: "5px",
            display: "inline-block",
            marginTop: "10px"
          }}>
            Volver al catálogo
          </Link>
        </>
      ) : (
        <>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {cart.map((item) => (
              <li key={item.id} style={{
                marginBottom: "15px",
                padding: "10px",
                border: "1px solid #ddd",
                borderRadius: "5px",
              }}>
                <span>{item.name} - ${item.price} x {item.quantity}</span>
              </li>
            ))}
          </ul>
          <p style={{ fontWeight: "bold", fontSize: "1.2em" }}>Total: ${totalPrice}</p>

          {/* FORMULARIO PARA DATOS DEL USUARIO */}
          <form style={{ margin: "20px 0", textAlign: "left", display: "inline-block" }}>
            <div style={{ marginBottom: "10px" }}>
              <label htmlFor="name">Nombre:</label><br />
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={handleInputChange}
                style={{ padding: "5px", width: "100%", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label htmlFor="phone">Teléfono:</label><br />
              <input
                type="text"
                id="phone"
                name="phone"
                value={form.phone}
                onChange={handleInputChange}
                style={{ padding: "5px", width: "100%", boxSizing: "border-box" }}
              />
            </div>
            <div style={{ marginBottom: "10px" }}>
              <label htmlFor="email">Correo Electrónico:</label><br />
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleInputChange}
                style={{ padding: "5px", width: "100%", boxSizing: "border-box" }}
              />
            </div>
          </form>

          {formError && <p style={{ color: "red" }}>Por favor, completa todos los campos del formulario.</p>}
          <button onClick={handleCreateOrder} style={{
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            padding: "10px 20px",
            margin: "10px",
          }}>
            Finalizar Compra
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
