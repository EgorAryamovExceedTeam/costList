import { useState, useEffect } from "react";

export const useOutsideClick = (ref, func) => {
  const outsideClickListener = (e) => {
    if (!ref.current || !ref.current.contains(e.target)) func();
  };

  useEffect(() => {
    document.addEventListener("click", outsideClickListener);
    const removeListeners = () => {
      document.removeEventListener("click", outsideClickListener);
    };
    return () => {
      removeListeners();
    };
  });
};
