import { useEffect, useState } from "react";

export const useKeyPress = (...codes) => {
  const [status, setStatus] = useState(false);

  const pressed = new Set();

  const startEditing = ({ key }) => {
    pressed.add(key);
    for (let code of codes) {
      if (!pressed.has(code)) return;
    }
    setStatus(true);
  };

  const stopEditing = ({ key }) => {
    pressed.delete(key);
    setStatus(false);
  };
  useEffect(() => {
    document.body.addEventListener("keydown", startEditing);
    document.body.addEventListener("keyup", stopEditing);

    const removeListeners = () => {
      document.body.removeEventListener("keydown", startEditing);
      document.body.removeEventListener("keyup", stopEditing);
    };
    return () => {
      removeListeners();
    };
  });

  return status;
};
