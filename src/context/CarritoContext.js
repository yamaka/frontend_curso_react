import { createContext, useState } from "react";

export default ({ children }) => {
  const [carritoStateContext, setCarritoStateContext] = useState({
    cursosCount: 0,
    carritoId: null,
    cursos: [],

  });
  return (
    <CarritoContext.Provider value={[carritoStateContext, setCarritoStateContext]}>
      {children}
    </CarritoContext.Provider>
  );
};

export const CarritoContext = createContext();
