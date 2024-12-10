// IMPORTAR EL SDK DE FIREBASE
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// CONFIGURACIÓN DE FIREBASE 
const firebaseConfig = {
  apiKey: "AIzaSyDuB-wwOm4tLq2eJz11qEQd9vVhsbxnXO4",
  authDomain: "mi-ecommerce-26d2f.firebaseapp.com",
  projectId: "mi-ecommerce-26d2f",
  storageBucket: "mi-ecommerce-26d2f.firebasestorage.app",
  messagingSenderId: "826354394995",
  appId: "1:826354394995:web:184fa7843cb73220134706",
};

// INICIALIZAR FIREBASE
const app = initializeApp(firebaseConfig);

// EXPORTAR FIRESTORE
export const db = getFirestore(app);
