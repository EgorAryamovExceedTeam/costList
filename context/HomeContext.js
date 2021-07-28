import { createContext, useState, useEffect, useMemo } from "react";
import { gql, useQuery } from "@apollo/client";
import client from "../api/api";

export const HomeContext = createContext();

export const HomeProvider = ({ children }) => {
  const [notes, setNotes] = useState();
  const sum = useMemo(() => {
    if (notes && notes.length > 0)
      return notes.reduce((currentSum, item) => currentSum + item.cost, 0);
    return 0;
  }, [notes]);

  const contextValue = {
    setNotes,
    notes,
    sum,
  };

  return (
    <HomeContext.Provider value={contextValue}>{children}</HomeContext.Provider>
  );
};
