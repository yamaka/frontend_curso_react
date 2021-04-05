import { createContext, useState } from "react";

export default ({ children }) => {
  const [stateContext, setStateContext] = useState({
    cursosCount: 0,
  });
  return (
    <CarritoContext.Provider value={[stateContext, setStateContext]}>
      {children}
    </CarritoContext.Provider>
  );
};

export const CarritoContext = createContext();
