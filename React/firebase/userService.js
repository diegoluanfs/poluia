import { db } from "/firebase/firebaseConfig";
import { collection, addDoc, Timestamp, query, where, getDocs } from "firebase/firestore";

/**
 * Cria um novo usuário no Firestore.
 * @param {Object} userData Dados do usuário.
 * @returns {Promise<Object>}
 */
export const createUser = async (userData) => {
  try {
    // Verifica se o e-mail já existe
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", userData.email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      return { success: false, error: "O e-mail já está cadastrado." };
    }

    // Cria o novo usuário se o e-mail não existir
    await addDoc(usersRef, {
      ...userData,
      createdAt: Timestamp.fromDate(new Date()),
    });

    return { success: true };
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    return { success: false, error: error.message };
  }
};
