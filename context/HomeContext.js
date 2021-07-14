import { createContext, useState, useEffect } from "react";

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [sum, setSum] = useState(0);

  useEffect(() => {
    const arr = JSON.parse(localStorage.getItem("notes"));
    setNotes([...arr]);
  }, []);

  const contextValue = {
    setNotes,
    notes,
    setSum,
    sum,
  };

  return (
    <HomeContext.Provider value={contextValue}>{children}</HomeContext.Provider>
  );
};
