import { useState } from "react";
import { createContext, useContext } from "react";

export const AppContext = createContext(null);

export function AppWrapper({ children }) {
  const [user, setUser] = useState("userContext");
  return (
    <AppContext.Provider value={{ user, setUser }}>
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
