import { useState, useEffect } from "react";

export const useMaxWindowSize = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [windowHeight, setWindowHeight] = useState(0);

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      setWindowWidth(e.target.innerWidth);
      setWindowHeight(e.target.innerHeight);
    });
  }, [setWindowHeight, setWindowWidth]);

  return {
    width: windowWidth,
    height: windowHeight,
  };
};
