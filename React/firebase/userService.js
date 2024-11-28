import { db } from "./firebaseConfig";
import { collection, addDoc, Timestamp } from "firebase/firestore";

/**
 * Cria um novo usuário no Firestore.
 * @param {Object} userData Dados do usuário.
 * @returns {Promise<void>}
 */
export const createUser = async (userData) => {
  try {
    await addDoc(collection(db, "users"), {
      ...userData,
      createdAt: Timestamp.fromDate(new Date()),
    });
    return { success: true };
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return { success: false, error: error.message };
  }
};
