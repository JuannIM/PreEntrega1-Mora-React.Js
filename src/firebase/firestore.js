import {
    collection,
    getDocs,
    doc,
    getDoc,
    query,
    where,
    addDoc,
    writeBatch,
  } from "firebase/firestore";
  import { db } from "./config";
  
  // OBTENER TODOS LOS ÍTEMS O FILTRADOS POR CATEGORÍA
  export const getItems = async (categoryId) => {
    const itemsCollection = collection(db, "items");
    const q = categoryId
      ? query(itemsCollection, where("categoryId", "==", categoryId))
      : itemsCollection;
  
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };
  
  // OBTENER UN ÍTEM ESPECÍFICO POR ID
  export const getItemById = async (id) => {
    const itemDoc = doc(db, "items", id);
    const snapshot = await getDoc(itemDoc);
  
    if (snapshot.exists()) {
      return { id: snapshot.id, ...snapshot.data() };
    } else {
      throw new Error("El ítem no existe");
    }
  };
  
  // OBTENER ÍTEMS POR MÚLTIPLES IDS (MULTI-GET)
  export const getItemsByIds = async (ids) => {
    const itemsCollection = collection(db, "items");
    const q = query(itemsCollection, where("__name__", "in", ids));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  };
  
  // CREAR UNA NUEVA ORDEN EN FIRESTORE
  export const createOrder = async (order) => {
    const ordersCollection = collection(db, "orders");
    const batch = writeBatch(db);
  
    try {
      // OBTENER TODOS LOS PRODUCTOS EN EL CARRITO
      const itemIds = order.items.map((item) => item.id);
      const itemsFromDb = await getItemsByIds(itemIds);
  
      // VALIDAR STOCK
      itemsFromDb.forEach((dbItem) => {
        const cartItem = order.items.find((item) => item.id === dbItem.id);
  
        if (dbItem.stock < cartItem.quantity) {
          throw new Error(
            `El producto ${dbItem.title} no tiene suficiente stock.`
          );
        }
      });
  
      // REDUCIR STOCK EN FIRESTORE
      itemsFromDb.forEach((dbItem) => {
        const cartItem = order.items.find((item) => item.id === dbItem.id);
  
        const itemRef = doc(db, "items", dbItem.id);
        batch.update(itemRef, { stock: dbItem.stock - cartItem.quantity });
      });
  
      // INSERTAR LA ORDEN EN FIRESTORE
      const docRef = await addDoc(ordersCollection, {
        ...order,
        date: new Date(),
      });
  
      // EJECUTAR BATCH
      await batch.commit();
  
      return docRef.id; // RETORNAR ID DE LA ORDEN
    } catch (error) {
      console.error("Error al crear la orden:", error);
      throw error;
    }
  };
  
  // RESTAURAR EL STOCK DE LOS ÍTEMS
  export const restoreStock = async (items) => {
    const batch = writeBatch(db);
  
    try {
      // PROCESAR CADA ÍTEM EN EL CARRITO
      for (const item of items) {
        // REFERENCIA DEL DOCUMENTO DEL ÍTEM EN FIRESTORE
        const itemRef = doc(db, "items", item.id);
  
        // INCREMENTAR EL STOCK CON LA CANTIDAD DEL CARRITO
        batch.update(itemRef, {
          stock: item.stock + item.quantity,
        });
      }
  
      // EJECUTAR EL BATCH
      await batch.commit();
      console.log("Stock restaurado con éxito.");
    } catch (error) {
      console.error("Error al restaurar el stock:", error);
      throw error;
    }
  };
  