import { createContext, useState } from "react";

export default ({ children }) => {
  const [stateContext, setStateContext] = useState({
    countCart: 0
  });
  return (
    <CursosContext.Provider value={[stateContext, setStateContext]}>
      {children}
    </CursosContext.Provider>
  );
};

export const CursosContext = createContext();
