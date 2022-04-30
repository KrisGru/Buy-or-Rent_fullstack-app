import { useState } from "react";
import { createContext, useContext } from "react";

export const AppContext = createContext(null);

export function AppWrapper({ children }) {
  const [input, setInput] = useState("");
  const [modalBook, setModalBook] = useState({});
  const [results, setResults] = useState(false);
  const [basketBuy, setBasketBuy] = useState([]);
  const [basketRent, setBasketRent] = useState([]);
  const [dataUser, setDataUser] = useState({
    logged: false,
    data: null,
  });

  return (
    <AppContext.Provider
      value={{
        input,
        setInput,
        modalBook,
        setModalBook,
        results,
        setResults,
        basketBuy,
        setBasketBuy,
        basketRent,
        setBasketRent,
        dataUser,
        setDataUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}
