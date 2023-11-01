import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  // Obtener el usuario almacenado en el localStorage al montar el componente
  const [usuario, setUsuario] = useState(() => {
    const storedUser = window.localStorage.getItem("usuario");
    console.log(storedUser,'storedUser')
    return storedUser ? JSON.parse(storedUser) : ''; // Usar null en lugar de ""
  });

  // Actualizar el localStorage cada vez que el usuario cambie
  useEffect(() => {
    // Convertir a cadena JSON si es un objeto
    const userString = JSON.stringify(usuario)
    localStorage.setItem("usuario", userString);
    console.log(window.localStorage.getItem("usuario"));
  }, [usuario]);

  return (
    <UserContext.Provider value={{ usuario, setUsuario }}>
      {children}
    </UserContext.Provider>
  );
}
