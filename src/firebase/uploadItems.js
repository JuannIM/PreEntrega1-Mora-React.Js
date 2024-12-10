import { collection, addDoc } from "firebase/firestore";
import { db } from "./config";

// ÍTEMS EXISTENTES EN EL PROYECTO
const mockProducts = [
  {
    title: "Smartphone",
    description: "Un excelente smartphone con pantalla OLED.",
    price: 699,
    pictureUrl: "https://via.placeholder.com/300",
    categoryId: "electronics",
    stock: 10,
  },
  {
    title: "Laptop",
    description: "Laptop potente para trabajo y gaming.",
    price: 1299,
    pictureUrl: "https://via.placeholder.com/300",
    categoryId: "electronics",
    stock: 5,
  },
  {
    title: "Auriculares",
    description: "Auriculares inalámbricos con cancelación de ruido.",
    price: 199,
    pictureUrl: "https://via.placeholder.com/300",
    categoryId: "clothing",
    stock: 15,
  },
];

// FUNCIÓN PARA SUBIR ÍTEMS A FIRESTORE
const uploadItems = async () => {
  const itemsCollection = collection(db, "items");

  try {
    for (const item of mockProducts) {
      const docRef = await addDoc(itemsCollection, item);
      console.log(`Documento agregado con ID: ${docRef.id}`);
    }
    console.log("Todos los ítems fueron subidos exitosamente.");
  } catch (error) {
    console.error("Error al subir ítems:", error);
  }
};

export default uploadItems;
