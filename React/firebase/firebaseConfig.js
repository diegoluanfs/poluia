import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDUybDqcRfsA1Wj3LxUmi-gMzlDzHD9GFc",
    authDomain: "ecosense-747aa.firebaseapp.com",
    projectId: "ecosense-747aa",
    storageBucket: "ecosense-747aa.firebasestorage.app",
    messagingSenderId: "1035120526969",
    appId: "1:1035120526969:web:9d578fe9fed073b4dc36a8",
    measurementId: "G-ZS8SWDEYPM",
};

// Inicializa o Firebase
const app = initializeApp(firebaseConfig);

// Inicializa o Firestore
const db = getFirestore(app);

// Exporta o Firestore
export { db };
