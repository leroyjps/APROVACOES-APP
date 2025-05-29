import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "usuariosPermitidos", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUsuario({
            uid: user.uid,
            email: user.email,
            ...docSnap.data(), // role, nome, etc.
          });
        } else {
          console.warn("Usuário autenticado, mas não está autorizado.");
          setUsuario(null);
          signOut(auth); // desloga usuário não autorizado
        }
      } else {
        setUsuario(null);
      }

      setCarregando(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ usuario, carregando }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
